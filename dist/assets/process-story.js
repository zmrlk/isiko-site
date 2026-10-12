/* One continuous actor, scroll-owned scenes, no animation dependency. */
(() => {
  'use strict';
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const mix = (a, b, p) => a + (b - a) * p;
  function buildKeyframes(points, viewport) {
    if (!points.length) return [];
    const height = Math.max(1, viewport), first = points[0], keys = [];
    points.forEach((point, i) => {
      // Start at the real hero centre, then ease the viewing line toward mid-screen.
      // Subtracting half a tall viewport from every anchor gave negative early times.
      const focus = mix(first.y, height * .52, ease((point.y - first.y) / height));
      const previous = points[Math.max(0, i - 1)];
      const span = Math.max(1, Math.abs(point.x - previous.x) * .25, Math.abs(point.size - previous.size) * .25);
      keys.push({...point, at: i ? Math.max(point.y - focus, keys[i - 1].at + span) : 0});
    });
    return keys;
  }
  function poseAt(keys, scroll) {
    if (!keys.length) return null;
    scroll = Math.max(0, scroll);
    if (keys.length === 1) return {x:keys[0].x,y:keys[0].y-scroll,size:keys[0].size,chapter:0,progress:0};
    let i = 0;
    while (i < keys.length - 2 && scroll > keys[i + 1].at) i++;
    const a = keys[i], b = keys[i + 1];
    const p = ease((scroll - a.at) / Math.max(Number.EPSILON, b.at - a.at));
    return {x: mix(a.x, b.x, p), y: mix(a.y, b.y, p) - scroll,
      size: mix(a.size, b.size, p), chapter: i, progress: p};
  }
  function corridorPose(keys, scroll, width, height, passages, rail) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 32 || height <= 0) return null;
    for (const index of passages) {
      const from = keys[index], to = keys[index + 1];
      if (!from || !to || scroll < from.at || scroll > to.at) continue;
      const duration = Math.min((to.at - from.at) / 2, height * .35);
      if (!(duration > 0)) continue;
      const margin = {x:width-(width < 768 ? 14 : 16),y:height*.52,size:width < 768 ? 20 : 24};
      // Leave horizontally at the anchor's document row before descending.
      // This keeps the traveller above the centred case card / screen toolbar.
      if (scroll < from.at + duration) {
        const half = duration / 2;
        if (scroll < from.at + half) {
          const p = ease((scroll-from.at)/half);
          return {x:mix(from.x,margin.x,p),y:from.y-scroll,size:mix(from.size,margin.size,p)};
        }
        const t = (scroll-from.at-half)/half;
        const startY = from.y-from.at-half;
        return {...margin,y:mix(startY,margin.y,ease(t))-half*t*(t-1)*(t-1)};
      }
      if (scroll > to.at - duration) {
        const railEntry = index === 1 && rail;
        const part = duration / (railEntry ? 3 : 2);
        const approachEnd = to.at-duration+part;
        if (scroll < approachEnd) {
          const t = (scroll-(to.at-duration))/part;
          const endY = to.y-approachEnd;
          return {...margin,y:mix(margin.y,endY,ease(t))-part*t*t*(t-1)};
        }
        // The CRM→ERP→team traversal stays exactly on the actual rail.
        if (railEntry && scroll < to.at-part) {
          const p = ease((scroll-approachEnd)/part);
          return {x:mix(margin.x,rail.x,p),y:to.y-scroll,size:mix(margin.size,to.size,p)};
        }
        const p = ease((scroll-(to.at-part))/part);
        return {x:mix(railEntry ? rail.x : margin.x,to.x,p),y:to.y-scroll,
          size:railEntry ? to.size : mix(margin.size,to.size,p)};
      }
      return margin;
    }
    return null;
  }
  function journeyPose(keys, scroll, {width = Infinity, height = 0, stages = [], rail = null, passages = []} = {}) {
    const p = poseAt(keys, scroll);
    if (!p) return p;
    scroll = Math.max(0, scroll);
    const corridor = corridorPose(keys, scroll, width, height, passages, rail);
    if (corridor) return {...p,...corridor};
    if (rail && p.chapter === 1) {
      const a = keys[1], b = keys[2];
      const path = [a], stage = stages[1];
      // Leave the collection scene in its clear vertical lane. A diagonal straight
      // to the rail crossed the card/text column while that scene was still visible.
      const exitY = stage ? stage.bottom + b.size / 2 + 16 : a.y;
      if (exitY > a.y && exitY < b.y) path.push({x:a.x,y:exitY,size:b.size});
      path.push({x:rail.x,y:b.y,size:b.size}, b);
      // Share the existing endpoint clocks. Positive distance weights keep every
      // waypoint ordered even at subpixel widths or with overlapping anchors.
      const spans = path.slice(1).map((point,i) => Math.max(1,
        Math.hypot(point.x-path[i].x,point.y-path[i].y),Math.abs(point.size-path[i].size)));
      const total = spans.reduce((sum,span) => sum + span, 0);
      let travelled = 0;
      path.slice(1,-1).forEach((point,i) => {travelled += spans[i];point.at = mix(a.at,b.at,travelled/total);});
      const onRail = poseAt(path, scroll);
      p.x = onRail.x; p.y = onRail.y; p.size = onRail.size;
    }
    if (width < 768 && stages.length) {
      const centre = p.y + scroll;
      // The whole sphere must clear a scene before it bends into the slim margin
      // passage; using its centre alone let its edge sweep back across the card.
      const distance = Math.min(...stages.map(r => Math.max(r.top-centre,centre-r.bottom,0))) - p.size / 2;
      const passage = ease(distance / 64);
      p.x = mix(p.x, width - 14, passage);
      p.size = mix(p.size, 20, passage);
    }
    return p;
  }
  function tiltAt(keys, scroll) {
    const p = poseAt(keys, scroll);
    if (!p || keys.length < 2 || p.progress === 0 || p.progress === 1) return 0;
    const a = keys[p.chapter], b = keys[p.chapter + 1];
    const direction = Math.max(-1, Math.min(1, (b.x-a.x) / Math.max(1,a.size,b.size)));
    // Position-owned tilt persists at rest and reverses exactly with scrolling.
    return 6 * direction * Math.sin(Math.PI * p.progress);
  }
  function sceneProgress(top, height, viewport) {
    return ease((viewport * .82 - top) / (viewport * .82 + height * .05));
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {poseAt, sceneProgress, buildKeyframes, journeyPose, tiltAt}; return;
  }
  const actor = document.getElementById('orb-traveller');
  if (!actor) return;
  const root = document.documentElement;
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const anchors = [...document.querySelectorAll('[data-orb-anchor]')];
  const staticOrbs = anchors.map(el => el.querySelector('.static-orb'));
  // The existing marker identifies long content between scenes, not a hidden pause.
  const passages = chapters.flatMap((el, i) => el.hasAttribute('data-motion-pause-after') ? [i] : []);
  const surface = actor.querySelector('.orb-surface');
  const eyes = actor.querySelector('.orb-eyes');
  const hand = actor.querySelector('.orb-hand');
  const notes = [...document.querySelectorAll('.note')];
  const file = document.querySelector('.case-file');
  const stations = [...document.querySelectorAll('.station')];
  const rail = document.querySelector('.rail i');
  const labNodes = [...document.querySelectorAll('.lab-node')];
  const sterp = document.querySelector('.sterp-actor');
  const arm = sterp.querySelector('#left-arm');
  const face = sterp.querySelector('#face');
  const greetings = [...document.querySelectorAll('.hello')];
  const toggle = document.getElementById('motion-toggle');
  const greet = document.getElementById('greet');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let keys = [], rects = [], stages = [], noteTargets = [], railStart = null, viewportWidth = 0, frame = 0, off = reduced.matches;
  let pointer = {x: 0, y: 0}, look = {x: 0, y: 0}, wave = null, handWave = null;
  const transform = (el, value) => { el.style.transform = value; };
  const currentScroll = () => Math.max(0, scrollY);
  function measure() {
    cancelAnimationFrame(frame); frame = 0;
    const y = currentScroll();
    // Match the client coordinates used by fixed positioning and anchor rects;
    // innerWidth also includes a classic scrollbar and would clip the corridor.
    viewportWidth = root.clientWidth || innerWidth;
    keys = buildKeyframes(anchors.map(el => {
      const r = el.getBoundingClientRect();
      return {x: r.left + r.width / 2, y: r.top + r.height / 2 + y, size: r.width};
    }), innerHeight);
    stages = anchors.map(el => {const r=el.parentElement.getBoundingClientRect();return {top:r.top+y,bottom:r.bottom+y};});
    railStart = {x: rail.parentElement.getBoundingClientRect().left};
    noteTargets = notes.map(el => ({
      x: anchors[1].offsetLeft - el.offsetLeft - el.offsetWidth / 2,
      y: anchors[1].offsetTop - el.offsetTop - el.offsetHeight / 2
    }));
    rects = chapters.map(el => { const r = el.getBoundingClientRect(); return {top:r.top + y,height:r.height}; });
    // Commit the measured position before paint, including initial/deep-link/resize frames.
    if (!off && !document.hidden && keys.length) render();
  }
  function render() {
    frame = 0;
    if (off || document.hidden || !keys.length) return;
    const y = currentScroll();
    const progress = rects.map(r => sceneProgress(r.top - y, r.height, innerHeight));
    const p = journeyPose(keys, y, {width:viewportWidth,height:innerHeight,stages,rail:railStart,passages});
    actor.hidden = false;
    const lab = progress[4];
    labNodes.forEach((el,i) => { transform(el, `translateY(${(1 - lab) * (i ? 16 : -16)}px)`); });
    const connect = progress[2];
    actor.style.opacity = '1';
    transform(actor, `translate3d(${p.x - 100}px,${p.y - 100}px,0) scale(${p.size / 200})`);
    look.x = mix(look.x, pointer.x, .16); look.y = mix(look.y, pointer.y, .16);
    const parallax = p.chapter === 0 ? 1 - p.progress : 0;
    transform(surface, `translate(${look.x * 7 * parallax}px,${look.y * 5 * parallax}px) rotate(${tiltAt(keys,y)}deg)`);
    transform(eyes, `translate(${look.x * 6}px,${look.y * 4}px)`);
    const collect = progress[1];
    notes.forEach((note, i) => {
      const start = [[-85,-70,-10],[115,0,9],[-40,100,-5]][i];
      const gather = ease((collect - .15 - i * .04) / .6);
      note.style.opacity = String(1 - ease((gather - .6) / .4));
      transform(note, `translate(${noteTargets[i].x * gather}px,${noteTargets[i].y * gather}px) rotate(${start[2] * (1 - gather)}deg) scale(${1 - .1 * gather})`);
    });
    file.style.opacity = String(ease((collect - .55) / .35));
    transform(file, `translate(-50%,-50%) translateY(${16 * (1 - collect)}px)`);
    transform(rail, `scaleX(${connect})`);
    stations.forEach((station, i) => {
      const done = ease((connect - .28 - i * .22) / .16);
      station.querySelector('i').style.opacity = String(done);
      station.style.opacity = String(.5 + .5 * done);
    });
    const hello = progress[progress.length - 1];
    eyes.style.opacity = String(ease((hello - .25) / .2));
    hand.style.opacity = String(ease((hello - .55) / .2));
    transform(hand, `rotate(${-18 * (1 - hello)}deg)`);
    // Keep the original STERP SVG paths: only rotate its existing arm and face.
    transform(arm, `rotate(${68 * ease((hello - .35) / .5)}deg)`);
    transform(face, `rotate(${-5 * hello}deg)`);
    transform(sterp, `translateX(-50%) translateY(${24 * (1 - hello)}px)`);
    greetings.forEach((el,i) => {
      el.style.opacity = String(ease((hello - .65 - i * .1) / .15));
    });
    root.dataset.storyChapter = String(progress.filter(v => v > .45).length - 1);
    if (Math.abs(look.x - pointer.x) > .01 || Math.abs(look.y - pointer.y) > .01) schedule();
  }
  function schedule() { if (!frame && !off && !document.hidden && keys.length) frame = requestAnimationFrame(render); }
  function setMotion() {
    off = reduced.matches || toggle.getAttribute('aria-pressed') === 'true';
    root.classList.toggle('js-motion', !off); root.classList.toggle('motion-off', off);
    toggle.textContent = off ? toggle.dataset.motionOn : toggle.dataset.motionOff;
    toggle.setAttribute('aria-pressed', String(off));
    toggle.disabled = reduced.matches;
    if (reduced.matches) toggle.textContent = toggle.dataset.motionReduced;
    greet.hidden = off;
    if (off) {
      cancelAnimationFrame(frame); frame = 0; wave?.cancel(); handWave?.cancel();
      actor.hidden = true;
      staticOrbs.forEach(orb => orb.style.removeProperty('visibility'));
      [file, rail, arm, face, sterp, ...labNodes, ...notes, ...stations, ...greetings, ...stations.map(s=>s.querySelector('i'))].forEach(el=>{
        el.style.removeProperty('transform'); el.style.removeProperty('opacity');
      });
      transform(arm,'rotate(68deg)');
    } else measure();
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    if (reduced.matches) return;
    toggle.setAttribute('aria-pressed', String(!off)); setMotion();
  });
  reduced.addEventListener('change', () => {toggle.setAttribute('aria-pressed', String(reduced.matches));setMotion();});
  function waveHello() {
    if (off) return;
    wave?.cancel(); handWave?.cancel();
    wave = arm.animate([{transform:'rotate(68deg)'},{transform:'rotate(88deg)'},{transform:'rotate(62deg)'},{transform:'rotate(80deg)'},{transform:'rotate(68deg)'}], {duration:900,easing:'ease-in-out'});
    handWave = hand.animate([{transform:'rotate(0deg)'},{transform:'rotate(-12deg)'},{transform:'rotate(5deg)'},{transform:'rotate(-10deg)'},{transform:'rotate(0deg)'}],{duration:900,easing:'ease-in-out'});
  }
  greet.addEventListener('click',waveHello);
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    pointer={x:e.clientX/innerWidth*2-1,y:e.clientY/innerHeight*2-1}; schedule();
  },{passive:true});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',measure,{passive:true});
  addEventListener('hashchange',measure);
  addEventListener('pageshow',measure);
  document.addEventListener('visibilitychange', () => {if(document.hidden){cancelAnimationFrame(frame);frame=0;}else measure();});
  document.fonts.ready.then(measure);
  const main = document.querySelector('main');
  main.addEventListener('load',measure,true);
  new ResizeObserver(measure).observe(main);
  setMotion();
})();
