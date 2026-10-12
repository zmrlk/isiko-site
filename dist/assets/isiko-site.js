/* Build-time translations only. Missing foreign messages remain visible to QA. */
globalThis.isikoI18n=(()=>{
  const raw=document.getElementById?.('isiko-i18n')?.textContent;
  let data={};try{if(raw)data=JSON.parse(raw)||{};}catch{console.error('Invalid isiko-i18n JSON');}
  const locale=(document.documentElement?.lang||data.locale||'pl').toLowerCase().split('-')[0];
  const messages=data.locale===locale&&data.messages&&typeof data.messages==='object'?data.messages:{};
  const missing=new Set();
  function fail(key){
    if(!missing.has(key)){missing.add(key);console.error('Missing ISIKO translation: '+locale+':'+key);}
    if(document.documentElement?.dataset)document.documentElement.dataset.i18nError=key;
    return '⟦'+key+'⟧';
  }
  function t(key,polish,values={}){
    const value=Object.prototype.hasOwnProperty.call(messages,key)&&typeof messages[key]==='string'?messages[key]:!raw&&locale==='pl'?polish:fail(key);
    return String(value).replace(/\{([a-zA-Z]\w*)\}/g,(_,name)=>Object.prototype.hasOwnProperty.call(values,name)?String(values[name]):fail(key+'.'+name));
  }
  return {locale,t};
})();

/* Consent-first measurement. GTM ID is injected by the static build, never a secret. */
(() => {
  'use strict';
  const t=globalThis.isikoI18n.t;
  const KEY='isiko_consent_v2', ATTR='isiko_attribution_v1', TTL=180*86400000;
  const panel=document.querySelector('.cookie-panel');
  const options=panel?.querySelector('.cookie-options');
  const permitted=new Set(['case_open','service_open','contact_email','contact_phone','section_view','engaged_visit']);
  const storage={get(k){try{return localStorage.getItem(k);}catch{return null;}},set(k,v){try{localStorage.setItem(k,v);}catch{}},remove(k){try{localStorage.removeItem(k);}catch{}}};
  function read(){try{const c=JSON.parse(storage.get(KEY));return c?.v===2&&typeof c.analytics==='boolean'&&typeof c.marketing==='boolean'&&Number.isFinite(c.at)&&Date.now()-c.at>=0&&Date.now()-c.at<TTL?c:null;}catch{return null;}}
  let consent=read(),loaded=false;
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function googleConsent(c){gtag('consent','update',{analytics_storage:c?.analytics?'granted':'denied',ad_storage:c?.marketing?'granted':'denied',ad_user_data:c?.marketing?'granted':'denied',ad_personalization:c?.marketing?'granted':'denied'});}
  function clean(value){return typeof value==='string'&&/^[a-zA-Z0-9_. -]{1,100}$/.test(value)&&!/[\d -]{9,}/.test(value)?value:undefined;}
  function attribution(){
    if(!consent?.marketing)return;
    const u=new URL(location.href),a={at:Date.now()};
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{const v=clean(u.searchParams.get(k));if(v)a[k]=v;});
    if(Object.keys(a).length>1)storage.set(ATTR,JSON.stringify(a));
  }
  function track(event,item){
    if(!consent?.analytics||!permitted.has(event))return false;
    const record={event:'isiko_'+event,page_path:location.pathname,consent_version:2};
    if(item&&/^[a-z0-9_-]{1,60}$/.test(item))record.item_id=item;
    if(consent.marketing){try{const a=JSON.parse(storage.get(ATTR));if(a&&Date.now()-a.at<90*86400000){['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{if(clean(a[k]))record[k]=a[k];});}else storage.remove(ATTR);}catch{storage.remove(ATTR);}}
    window.dataLayer.push(record);return true;
  }
  function load(){
    const id=document.querySelector('meta[name="isiko-gtm"]')?.content;
    if(loaded||!(consent?.analytics||consent?.marketing)||!/^GTM-[A-Z0-9]{4,20}$/.test(id||'')||!['isiko.pl','www.isiko.pl'].includes(location.hostname))return;
    loaded=true;
    // No full URL, referrer, form value or contact detail enters the event contract.
    gtag('set',{page_location:location.origin+location.pathname,page_referrer:''});
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(id);document.head.append(script);
  }
  function purge(){
    storage.remove(ATTR);
    const known=/^(_ga(?:_|$)|_gid$|_gat|_gcl_|_fbp$|_fbc$|_clck$|_clsk$)/;
    document.cookie.split(';').forEach(pair=>{const name=pair.split('=')[0].trim();if(known.test(name)){['',location.hostname,'.'+location.hostname,'.isiko.pl'].forEach(domain=>{document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'')+'; SameSite=Lax';});}});
  }
  function apply(c){
    const withdrew=(consent?.analytics&&!c.analytics)||(consent?.marketing&&!c.marketing);
    consent={v:2,at:Date.now(),analytics:!!c.analytics,marketing:!!c.marketing};storage.set(KEY,JSON.stringify(consent));googleConsent(consent);
    if(!consent.marketing)storage.remove(ATTR);
    if(panel)panel.hidden=true;
    if(withdrew){purge();location.reload();return;}
    attribution();load();if(consent.analytics)track('section_view','consent-start');
  }
  window.addEventListener?.('storage',event=>{
    if((event.key!==KEY&&event.key!==null)||(event.storageArea&&event.storageArea!==localStorage))return;
    // Read and validate the shared value, never trust a storage-event payload.
    const next=read(),withdrew=(consent?.analytics&&!next?.analytics)||(consent?.marketing&&!next?.marketing);
    consent=next;googleConsent(consent);
    if(!consent?.marketing)storage.remove(ATTR);
    if(panel)panel.hidden=!!consent;
    if(withdrew){purge();location.reload();return;}
    if(consent){attribution();load();}
  });
  function open(){if(!panel)return;panel.hidden=false;if(options){options.hidden=false;options.querySelector('[name="analytics"]').checked=!!consent?.analytics;options.querySelector('[name="marketing"]').checked=!!consent?.marketing;}const b=panel.querySelector('[data-consent="settings"]');if(b)b.textContent=t('ui.cookies.save','Zapisz wybór');panel.querySelector('button')?.focus();}
  document.querySelectorAll('[data-cookie-open]').forEach(button=>button.addEventListener('click',open));
  panel?.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.consent;
    if(value==='none')apply({analytics:false,marketing:false});
    if(value==='all')apply({analytics:true,marketing:true});
    if(value==='settings'){if(options.hidden){options.hidden=false;button.textContent=t('ui.cookies.save','Zapisz wybór');options.querySelector('input')?.focus();}else apply({analytics:options.querySelector('[name="analytics"]').checked,marketing:options.querySelector('[name="marketing"]').checked});}
  }));
  if(!consent){storage.remove(ATTR);if(panel)panel.hidden=false;}else{googleConsent(consent);attribution();load();track('section_view','page-start');}
  document.addEventListener('click',event=>{
    const link=event.target.closest('a');if(link)link.closest('.mobile-nav')?.removeAttribute('open');
    const a=event.target.closest('[data-track]'),route=link?.getAttribute('href')?.match(/^\/(?:en\/|es\/|de\/|cs\/|sk\/|it\/|lt\/|lv\/|et\/)?(uslugi|realizacje|rozwiazania)\/([a-z0-9-]+)\/$/);
    if(a)track(a.dataset.track,a.dataset.item);
    else if(link?.dataset?.pageId&&['case','service'].includes(link.dataset.pageType))track(link.dataset.pageType==='case'?'case_open':'service_open',link.dataset.pageId);
    else if(route)track(route[1]==='realizacje'?'case_open':'service_open',route[2]);
  });
  const seen=new Set();
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!seen.has(entry.target.id)&&track('section_view',entry.target.id))seen.add(entry.target.id);}),{threshold:.2}).observe(document.querySelector('#main'));
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!seen.has(entry.target.id)&&track('section_view',entry.target.id))seen.add(entry.target.id);}),{threshold:.2});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
  let engaged=0,prev=Date.now();const timer=setInterval(()=>{const now=Date.now();if(!document.hidden&&consent?.analytics)engaged+=Math.min(now-prev,1000);prev=now;if(engaged>=30000){track('engaged_visit');clearInterval(timer);}},1000);
  // Export only the constrained event function for optional, explicit integrations.
  window.isikoTrack=track;
})();

/* The mobile navigation is a disclosure, with a predictable keyboard exit. */
(() => {
  document.querySelectorAll('.mobile-nav,.language-menu').forEach(nav=>{
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.open){nav.open=false;nav.querySelector('summary').focus();}});
    document.addEventListener('pointerdown',event=>{if(nav.open&&!nav.contains(event.target))nav.open=false;});
  });
  document.querySelectorAll('[data-language-link]').forEach(link=>{
    const url=new URL(link.href,location.href);
    if(url.origin===location.origin){url.search=location.search;url.hash=location.hash;link.href=url.href;}
  });
})();

/* Native disclosures keep their content and focus; motion starts from the live height. */
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('details:not(.mobile-nav):not(.language-menu)').forEach(el=>{
    const summary=el.querySelector('summary');
    if(!summary)return;
    let animation=null,contentAnimation=null,target=el.open;
    el.dataset.expanded=String(target);
    el.addEventListener('toggle',()=>{if(!animation){target=el.open;el.dataset.expanded=String(target);}});
    function finish(){
      animation?.cancel();animation=null;contentAnimation?.cancel();contentAnimation=null;
      el.open=target;el.style.height='';el.style.overflow='';el.dataset.expanded=String(target);
    }
    summary.addEventListener('click',event=>{
      if(event.target.closest('a,button,input'))return;
      event.preventDefault();
      const from=el.getBoundingClientRect().height;
      animation?.cancel();contentAnimation?.cancel();
      target=!target;el.dataset.expanded=String(target);
      if(reduced.matches||!el.animate){finish();return;}
      el.open=true;el.style.height='';
      const style=getComputedStyle(el);
      const closed=summary.getBoundingClientRect().height+parseFloat(style.paddingTop)+parseFloat(style.paddingBottom)+parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);
      const to=target?el.getBoundingClientRect().height:closed;
      el.style.height=from+'px';el.style.overflow='hidden';
      const run=el.animate([{height:from+'px'},{height:to+'px'}],{duration:360,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
      animation=run;
      const body=summary.nextElementSibling;
      if(body&&target)contentAnimation=body.animate([{opacity:.25},{opacity:1}],{duration:240,easing:'ease-out'});
      run.onfinish=()=>{if(animation===run)finish();};
    });
    addEventListener('resize',()=>{if(animation)finish();});
    reduced.addEventListener('change',()=>{if(animation)finish();});
  });
})();

/* One focused example at a time; without JS all source material stays readable. */
(() => {
  const root=document.querySelector('.ai-workbench');
  if(!root)return;
  const list=root.querySelector('.ai-choices');
  const tabs=[...list.querySelectorAll('[data-ai-tab]')];
  const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  if(!tabs.length||panels.some(panel=>!panel))return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function select(index,focus=false){
    tabs.forEach((tab,i)=>{
      tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;
      panels[i].hidden=i!==index;
      if(i!==index)panels[i].getAnimations().forEach(animation=>animation.cancel());
    });
    if(focus)tabs[index].focus();
    // Keyboard switching is immediate. Pointer activation has a short content fade.
    else if(!reduced.matches&&panels[index].animate)panels[index].animate([{opacity:.35},{opacity:1}],{duration:160,easing:'ease-out'});
  }
  tabs.forEach((tab,i)=>{
    tab.setAttribute('role','tab');
    panels[i].setAttribute('role','tabpanel');panels[i].setAttribute('aria-labelledby',tab.id);panels[i].tabIndex=0;
    tab.addEventListener('click',event=>select(i,event.detail===0));
    tab.addEventListener('keydown',event=>{
      const targets={ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
      if(!(event.key in targets))return;
      event.preventDefault();select(targets[event.key],true);
    });
  });
  list.setAttribute('role','tablist');list.hidden=false;root.dataset.enhanced='true';select(0);
})();

/* Local portfolio lookup. Search text stays in this page. */
(() => {
  const rows=[...document.querySelectorAll('.project-row')];
  if(!rows.length)return;
  const input=document.querySelector('#project-search'),area=document.querySelector('#project-area');
  const count=document.querySelector('[data-project-count]'),empty=document.querySelector('.project-empty');
  const locale=globalThis.isikoI18n?.locale||document.documentElement?.lang||'pl';
  // Keep the legacy standalone Polish view usable before its next static rebuild.
  const t=globalThis.isikoI18n?.t||((key,polish,values)=> (locale==='pl'?polish:'⟦'+key+'⟧').replace(/\{(\w+)\}/g,(_,name)=>String(values[name])));
  const normalize=s=>s.toLocaleLowerCase(locale).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
  const texts=rows.map(row=>normalize(row.textContent+' '+row.dataset.search));
  function filter(){
    const words=normalize(input.value).trim().split(/\s+/).filter(Boolean);
    rows.forEach((row,i)=>row.hidden=!!(area.value&&row.dataset.area!==area.value)||!words.every(word=>texts[i].includes(word)));
    const visible=rows.filter(row=>!row.hidden).length;
    count.textContent=t('ui.projects.count','Wyniki: {visible} z {total}',{visible,total:rows.length});empty.hidden=visible>0;
  }
  // Preserve the visitor's place when returning from a project; this never leaves the tab.
  const stateKey='isiko_projects_v1_'+locale;
  const save=()=>{try{sessionStorage.setItem(stateKey,JSON.stringify({query:input.value,area:area.value,open:rows.map(row=>row.open)}));}catch{}};
  input.addEventListener('input',()=>{filter();save();});area.addEventListener('change',()=>{filter();save();});
  rows.forEach(row=>row.addEventListener?.('toggle',save));
  try{
    if(performance.getEntriesByType('navigation')[0]?.type==='back_forward'){
      const saved=JSON.parse(sessionStorage.getItem(stateKey));
      if(saved&&typeof saved.query==='string'&&saved.query.length<=500){
        input.value=saved.query;area.value=['','systemy','ai','marka','produkty'].includes(saved.area)?saved.area:'';
        rows.forEach((row,i)=>row.open=saved.open?.[i]===true);filter();
      }
    }
  }catch{}
  document.querySelector('[data-project-reset]').addEventListener('click',()=>{input.value='';area.value='';filter();save();input.focus();});
  document.querySelector('.project-tools').hidden=false;
})();
