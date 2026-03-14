/* ═══ ISIKO — Horizontal scroll, i18n, animations ═══ */

// ── i18n ──
const i18n = {
  pl: {
    'hero.tag': 'isiko \u00b7 kultura w j\u0119zyku Zulu',
    'hero.p': 'Technologia to rzemios\u0142o. AI to narz\u0119dzie. My tworzymy z tego co\u015b, co ma dusz\u0119. Narz\u0119dzia open source, kt\u00f3rych sami u\u017cywamy ka\u017cdego dnia.',
    'meport.tag': 'Produkt', 'meport.tagline': 'Naucz ka\u017cde AI kim jeste\u015b.',
    'meport.desc': 'Wrzu\u0107 pliki, odpowiedz na kilka pyta\u0144, a Meport stworzy Tw\u00f3j osobisty zestaw regu\u0142 dla 20+ narz\u0119dzi AI. Pi\u0119\u0107 minut. Jeden profil. Ka\u017cde AI wreszcie Ci\u0119 rozumie.',
    'meport.s1': 'platform', 'meport.s2': 'wymiar\u00f3w', 'meport.scanning': 'Poznaj\u0119 Ci\u0119...',
    'bos.tag': 'Produkt', 'bos.tagline': 'Tw\u00f3j osobisty system operacyjny AI.',
    'bos.desc': 'Multi-agentowy system zarz\u0105dzaj\u0105cy Twoim biznesem, marketingiem, tre\u015bciami i operacjami. 16+ wyspecjalizowanych agent\u00f3w AI pracuj\u0105cych razem. Jeden folder. Zero chmury.',
    'bos.s1': 'agent\u00f3w', 'bos.s2': 'skilli',
    'svc.tag': 'Us\u0142ugi', 'svc.h2': 'Co jeszcze', 'svc.h2b': 'robimy?',
    'svc.t1': 'Strony internetowe', 'svc.d1': 'Od wizyt\u00f3wki po rozbudowane serwisy. Szybko, nowocze\u015bnie, z my\u015bl\u0105 o SEO.',
    'svc.t2': 'Aplikacje webowe', 'svc.d2': 'Systemy CRM, panele B2B, narz\u0119dzia wewn\u0119trzne. Dostarczone nawet w 7 dni.',
    'svc.t3': 'Automatyzacja AI', 'svc.d3': 'Multi-agentowe systemy, chatboty, personalizacja AI, integracje MCP.',
    'svc.t4': 'Sklepy online', 'svc.d4': 'E-commerce, systemy p\u0142atno\u015bci, integracje z hurtowniami i magazynem.',
    'port.tag': 'Portfolio', 'port.h2': 'Wybrane ', 'port.h2b': 'projekty',
    'port.meport': 'Portable AI profiles. 20+ platform.', 'port.bos': 'Multi-agent AI operating system.',
    'port.stago': 'Strona + system ERP dla producenta pawilon\u00f3w.', 'port.vape': 'Sklep e-commerce + system lojalno\u015bciowy.',
    'about.tag': 'O nas', 'about.h2': 'Niezale\u017cnie.', 'about.h2b': 'Celowo.',
    'about.p1': 'ISIKO to niezale\u017cne studio technologiczne za\u0142o\u017cone przez Karola Zamarlika. Budujemy narz\u0119dzia, kt\u00f3rych sami u\u017cywamy \u2014 bo najlepsze produkty powstaj\u0105 z rozwi\u0105zywania w\u0142asnych problem\u00f3w.',
    'about.p2': 'Nasze narz\u0119dzia s\u0105 open source i ka\u017cdy mo\u017ce je u\u017cywa\u0107 za darmo. Wierzymy, \u017ce AI powinno adaptowa\u0107 si\u0119 do ludzi \u2014 nie odwrotnie.',
    'about.n1': 'produkty', 'about.n2': 'agent\u00f3w AI', 'about.n3': 'platform',
    'about.v1': 'Bez korporacyjnego BS',
    'bos.tagline': 'Tw\u00f3j wieloagentowy system AI w Claude Code.', 'bos.desc': '18 agent\u00f3w, ~65 skilli, lifecycle hooks, Working Memory, Affect Modulation. Agenci ucz\u0105 si\u0119 z b\u0142\u0119d\u00f3w, dziel\u0105 kontekstem i wsp\u00f3\u0142pracuj\u0105. Jeden folder \u2014 ca\u0142y zesp\u00f3\u0142 AI.',
    'bosapp.tagline': 'Tw\u00f3j osobisty system operacyjny AI.', 'bosapp.desc': 'Wizualne zarz\u0105dzanie agentami, podgl\u0105d zada\u0144 w czasie rzeczywistym, konfiguracja provider\u00f3w AI (Claude, OpenAI, Ollama). Skanowanie plik\u00f3w, profilowanie, eksport \u2014 wszystko z poziomu aplikacji.', 'bosapp.badge': 'W budowie', 'bosapp.routing': 'routing zada\u0144', 'bosapp.campaign': 'kampania Meta Ads', 'bosapp.posts': '5 post\u00f3w gotowych', 'bosapp.agents': 'Agenci', 'bosapp.providers': 'Providerzy AI', 'bosapp.connected': 'po\u0142\u0105czony', 'bosapp.local': 'lokalny',
    'svc.h2': 'Wsp\u00f3\u0142praca', 'svc.h2b': 'z nami.', 'svc.sub': 'Projektujemy, budujemy i automatyzujemy. Od technologii po operacje \u2014 pomagamy firmom dzia\u0142a\u0107 sprawniej z AI.',
    'svc.t1': 'Projektowanie & Development', 'svc.d1': 'Strony, aplikacje webowe, systemy CRM, panele B2B. Nowoczesne technologie, SEO od pierwszego dnia.',
    'svc.t2': 'Automatyzacja AI', 'svc.d2': 'Multi-agentowe systemy, chatboty, personalizacja AI, integracje MCP. Budujemy AI, kt\u00f3re pracuje za Ciebie.',
    'svc.t3': 'Operacje & Procesy', 'svc.d3': 'Optymalizacja workflow, automatyzacja raport\u00f3w, integracja narz\u0119dzi. Mniej r\u0119cznej pracy, wi\u0119cej wynik\u00f3w.',
    'svc.t4': 'E-commerce', 'svc.d4': 'Sklepy online, systemy p\u0142atno\u015bci, programy lojalno\u015bciowe, integracje z hurtowniami i magazynem.',
    'about.h2': 'O mnie.', 'about.h2b': 'Karol Zamarlik.',
    'about.p1': 'Lata do\u015bwiadczenia w du\u017cych firmach \u2014 od kierownika IT po dyrektora operacyjnego w sieciach sprzeda\u017cy i firmie produkcyjnej. Zarz\u0105dzanie zespo\u0142ami, operacjami, technologi\u0105. Wiem czego oczekuje du\u017cy biznes, bo by\u0142em po tej stronie.',
    'about.p3': 'R\u00f3wnolegle budowa\u0142em w\u0142asne projekty. Te dwa \u015bwiaty \u2014 korporacja i indie development \u2014 da\u0142y mi unikalne po\u0142\u0105czenie: wiem jak skalowa\u0107 procesy i jak budowa\u0107 produkt od zera. Dzi\u015b \u0142\u0105cz\u0119 to w ISIKO, tworz\u0105c narz\u0119dzia AI, kt\u00f3re sam u\u017cywam do zarz\u0105dzania swoim biznesem.',
    'meport.done': 'Profil gotowy',
    'contact.h2': 'Porozmawiajmy', 'contact.desc': 'Masz projekt? Chcesz zautomatyzowa\u0107 procesy? Szukasz partnera technologicznego? Odezwij si\u0119.', 'contact.footer': 'Stworzono przez ISIKO z pomoc\u0105 bOS CLI.',
    'nav.home': 'Start', 'nav.services': 'Us\u0142ugi', 'nav.about': 'O mnie', 'nav.contact': 'Kontakt',
    'hero.tag': 'isiko \u00b7 kultura w j\u0119zyku Zulu',
    'hero.we': 'Kodujemy', 'hero.art': 'sztuk\u0119.',
    'hero.p': 'Dla nas technologia to sztuka. Narz\u0119dzia open source, kt\u00f3rych sami u\u017cywamy ka\u017cdego dnia \u2014 z precyzj\u0105 rzemios\u0142a i dusz\u0105 czego\u015b ludzkiego.',
    'about.proj': 'Projekty',
  },
  en: {
    'hero.tag': 'isiko \u00b7 culture in Zulu',
    'hero.p': 'Technology is a craft. AI is a tool. We turn them into something with soul. Open-source tools we use ourselves, every day.',
    'meport.tag': 'Product', 'meport.tagline': 'Teach every AI who you are.',
    'meport.desc': 'Drop your files, answer a few questions, and Meport creates your personal ruleset for 20+ AI tools. Five minutes. One profile. Every AI finally gets you.',
    'meport.s1': 'platforms', 'meport.s2': 'dimensions', 'meport.scanning': 'Getting to know you...',
    'bos.tag': 'Product', 'bos.tagline': 'Your personal AI operating system.',
    'bos.desc': 'A multi-agent system managing your business, marketing, content, and operations. 18 specialized AI agents, ~65 skills. One folder in Claude Code. Zero cloud.',
    'bos.s1': 'agents', 'bos.s2': 'skills',
    'svc.tag': 'Services', 'svc.h2': 'What else do', 'svc.h2b': 'we do?',
    'svc.t1': 'Websites', 'svc.d1': 'From landing pages to complex platforms. Fast, modern, SEO-ready.',
    'svc.t2': 'Web applications', 'svc.d2': 'CRM systems, B2B panels, internal tools. Delivered in as little as 7 days.',
    'svc.t3': 'AI automation', 'svc.d3': 'Multi-agent systems, chatbots, AI personalization, MCP integrations.',
    'svc.t4': 'Online stores', 'svc.d4': 'E-commerce, payment systems, warehouse and logistics integrations.',
    'port.tag': 'Portfolio', 'port.h2': 'Selected ', 'port.h2b': 'projects',
    'port.meport': 'Portable AI profiles. 20+ platforms.', 'port.bos': 'Multi-agent AI operating system.',
    'port.stago': 'Website + ERP system for modular building manufacturer.', 'port.vape': 'E-commerce store + loyalty system.',
    'about.tag': 'About', 'about.h2': 'Independently.', 'about.h2b': 'On purpose.',
    'about.p1': 'ISIKO is an independent tech studio founded by Karol Zamarlik. We build tools we use ourselves \u2014 because the best products come from solving your own problems.',
    'about.p2': 'Our tools are open source and free for everyone. We believe AI should adapt to people \u2014 not the other way around.',
    'about.n1': 'products', 'about.n2': 'AI agents', 'about.n3': 'platforms',
    'about.v1': 'No corporate BS',
    'bos.tagline': 'Your multi-agent AI system for Claude Code.', 'bos.desc': '18 agents, ~65 skills, lifecycle hooks, Working Memory, Affect Modulation. Agents learn from mistakes, share context, and collaborate. One folder \u2014 a full AI team.',
    'bosapp.tagline': 'Your personal AI operating system.', 'bosapp.desc': 'Visual agent management, real-time task monitoring, AI provider configuration (Claude, OpenAI, Ollama). File scanning, profiling, export \u2014 all from one app.', 'bosapp.badge': 'In development', 'bosapp.routing': 'task routing', 'bosapp.campaign': 'Meta Ads campaign', 'bosapp.posts': '5 posts ready', 'bosapp.agents': 'Agents', 'bosapp.providers': 'AI Providers', 'bosapp.connected': 'connected', 'bosapp.local': 'local',
    'svc.h2': 'Working', 'svc.h2b': 'with us.', 'svc.sub': 'We design, build, and automate. From technology to operations \u2014 helping businesses run smarter with AI.',
    'svc.t1': 'Design & Development', 'svc.d1': 'Websites, web apps, CRM systems, B2B panels. Modern tech, SEO from day one.',
    'svc.t2': 'AI Automation', 'svc.d2': 'Multi-agent systems, chatbots, AI personalization, MCP integrations. AI that works for you.',
    'svc.t3': 'Operations & Processes', 'svc.d3': 'Workflow optimization, report automation, tool integration. Less manual work, more results.',
    'svc.t4': 'E-commerce', 'svc.d4': 'Online stores, payment systems, loyalty programs, warehouse and logistics integrations.',
    'about.h2': 'About me.', 'about.h2b': 'Karol Zamarlik.',
    'about.p1': 'Years of experience in large companies \u2014 from IT manager to COO in retail chains and a manufacturing company. Managing teams, operations, technology. I know what big business expects because I\u2019ve been on that side.',
    'about.p3': 'In parallel, I built my own projects. These two worlds \u2014 corporate and indie development \u2014 gave me a unique combination: I know how to scale processes and how to build a product from scratch. Today I combine both in ISIKO, creating AI tools I use to run my own business.',
    'meport.done': 'Profile ready',
    'contact.h2': 'Let\u2019s talk', 'contact.desc': 'Have a project? Want to automate processes? Looking for a tech partner? Reach out.', 'contact.footer': 'Created by ISIKO with bOS CLI.',
    'nav.home': 'Home', 'nav.services': 'Services', 'nav.about': 'About', 'nav.contact': 'Contact',
    'hero.tag': 'isiko \u00b7 culture in Zulu',
    'hero.we': 'We craft', 'hero.art': 'technology.',
    'hero.p': 'For us, technology is art. Open-source tools we use ourselves, every day \u2014 with the precision of engineering and the soul of something human.',
    'about.proj': 'Projects',
  },
  es: {
    'hero.tag': 'isiko \u00b7 cultura en Zulu',
    'hero.p': 'La tecnolog\u00eda es un oficio. La IA es una herramienta. Nosotros creamos algo con alma. Herramientas open source que usamos nosotros mismos, cada d\u00eda.',
    'meport.tag': 'Producto', 'meport.tagline': 'Ense\u00f1a a cada IA qui\u00e9n eres.',
    'meport.desc': 'Sube tus archivos, responde algunas preguntas y Meport crea tu conjunto personal de reglas para 20+ herramientas de IA. Cinco minutos. Un perfil. Cada IA finalmente te entiende.',
    'meport.s1': 'plataformas', 'meport.s2': 'dimensiones', 'meport.scanning': 'Conoci\u00e9ndote...',
    'bos.tag': 'Producto', 'bos.tagline': 'Tu sistema operativo de IA personal.',
    'bos.desc': 'Un sistema multi-agente que gestiona tu negocio, marketing, contenido y operaciones. 18 agentes de IA especializados, ~65 habilidades. Una carpeta en Claude Code. Cero nube.',
    'bos.s1': 'agentes', 'bos.s2': 'habilidades',
    'svc.tag': 'Servicios', 'svc.h2': 'Qu\u00e9 m\u00e1s', 'svc.h2b': 'hacemos?',
    'svc.t1': 'P\u00e1ginas web', 'svc.d1': 'Desde landing pages hasta plataformas complejas. R\u00e1pido, moderno, listo para SEO.',
    'svc.t2': 'Aplicaciones web', 'svc.d2': 'Sistemas CRM, paneles B2B, herramientas internas. Entregadas en tan solo 7 d\u00edas.',
    'svc.t3': 'Automatizaci\u00f3n IA', 'svc.d3': 'Sistemas multi-agente, chatbots, personalizaci\u00f3n de IA, integraciones MCP.',
    'svc.t4': 'Tiendas online', 'svc.d4': 'E-commerce, sistemas de pago, integraciones con almac\u00e9n y log\u00edstica.',
    'port.tag': 'Portafolio', 'port.h2': 'Proyectos ', 'port.h2b': 'seleccionados',
    'port.meport': 'Perfiles de IA portables. 20+ plataformas.', 'port.bos': 'Sistema operativo de IA multi-agente.',
    'port.stago': 'Web + sistema ERP para fabricante de m\u00f3dulos.', 'port.vape': 'Tienda e-commerce + sistema de lealtad.',
    'about.tag': 'Sobre nosotros', 'about.h2': 'Independientemente.', 'about.h2b': 'A prop\u00f3sito.',
    'about.p1': 'ISIKO es un estudio tecnol\u00f3gico independiente fundado por Karol Zamarlik. Construimos herramientas que nosotros mismos usamos \u2014 porque los mejores productos nacen de resolver tus propios problemas.',
    'about.p2': 'Nuestras herramientas son open source y gratuitas para todos. Creemos que la IA debe adaptarse a las personas \u2014 no al rev\u00e9s.',
    'about.n1': 'productos', 'about.n2': 'agentes IA', 'about.n3': 'plataformas',
    'about.v1': 'Sin BS corporativo',
    'bos.tagline': 'Tu sistema multi-agente de IA para Claude Code.', 'bos.desc': '18 agentes, ~65 habilidades, lifecycle hooks, Working Memory, Affect Modulation. Los agentes aprenden de errores, comparten contexto y colaboran. Una carpeta \u2014 un equipo completo de IA.',
    'bosapp.tagline': 'Tu sistema operativo de IA personal.', 'bosapp.desc': 'Gesti\u00f3n visual de agentes, monitoreo en tiempo real, configuraci\u00f3n de proveedores AI (Claude, OpenAI, Ollama). Escaneo, perfilado, exportaci\u00f3n \u2014 todo desde una app.', 'bosapp.badge': 'En desarrollo', 'bosapp.routing': 'enrutamiento', 'bosapp.campaign': 'campa\u00f1a Meta Ads', 'bosapp.posts': '5 posts listos', 'bosapp.agents': 'Agentes', 'bosapp.providers': 'Proveedores AI', 'bosapp.connected': 'conectado', 'bosapp.local': 'local',
    'svc.h2': 'Trabajar', 'svc.h2b': 'con nosotros.', 'svc.sub': 'Dise\u00f1amos, construimos y automatizamos. De la tecnolog\u00eda a las operaciones \u2014 ayudando a las empresas a funcionar mejor con IA.',
    'svc.t1': 'Dise\u00f1o & Desarrollo', 'svc.d1': 'Webs, aplicaciones, sistemas CRM, paneles B2B. Tecnolog\u00eda moderna, SEO desde el d\u00eda uno.',
    'svc.t2': 'Automatizaci\u00f3n IA', 'svc.d2': 'Sistemas multi-agente, chatbots, personalizaci\u00f3n IA, integraciones MCP. IA que trabaja por ti.',
    'svc.t3': 'Operaciones & Procesos', 'svc.d3': 'Optimizaci\u00f3n de flujos, automatizaci\u00f3n de reportes, integraci\u00f3n de herramientas. Menos trabajo manual, m\u00e1s resultados.',
    'svc.t4': 'E-commerce', 'svc.d4': 'Tiendas online, sistemas de pago, programas de lealtad, integraciones con almac\u00e9n y log\u00edstica.',
    'about.h2': 'Sobre m\u00ed.', 'about.h2b': 'Karol Zamarlik.',
    'about.p1': 'A\u00f1os de experiencia en grandes empresas \u2014 de gerente IT a director de operaciones en cadenas de venta y empresa de producci\u00f3n. Gesti\u00f3n de equipos, operaciones, tecnolog\u00eda. S\u00e9 lo que espera el gran negocio porque estuve de ese lado.',
    'about.p3': 'En paralelo, constru\u00ed mis propios proyectos. Estos dos mundos \u2014 corporativo e indie \u2014 me dieron una combinaci\u00f3n \u00fanica: s\u00e9 c\u00f3mo escalar procesos y c\u00f3mo construir un producto desde cero. Hoy combino ambos en ISIKO, creando herramientas IA que uso para gestionar mi propio negocio.',
    'meport.done': 'Perfil listo',
    'contact.h2': 'Hablemos', 'contact.desc': '\u00bfTienes un proyecto? \u00bfQuieres automatizar procesos? \u00bfBuscas un socio tecnol\u00f3gico? Escr\u00edbenos.', 'contact.footer': 'Creado por ISIKO con bOS CLI.',
    'nav.home': 'Inicio', 'nav.services': 'Servicios', 'nav.about': 'Sobre m\u00ed', 'nav.contact': 'Contacto',
    'hero.tag': 'isiko \u00b7 cultura en Zulu',
    'hero.we': 'Creamos', 'hero.art': 'tecnolog\u00eda.',
    'hero.p': 'Para nosotros, la tecnolog\u00eda es arte. Herramientas open source que usamos cada d\u00eda \u2014 con la precisi\u00f3n de la ingenier\u00eda y el alma de algo humano.',
    'about.proj': 'Proyectos',
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.getElementById('slides');
  const slideEls = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  const hint = document.getElementById('hint');
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  // ── Create dots ──
  slideEls.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.slide = i;
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => slideEls[i].scrollIntoView({ behavior: 'smooth' }));
    dotsContainer.appendChild(d);
  });
  const dots = dotsContainer.querySelectorAll('.dot');

  // ── Track active slide ──
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = [...slideEls].indexOf(e.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        // content always visible
        // Hide hint after first slide
        if (idx > 0 && hint) hint.classList.add('hidden');
      }
    });
  }, { root: isMobile() ? null : slides, threshold: 0.5 });
  slideEls.forEach(s => obs.observe(s));

  // ── Wheel → horizontal (desktop) ──
  if (!isMobile()) {
    slides.addEventListener('wheel', e => {
      e.preventDefault();
      slides.scrollBy({ left: e.deltaY * 2, behavior: 'auto' });
    }, { passive: false });
  }

  // ── Keyboard nav ──
  document.addEventListener('keydown', e => {
    const cur = [...dots].findIndex(d => d.classList.contains('active'));
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && cur < slideEls.length - 1) {
      slideEls[cur + 1].scrollIntoView({ behavior: 'smooth' });
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && cur > 0) {
      slideEls[cur - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── Dropdowns ──
  function setupDropdown(toggleId, menuId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    if (!toggle || !menu) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.tb-menu.open').forEach(m => { if (m !== menu) m.classList.remove('open'); });
      menu.classList.toggle('open');
    });
  }
  setupDropdown('lang-toggle', 'lang-menu');
  setupDropdown('nav-toggle', 'nav-menu');

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.tb-menu.open').forEach(m => m.classList.remove('open'));
  });
  document.querySelectorAll('.tb-menu').forEach(m => {
    m.addEventListener('click', e => e.stopPropagation());
  });

  // ── Nav links → scroll to slide ──
  document.querySelectorAll('.tb-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(link.dataset.slide);
      if (slideEls[idx]) slideEls[idx].scrollIntoView({ behavior: 'smooth' });
      document.getElementById('nav-menu').classList.remove('open');
    });
  });

  // ── Language (auto-detect browser language) ──
  let lang = localStorage.getItem('isiko-lang');
  if (!lang) {
    const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (browserLang.startsWith('pl')) lang = 'pl';
    else if (browserLang.startsWith('es')) lang = 'es';
    else lang = 'en';
  }
  document.getElementById('lang-current').textContent = lang.toUpperCase();
  setLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      localStorage.setItem('isiko-lang', lang);
      setLang(lang);
      document.getElementById('lang-current').textContent = lang.toUpperCase();
      document.getElementById('lang-menu').classList.remove('open');
    });
  });

  function setLang(l) {
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
    const dict = i18n[l] || i18n.pl;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
  }

  // ── All slides visible ──
  slideEls.forEach(s => s.classList.add('in-view'));

  // ── Cursor glow on hero ──
  const heroSlide = document.getElementById('hero-slide');
  if (heroSlide) {
    heroSlide.addEventListener('pointermove', e => {
      const r = heroSlide.getBoundingClientRect();
      heroSlide.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      heroSlide.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  // ── MEPORT PREVIEW: scan → questions → success ──
  const mpScan = document.getElementById('mp-scan');
  const mpQ = document.getElementById('mp-questions');
  const mpSuccess = document.getElementById('mp-success');
  const mpTerm = document.getElementById('mp-term');
  if (mpScan) {
    const qs = [
      {q:'Jak bezpośrednio?',opts:['Bardzo','Zbalansowanie','Delikatnie']},
      {q:'Format odpowiedzi?',opts:['Punktory','Akapity','Szczegółowo']},
      {q:'Ton?',opts:['Profesjonalny','Swobodny','Dopasuj się']},
    ];
    let mpStarted = false;
    const mpObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !mpStarted) {
        mpStarted = true;
        // Count up
        countUp(document.getElementById('mp-f'), 825, 1500);
        countUp(document.getElementById('mp-d'), 105, 1200);
        // Terminal animation
        termAnim(mpTerm, [
          {h:'<span class="tc-g">$</span> npx meport',d:0},
          {h:'<span class="tc-d">Scanning...</span>',d:400},
          {h:'<span class="tc-ok">✓</span> CV.pdf — 23 dims',d:900},
          {h:'<span class="tc-ok">✓</span> notes.md — 14 dims',d:1300},
          {h:'<span class="tc-ok">✓</span> <span class="tc-w">Profile ready</span>',d:2500},
        ]);
        // Switch to questions
        setTimeout(() => { mpScan.style.display='none'; mpQ.style.display='block'; showMpQ(0); }, 2500);
      }
    }, {threshold:.3});
    mpObs.observe(mpScan);

    function showMpQ(i) {
      if (i >= qs.length) { mpQ.style.display='none'; mpSuccess.style.display='block'; return; }
      const q = qs[i];
      document.getElementById('mp-dots').innerHTML = qs.map((_,j) =>
        '<span class="pv-dot'+(j<i?' done':'')+(j===i?' on':'')+'"></span>').join('');
      document.getElementById('mp-q').textContent = q.q;
      const optsEl = document.getElementById('mp-opts');
      optsEl.innerHTML = '';
      q.opts.forEach((o,j) => {
        const b = document.createElement('button');
        b.className = 'pv-qopt';
        b.textContent = o;
        b.onclick = () => {
          optsEl.querySelectorAll('.pv-qopt').forEach(x => {x.classList.remove('on');x.disabled=true});
          b.classList.add('on'); b.textContent = o+' ✓';
          setTimeout(() => showMpQ(i+1), 500);
        };
        optsEl.appendChild(b);
      });
    }
  }

  // ── bOS CLI TERMINAL ──
  const bosTerm = document.getElementById('bos-term');
  if (bosTerm) {
    let bosStarted = false;
    const bosObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !bosStarted) {
        bosStarted = true;
        termAnim(bosTerm, [
          {h:'<span class="tc-g">$</span> claude @szef "audyt marketingowy + kampania"',d:0},
          {h:'',d:300},
          {h:'<span class="tc-a">@szef</span> <span class="tc-d">Working Memory → ładuję kontekst...</span>',d:600},
          {h:'<span class="tc-a">@szef</span> <span class="tc-d">Affect Modulation → tryb: focused</span>',d:1000},
          {h:'<span class="tc-a">@szef</span> <span class="tc-d">Context Bus → routing do 4 agentów</span>',d:1400},
          {h:'',d:1600},
          {h:'<span class="tc-ok">✓</span> <span class="tc-a">@analityk</span> /audit → SEO + konkurencja',d:2000},
          {h:'<span class="tc-ok">✓</span> <span class="tc-a">@reklamy</span> /kampania → Meta Ads 3-tier',d:2600},
          {h:'<span class="tc-ok">✓</span> <span class="tc-a">@kontent</span> /content-plan → 12 postów/msc',d:3200},
          {h:'<span class="tc-ok">✓</span> <span class="tc-a">@kreacje</span> /kreacja → 3 briefy video',d:3800},
          {h:'',d:4000},
          {h:'<span class="tc-ok">✓</span> <span class="tc-w">Gotowe.</span> <span class="tc-d">4 agentów · 6 skilli · 23 zadania</span>',d:4300},
        ]);
      }
    }, {threshold:.3});
    bosObs.observe(bosTerm);
  }

  // ── UTILS ──
  function countUp(el, target, dur) {
    let s=0; const step=target/(dur/16);
    (function tick(){s+=step;if(s>=target){el.textContent=target;return}el.textContent=Math.floor(s);requestAnimationFrame(tick)})();
  }
  function termAnim(container, lines) {
    container.innerHTML = '';
    lines.forEach(l => {
      const d = document.createElement('div');
      d.className = 'tl';
      d.innerHTML = l.h || '&nbsp;';
      d.style.animationDelay = l.d + 'ms';
      container.appendChild(d);
    });
  }
});
