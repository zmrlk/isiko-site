/* Four narrators share one WebGL context. Their destinations are visible process steps. */
(() => {
  'use strict';
  const clamp=x=>Math.min(1,Math.max(0,x));
  const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
  const mix=(a,b,t)=>a+(b-a)*t;
  const segment=(p,a,b)=>ease((p-a)/(b-a));
  function spring(x,v,target,dt){const w=18,e=Math.exp(-w*dt),d=x-target,q=(v+w*d)*dt;return[target+(d+q)*e,(v-w*q)*e];}
  // Start just outside the viewport; hold the opening until the visitor can see it.
  const approaching=(top,height,viewport)=>top<viewport*1.12&&top+height*.5>viewport*.25;
  const sceneTime=(elapsed,dt,top,viewport)=>Math.max(elapsed,Math.min(top>viewport*.94?.6:7.2,elapsed+dt));
  function lightImpulse(p,target,dt){
    const acceleration=Math.hypot(324*(target.x-p.x)-36*p.vx,324*(target.y-p.y)-36*p.vy);
    return mix(p.energy||0,clamp(acceleration/6500),1-Math.exp(-9*dt));
  }
  function heroPose(points,seconds){
    return Array.from({length:16},(_,i)=>{
      const group=Math.floor(i/4),p=points[group],settle=segment(seconds,group*.18,2.4+group*.18);
      const breath=Math.sin(seconds*.7-group*.65)*p.r*.16*settle;
      return{x:p.x+(1.5-group)*p.r*.8*(1-settle)+breath,y:p.y+p.r*.65*(1-settle)-breath*.7,r:p.r};
    });
  }
  function pose(kind,progress){
    const p=clamp(progress)*.72;
    return Array.from({length:16},(_,i)=>{
      const group=Math.floor(i/4),child=i%4,theta=i*Math.PI/8,split=segment(p,.10+group*.014,.30+group*.014);
      let origin={x:.20+group*.20,y:.43,r:.06};
      let x,y;
      if(kind==='attention'){
        // Each family opens into its own sector, without crossing another parent.
        const parent=(group*4+1.5)*Math.PI/8-Math.PI*.75;
        origin={x:.5+Math.cos(parent)*.18,y:.46+Math.sin(parent)*.14,r:.06};
        const fan=theta-Math.PI*.75+Math.sin(progress*Math.PI)*.025;
        const bubbleX=[.29,.40,.52,.64,.74,.78,.78,.74,.64,.56,.47,.36,.26,.22,.22,.235][i];
        const bubbleY=[.28,.27,.27,.28,.34,.43,.52,.60,.62,.68,.62,.62,.59,.50,.41,.33][i];
        const shape=segment(p,.40,.63);
        x=mix(.5+Math.cos(fan)*(.25+(i%3)*.015),bubbleX,shape);
        y=mix(.47+Math.sin(fan)*(.20+(i%3)*.015),bubbleY,shape);
      }else if(kind==='conversation'){
        // Two incoming streams find separate columns before their context unfolds.
        origin={x:group<2?.24:.76,y:group%2?.51:.27,r:.06};
        const route=segment(p,.08,.28),spread=segment(p,.30+group*.015,.56+group*.015);
        return{x:mix(origin.x,.14+group*.24,route),y:mix(origin.y,.24+child*.11,spread),
          r:mix(origin.r,origin.r*Math.cbrt(.25),spread),group};
      }else if(kind==='production'){
        // Four jobs carry their context forward; a copy remains at each completed stage.
        origin={x:.14,y:.21+group*.125,r:.06};
        const delay=group*.012;
        x=origin.x+.24*((child>0?segment(p,.08+delay,.24+delay):0)
          +(child>1?segment(p,.27+delay,.43+delay):0)
          +(child>2?segment(p,.46+delay,.62+delay):0));
        return{x,y:origin.y,r:mix(origin.r,origin.r*Math.cbrt(.25),split),group};
      }else{
        // Source families retain their lanes while loose facts become four summaries.
        origin={x:.14+group*.24,y:[.24,.32,.48,.56][group],r:.06};
        const spread=segment(p,.10+group*.012,.34+group*.012),align=segment(p,.39,.67);
        x=mix(origin.x+[-.063,.056,-.042,.066][child],origin.x+(child%2-.5)*.105,align);
        y=mix([.19,.32,.49,.59][child],.40+(Math.floor(child/2)-.5)*.105,align);
        return{x:mix(origin.x,x,spread),y:mix(origin.y,y,spread),
          r:mix(origin.r,origin.r*Math.cbrt(.25),spread),group};
      }
      return{x:mix(origin.x,x,split),y:mix(origin.y,y,split),r:mix(origin.r,origin.r*Math.cbrt(.25),split),group};
    });
  }
  const travelPose=(width,scroll,height)=>Array.from({length:16},(_,i)=>({x:width-17,y:scroll+height*.40+Math.floor(i/4)*13,r:4}));
  if(typeof module!=='undefined'&&module.exports){module.exports={pose,heroPose,spring,travelPose,approaching,sceneTime,lightImpulse};return;}
  const hero=document.querySelector('.hero-anchor');
  if(!hero)return;
  const t=globalThis.isikoI18n?.t||((key,polish)=>!document.documentElement?.lang||document.documentElement.lang==='pl'?polish:'⟦'+key+'⟧');
  const beats={
    attention:['Zapytania trafiają różnymi drogami.','Kontakt i ustalenia spotykają się przy sprawie.','Sprawa ma opiekuna i następny krok.'],
    conversation:['Znasz potrzebę klienta.','Uzgadniasz ofertę i warunki zakupu.','Zamówienie ma dane potrzebne do realizacji.'],
    production:['Ustalenia stają się zadaniami zespołu.','Każdy etap dostaje właściwe informacje.','Status i dokumentacja wracają do sprawy klienta.'],
    knowledge:['Każdy etap zostawia informację.','Statusy i terminy składają się na obraz sprawy.','Zespół widzi, co sprawdzić i co zrobić dalej.']
  };
  Object.entries(beats).forEach(([kind,lines])=>{beats[kind]=lines.map((line,i)=>t('ui.motion.'+kind+'.'+i,line));});
  document.querySelectorAll('[data-replay]').forEach(button=>button.textContent=t('ui.motion.replay','Powtórz')+' ↻');
  const staticStages=[...document.querySelectorAll('[data-motion]')];
  let staticObserver;
  function renderStaticScenes(){
    staticStages.forEach(el=>{
      const {width,height}=el.getBoundingClientRect(),fallback=el.querySelector('.motion-fallback');
      fallback.classList.add('motion-final');
      fallback.innerHTML=pose(el.dataset.motion,1).map(p=>{
        const size=2*p.r*Math.min(width,height);
        return `<i style="left:${p.x*100}%;top:${p.y*100}%;width:${size}px;height:${size}px"></i>`;
      }).join('');
      el.style.setProperty('--scene-settled','1');el.style.setProperty('--scene-progress','1');
      el.querySelector('.motion-narration').textContent=beats[el.dataset.motion][2];
      const result=el.querySelector('.motion-result');if(result)result.style.opacity='.35';
    });
  }
  function showStaticScenes(){
    document.documentElement.classList.remove('webgl');
    document.querySelectorAll('[data-replay],[data-pause]').forEach(b=>b.hidden=true);
    renderStaticScenes();
    staticObserver??=new ResizeObserver(renderStaticScenes);
    staticStages.forEach(el=>staticObserver.observe(el));
    document.querySelector('.contact-anchor').style.opacity='1';
    const letters=document.querySelector('.finale-letters');letters.style.opacity='1';letters.style.transform='none';
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const toggle=document.querySelector('[data-motion-toggle]');
  let paused=false;
  try{paused=localStorage.getItem('isiko_motion_v1')==='paused';}catch{}
  if(toggle){
    toggle.hidden=reduced.matches;
    toggle.setAttribute('aria-pressed',String(paused||reduced.matches));
    toggle.textContent=paused?t('ui.motion.enable','Włącz animację'):t('ui.motion.reduce','Ogranicz animację');
    toggle.addEventListener('click',()=>{try{localStorage.setItem('isiko_motion_v1',paused?'on':'paused');}catch{}location.reload();});
  }
  if(reduced.matches||paused){showStaticScenes();if(!paused)reduced.addEventListener('change',()=>location.reload());return;}
  const glassVersion=new URLSearchParams(location.search).get('wersja')==='soczewki';
  if(glassVersion)document.documentElement.classList.add('glass-study');
  const canvas=document.createElement('canvas');
  canvas.className='journey-canvas';canvas.setAttribute('aria-hidden','true');
  const gl=canvas.getContext('webgl',{alpha:true,antialias:false,powerPreference:'low-power',premultipliedAlpha:false});
  if(!gl){showStaticScenes();return;}
  const vertex='attribute vec2 position; varying vec2 uv; void main(){uv=position;gl_Position=vec4(position,0.,1.);}';
  const fragment=`precision highp float;
  varying vec2 uv; uniform float halfSize; uniform float count; uniform float merge; uniform float flatness; uniform float glassMaterial; uniform float impulse;
  uniform vec3 spheres[4];
  float smin(float a,float b,float k){float h=max(k-abs(a-b),0.)/k;return min(a,b)-h*h*k*.25;}
  float scene(vec3 p){float d=1000.;for(int i=0;i<4;i++){if(float(i)<count){float sphere=length(p-vec3(spheres[i].xy,0.))-spheres[i].z;d=smin(d,sphere,max(.01,merge));}}return d;}
  vec3 normal(vec3 p){vec2 e=vec2(.03,0.);return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}
  void main(){
    vec3 ro=vec3(uv*halfSize,halfSize*2.+20.);vec3 rd=vec3(0.,0.,-1.);float t=0.;float coverage=1.;bool hit=false;
    if(count<1.5){vec2 q=ro.xy-spheres[0].xy;float z=spheres[0].z*spheres[0].z-dot(q,q);coverage=smoothstep(-.65,.65,spheres[0].z-length(q));if(coverage>0.){t=ro.z-sqrt(max(0.,z));hit=true;}}else{for(int i=0;i<48;i++){float d=scene(ro+rd*t);if(d<.07){hit=true;break;}t+=d*.9;if(t>halfSize*4.+80.)break;}}
    if(!hit){gl_FragColor=vec4(0.);return;}
    vec3 p=ro+rd*t,n=normal(p),light=normalize(vec3(-.8,1.2,2.));
    float diffuse=max(dot(n,light),0.),rim=pow(1.-max(n.z,0.),3.);
    float spec=pow(max(dot(n,normalize(light-rd)),0.),65.);
    vec3 r=reflect(rd,n);
    vec3 env=mix(vec3(.035,.075,.17),vec3(.56,.73,1.),smoothstep(-.6,.9,r.y));
    env+=vec3(.85,.86,1.)*pow(max(0.,dot(r,normalize(vec3(-.8,1.,1.4)))),24.);
    env+=vec3(.30,.51,.86)*pow(max(0.,dot(r,normalize(vec3(1.5,.5,.5)))),5.)*.55;
    vec3 color=vec3(.10,.26,.68)*(.32+.65*diffuse)+env*(.36+.4*rim)+vec3(.9,.95,1.)*spec*.28;
    color=pow(color,vec3(.8));
    if(glassMaterial>.5){
      // Our own optical material: a procedural blue studio, not a capture of page text.
      vec3 ray=refract(rd,n,1./1.46);
      float bend=clamp(.5+ray.y*.9,0.,1.);
      vec3 through=mix(vec3(.045,.09,.19),vec3(.16,.33,.60),bend);
      float fresnel=.04+.96*pow(1.-max(n.z,0.),4.);
      float edge=pow(1.-max(n.z,0.),14.);
      float window=pow(max(dot(n,normalize(vec3(-.45,.95,.55))),0.),22.);
      float lower=pow(max(dot(n,normalize(vec3(.3,-.85,.45))),0.),16.);
      float focus=exp(-pow((length(n.xy-vec2(-.08,.38))-.34)/.055,2.))*smoothstep(.12,.42,n.y);
      vec3 optical=through*(.8+.25*n.z)+env*(.08+.36*fresnel);
      optical+=vec3(.72,.86,1.)*(edge*.7+window*.43)+vec3(.20,.57,.95)*lower*.25;
      optical+=vec3(.25,.62,1.)*focus*(.025+.25*impulse);
      float sizeBlend=smoothstep(7.,28.,spheres[0].z);
      color=mix(color,optical,.5+.5*sizeBlend);
    }
    gl_FragColor=vec4(mix(color,vec3(1.),flatness),coverage);
  }`;
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader unavailable');return s;}
  let program;
  try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Renderer unavailable');}catch{showStaticScenes();return;}
  gl.useProgram(program);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const u=Object.fromEntries(['halfSize','count','merge','flatness','glassMaterial','impulse','spheres[0]'].map(name=>[name,gl.getUniformLocation(program,name)]));
  gl.uniform1f(u.glassMaterial,glassVersion?1:0);
  document.body.append(canvas);document.documentElement.classList.add('webgl');
  const finalMark=document.querySelector('.contact-anchor');
  const letters=document.querySelector('.finale-letters');
  const acts=[...document.querySelectorAll('[data-motion]')].map(el=>({el,kind:el.dataset.motion,elapsed:0,rect:null,started:false,paused:false}));
  let frame=0,last=0,dpr=1,visible=true,staticMode=false,states=[],finalStart=0,finalEnd=0,finalTarget,heroPoints=[];
  let currentAct=null,lastKind='',handoff=null,heroHeight=0,heroStarted=null;
  function point(el){const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+scrollY+r.height/2,r:r.width/2};}
  function measure(){
    dpr=Math.min(devicePixelRatio,1.25);
    const resized=canvas.width!==Math.round(innerWidth*dpr)||canvas.height!==Math.round(innerHeight*dpr);
    if(resized){canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);}
    canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';canvas.style.transform='none';
    const h=hero.getBoundingClientRect(),base=h.top+scrollY;
    heroPoints=Array.from({length:4},(_,i)=>({x:h.left+h.width*(.38+i*.11),y:base+h.height*(.82-i*.22),r:h.width*(innerWidth<700?.073:.092)}));
    acts.forEach(a=>{const r=a.el.getBoundingClientRect();a.rect={x:r.left,y:r.top+scrollY,w:r.width,h:r.height};if(resized)a.states=null;
      a.lanes=[...a.el.querySelectorAll('.lane-track')].map(el=>{const t=el.getBoundingClientRect();return (t.top+t.height/2-r.top)/r.height;});
    });
    finalTarget=point(finalMark);finalTarget.r*=.9;
    heroHeight=document.querySelector('.hero').offsetHeight;
    const maxScroll=document.documentElement.scrollHeight-innerHeight;
    finalStart=Math.min(maxScroll-innerHeight*.35,document.querySelector('.finale-orbit').getBoundingClientRect().top+scrollY-innerHeight*.7);
    finalEnd=Math.min(maxScroll,Math.max(finalStart+1,finalTarget.y-innerHeight*.63));
    if(resized)states=[];request();
  }
  const actPose=a=>pose(a.kind,a.elapsed/7.2).map(p=>a.kind==='production'&&a.lanes.length?{...p,y:a.lanes[p.group]}:p);
  acts.forEach(a=>{
    const pause=a.el.querySelector('[data-pause]');
    pause.addEventListener('click',()=>{a.paused=!a.paused;pause.setAttribute('aria-pressed',String(a.paused));pause.textContent=a.paused?t('ui.motion.resume','Wznów'):t('ui.motion.pause','Wstrzymaj');request();});
    a.el.querySelector('[data-replay]').addEventListener('click',()=>{a.elapsed=0;a.started=true;a.paused=false;pause.setAttribute('aria-pressed','false');pause.textContent=t('ui.motion.pause','Wstrzymaj');request();});
  });
  function paint(points,flat=0,merging=0){
    const minX=Math.min(...points.map(p=>p.x-p.r)),maxX=Math.max(...points.map(p=>p.x+p.r));
    const minY=Math.min(...points.map(p=>p.y-p.r)),maxY=Math.max(...points.map(p=>p.y+p.r));
    if(maxY<0||minY>innerHeight||maxX<0||minX>innerWidth)return;
    const size=Math.max(maxX-minX,maxY-minY)+merging+4,cx=(minX+maxX)/2,cy=(minY+maxY)/2;
    gl.viewport(Math.round((cx-size/2)*dpr),Math.round((innerHeight-cy-size/2)*dpr),Math.round(size*dpr),Math.round(size*dpr));
    gl.uniform1f(u.halfSize,size/2);gl.uniform1f(u.count,points.length);gl.uniform1f(u.merge,merging);gl.uniform1f(u.flatness,flat);gl.uniform1f(u.impulse,Math.max(...points.map(p=>p.energy||0)));
    const data=new Float32Array(12);points.forEach((p,i)=>{data[i*3]=p.x-cx;data[i*3+1]=cy-p.y;data[i*3+2]=p.r;});gl.uniform3fv(u['spheres[0]'],data);gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function draw(now){
    const qaStart=document.documentElement.hasAttribute('data-local-qa')?performance.now():null;
    frame=0;if(!visible||reduced.matches||staticMode)return;
    const dt=Math.min(.04,Math.max(.001,(now-last)/1000||.016));last=now;
    gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    const candidates=acts.filter(a=>approaching(a.rect.y-scrollY,a.rect.h,innerHeight));
    currentAct=candidates.sort((a,b)=>Math.abs(a.rect.y+a.rect.h*.5-scrollY-innerHeight*.5)-Math.abs(b.rect.y+b.rect.h*.5-scrollY-innerHeight*.5))[0]||null;
    let targets,flatness=0,active=false,kind='transit';
    if(scrollY<heroHeight*.45){
      kind='hero';active=true;
      if(heroStarted===null)heroStarted=now;
      targets=heroPose(heroPoints,(now-heroStarted)/1000);
    }else if(scrollY>=finalStart){
      kind='finale';const p=ease((scrollY-finalStart)/Math.max(1,finalEnd-finalStart));flatness=segment(p,.30,.97);
      targets=Array.from({length:16},(_,i)=>{const g=Math.floor(i/4);return{x:mix(document.documentElement.clientWidth-17,finalTarget.x,p),y:mix(scrollY+innerHeight*.40+g*13,finalTarget.y,p),r:mix(4,finalTarget.r,p)};});
      letters.style.opacity=String(.15+.85*segment(p,.08,.76));letters.style.transform=`translateX(${(1-p)*45}px)`;
    }else if(currentAct){
      kind=currentAct.kind;if(lastKind!==kind&&currentAct.elapsed>=7.2&&!currentAct.paused)currentAct.elapsed=0;currentAct.started=true;
      if(!handoff&&!currentAct.paused)currentAct.elapsed=sceneTime(currentAct.elapsed,dt,currentAct.rect.y-scrollY,innerHeight);active=currentAct.elapsed<(currentAct.rect.y-scrollY>innerHeight*.94?.6:7.2)&&!currentAct.paused;
      const r=currentAct.rect;
      targets=actPose(currentAct).map(p=>({x:r.x+p.x*r.w,y:r.y+p.y*r.h,r:p.r*Math.min(r.w,r.h)}));
    }else{
      targets=travelPose(document.documentElement.clientWidth,scrollY,innerHeight);
    }
    if(kind!=='finale'){letters.style.opacity='1';letters.style.transform='none';}
    finalMark.style.opacity=kind==='finale'?'0':'1';
    if(!states.length)states=targets.map(p=>({...p,vx:0,vy:0,vr:0}));
    if(lastKind&&lastKind!==kind&&kind!=='finale'){
      const previous=acts.find(a=>a.kind===lastKind);
      const from=previous?.states?Array.from({length:16},(_,i)=>{
        const p=previous.states[Math.floor(i/4)*4];return{...p,x:p.x+previous.rect.x,y:p.y+previous.rect.y};
      }):states;
      states=from.map(p=>({...p}));
      handoff={elapsed:0,from:from.map(p=>({...p,y:p.y-scrollY}))};
    }
    if(handoff&&kind!=='finale'){
      handoff.elapsed+=dt;const t=clamp(handoff.elapsed/.85);
      targets=targets.map((dest,i)=>{
        const from=handoff.from[i],g=Math.floor(i/4),edge=document.documentElement.clientWidth-17;
        const shrink=segment(t,0,.22),edgeMove=segment(t,.20,.44),vertical=segment(t,.43,.72),arrive=segment(t,.70,1);
        return{x:mix(mix(from.x,edge,edgeMove),dest.x,arrive),y:mix(from.y+scrollY,dest.y,vertical),r:mix(mix(from.r,4,shrink),dest.r,arrive)};
      });
      active=true;if(t===1)handoff=null;
    }
    let moving=false;
    states.forEach((p,i)=>{
      const t=targets[i];if(glassVersion)p.energy=lightImpulse(p,t,dt);[p.x,p.vx]=spring(p.x,p.vx,t.x,dt);[p.y,p.vy]=spring(p.y,p.vy,t.y,dt);[p.r,p.vr]=spring(p.r,p.vr,t.r,dt);
      if(Math.abs(p.x-t.x)+Math.abs(p.y-t.y)+Math.abs(p.r-t.r)>.08)moving=true;
    });
    function paintActors(ps){
      for(let g=0;g<4;g++){
        const group=ps.slice(g*4,g*4+4),distance=Math.hypot(group[0].x-group[3].x,group[0].y-group[3].y);
        const k=distance>.1?Math.min(group[0].r*.32,6):0;
        const pairs=group.flatMap((a,i)=>group.slice(i+1).map(b=>Math.hypot(a.x-b.x,a.y-b.y)-(a.r+b.r)));
        if(distance<.1)paint([group[0]]);else if(Math.min(...pairs)>k)group.forEach(p=>paint([p]));else paint(group,0,k);
      }
    }
    // Scenes keep their own cast. The traveller is a duplicate, so revisiting a scene never finds an empty stage.
    acts.filter(a=>a.started&&!(a===currentAct&&handoff)&&a.rect.y-scrollY<innerHeight&&a.rect.y+a.rect.h-scrollY>0).forEach(a=>{
      if(a!==currentAct&&!a.paused&&a.elapsed<7.2){a.elapsed=Math.min(7.2,a.elapsed+dt);active=true;}
      const r=a.rect,local=actPose(a).map(p=>({x:p.x*r.w,y:p.y*r.h,r:p.r*Math.min(r.w,r.h)}));
      if(!a.states)a.states=local.map(p=>({...p,vx:0,vy:0,vr:0}));
      a.states.forEach((p,i)=>{
        const t=local[i];if(glassVersion)p.energy=lightImpulse(p,t,dt);[p.x,p.vx]=spring(p.x,p.vx,t.x,dt);[p.y,p.vy]=spring(p.y,p.vy,t.y,dt);[p.r,p.vr]=spring(p.r,p.vr,t.r,dt);
        if(Math.abs(p.x-t.x)+Math.abs(p.y-t.y)+Math.abs(p.r-t.r)>.08)moving=true;
      });
      paintActors(a.states.map(p=>({...p,x:p.x+r.x,y:p.y+r.y-scrollY})));
      a.el.style.setProperty('--scene-settled',String(segment(a.elapsed/7.2,.55,.95)));
      a.el.style.setProperty('--scene-progress',String(a.elapsed/7.2));
      const result=a.el.querySelector('.motion-result');if(result)result.style.opacity=String(.35*segment(a.elapsed/7.2,.42,.70));
      const narration=a.el.querySelector('.motion-narration');if(narration)narration.textContent=beats[a.kind][Math.min(2,Math.floor(a.elapsed/7.2*3))];
    });
    if(kind==='finale'){
      const ps=[0,4,8,12].map(i=>({...states[i],y:states[i].y-scrollY}));
      paint(ps,flatness,flatness>.999?0:Math.min(finalTarget.r*.12,7)*Math.sin(flatness*Math.PI));
      if(flatness>.999&&!moving){finalMark.style.opacity='1';gl.clear(gl.COLOR_BUFFER_BIT);}
    }else if(!currentAct||handoff||kind==='hero')paintActors(states.map(p=>({...p,y:p.y-scrollY})));
    if(lastKind!==kind){canvas.dataset.scene=kind;lastKind=kind;}
    if(currentAct){const narration=currentAct.el.querySelector('.motion-narration');if(narration)narration.textContent=beats[currentAct.kind][Math.min(2,Math.floor(currentAct.elapsed/7.2*3))];currentAct.el.dataset.playing=String(active);const result=currentAct.el.querySelector('.motion-result');if(result)result.style.opacity=String(.35*segment(currentAct.elapsed/7.2,.42,.70));}
    if(qaStart!==null)document.dispatchEvent(new CustomEvent('isiko:qa-frame',{detail:{scene:kind,time:now,cpu:performance.now()-qaStart}}));
    // ponytail: one run per visible act, no endless loops outside the hero.
    if(active||moving)frame=requestAnimationFrame(draw);
  }
  function request(){if(!frame&&visible&&!reduced.matches&&!staticMode)frame=requestAnimationFrame(draw);}
  function fallback(){staticMode=true;cancelAnimationFrame(frame);frame=0;canvas.hidden=true;showStaticScenes();}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',measure);
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)request();});
  reduced.addEventListener('change',()=>{
    if(toggle){toggle.hidden=reduced.matches;toggle.setAttribute('aria-pressed',String(reduced.matches));}
    if(reduced.matches)fallback();else if(!gl.isContextLost()){
      staticObserver?.disconnect();staticMode=false;
      document.querySelectorAll('[data-replay],[data-pause]').forEach(b=>b.hidden=false);
      canvas.hidden=false;document.documentElement.classList.add('webgl');measure();
    }
  });
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback();});
  new ResizeObserver(measure).observe(document.querySelector('main'));document.fonts.ready.then(measure);measure();
})();
