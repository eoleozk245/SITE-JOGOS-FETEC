/* =============================================================
   app.js — Montagem da interface e comportamentos globais
   ============================================================= */

/* Depende de: games.js, covers.js, filters.js (carregados antes deste arquivo). */

/* ---------- helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const escHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escHtml(s).replace(/"/g, '&quot;');

/* remove acentos para a busca funcionar com ou sem acentuação */
const normalize = (s) => String(s)
  .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- ícones das categorias ---------- */
const ICONES = {
  bolt: '<path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>',
  joystick: '<rect x="2.5" y="8.5" width="19" height="11" rx="4.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M7 12v4M5 14h4M12 4.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="13" r="1.4" fill="currentColor"/><circle cx="18.8" cy="15.6" r="1.4" fill="currentColor"/>',
  pulse: '<path d="M2 12h3.5l2.5-7 4 14 2.8-9 1.7 4H22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  run: '<circle cx="15.5" cy="4.6" r="2.1" stroke="currentColor" stroke-width="1.7" fill="none"/><path d="M12.6 21.5l1.6-5.4-3-2.6.9-4.7-3.4 2.2-1.5 3M14.2 16.1l3.6 2 1.3 3.4M12.1 8.8l3.7-.8 2.5 2.8 2.6.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M2 9.5h4M3 13h3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  shield: '<path d="M12 2.8 4.5 6v6c0 4.6 3.2 8.2 7.5 9.2 4.3-1 7.5-4.6 7.5-9.2V6L12 2.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="m8.8 12 2.2 2.2 4.2-4.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  cube: '<path d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7L12 2.6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="M3.5 7 12 11.6 20.5 7M12 11.6v9.8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>'
};

const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4.8v14.4a1 1 0 0 0 1.53.85l11.2-7.2a1 1 0 0 0 0-1.7L8.53 3.95A1 1 0 0 0 7 4.8Z" fill="currentColor"/></svg>';

/* =============================================================
   RENDERIZAÇÃO
   ============================================================= */

function montarDefs() {
  document.body.insertAdjacentHTML('afterbegin', SHARED_DEFS);
}

function montarCategorias() {
  const alvo = $('#catsGrid');
  alvo.innerHTML = CATEGORIAS.map((c, i) => {
    const total = getJogosPorCategoria(c.id).length;
    return `<button type="button" class="cat reveal" style="--accent:${c.cor}" data-cat="${escAttr(c.id)}"
      aria-label="Filtrar galeria pela categoria ${escAttr(c.nome)}" data-i="${i}">
      <span class="cat__icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONES[c.icone]}</svg></span>
      <span class="cat__name">${escHtml(c.nome)}</span>
      <span class="cat__sub">${escHtml(c.resumo)}</span>
      <span class="cat__count">${total} ${total === 1 ? 'jogo' : 'jogos'}</span>
    </button>`;
  }).join('');

  $$('.cat', alvo).forEach((el, i) => el.style.setProperty('--i', i));

  alvo.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat');
    if (!btn) return;
    document.dispatchEvent(new CustomEvent('filtro:set', { detail: { categoria: btn.dataset.cat } }));
    $('#jogos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
}

function cardHTML(jogo, cat, numero, indiceNoGrupo = 0) {
  const media = jogo.capa
    ? `<img src="${escAttr(jogo.capa)}" alt="Capa do jogo ${escAttr(jogo.nome)}" loading="lazy" decoding="async" width="640" height="400">`
    : coverFor(jogo, cat.cor);

  const busca = normalize(`${jogo.nome} ${jogo.descricao} ${cat.nome} ${jogo.tags.join(' ')}`);

  return `<article class="card" style="--accent:${cat.cor};--ci:${indiceNoGrupo}" data-cat="${escAttr(cat.id)}"
      data-nome="${escAttr(jogo.nome)}" data-busca="${escAttr(busca)}">
    <div class="card__media">
      ${media}
      <span class="card__badge"><i aria-hidden="true"></i>${escHtml(cat.nome)}</span>
      <span class="card__num" aria-hidden="true">${String(numero).padStart(2, '0')}</span>
    </div>
    <div class="card__body">
      <h3 class="card__title">${escHtml(jogo.nome)}</h3>
      <p class="card__desc">${escHtml(jogo.descricao)}</p>
      <div class="card__tags">
        ${jogo.tags.map((t) => `<span class="card__tag">${escHtml(t)}</span>`).join('')}
      </div>
    </div>
    <div class="card__foot">
      <a class="card__play" href="${escAttr(jogo.link)}" target="_blank" rel="noopener noreferrer"
         aria-label="Jogar ${escAttr(jogo.nome)} — abre em uma nova aba">
        Jogar ${PLAY_ICON}
      </a>
    </div>
  </article>`;
}

function montarGaleria() {
  const alvo = $('#galeria');
  let n = 0;

  alvo.innerHTML = CATEGORIAS.map((cat) => {
    const jogos = getJogosPorCategoria(cat.id);
    const cards = jogos.map((j, k) => cardHTML(j, cat, ++n, k)).join('');
    return `<section class="group" style="--accent:${cat.cor}" data-group="${escAttr(cat.id)}">
      <header class="group__head reveal">
        <span class="group__bar" aria-hidden="true"></span>
        <h3 class="group__title">${escHtml(cat.nome)}</h3>
        <span class="group__count">${jogos.length} ${jogos.length === 1 ? 'jogo' : 'jogos'}</span>
      </header>
      <div class="grid">${cards}</div>
    </section>`;
  }).join('');
}

/* =============================================================
   NAVBAR — scroll, indicador, menu mobile, seção ativa
   ============================================================= */
function initNav() {
  const nav = $('#nav');
  const links = $$('.nav__link');
  const painel = $('#navLinks');
  const toggle = $('#navToggle');
  const secoes = links
    .map((l) => document.getElementById(l.getAttribute('href').slice(1)))
    .filter(Boolean);

  /* indicador deslizante */
  const moverIndicador = (link) => {
    if (!link || window.innerWidth <= 900) return;
    painel.style.setProperty('--ind-x', `${link.offsetLeft}px`);
    painel.style.setProperty('--ind-w', `${link.offsetWidth}px`);
  };

  const ativar = (id) => {
    links.forEach((l) => {
      const on = l.getAttribute('href') === `#${id}`;
      l.classList.toggle('is-active', on);
      if (on) moverIndicador(l);
    });
  };

  /* estado de rolagem + seção visível */
  let ticking = false;
  const aoRolar = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);

    const limite = window.scrollY + window.innerHeight * 0.34;
    let atual = secoes[0];
    for (const s of secoes) if (s.offsetTop <= limite) atual = s;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
      atual = secoes[secoes.length - 1];
    }
    if (atual) ativar(atual.id);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });

  window.addEventListener('resize', () => {
    moverIndicador($('.nav__link.is-active'));
  });

  /* menu mobile */
  const fechar = () => {
    painel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
  };

  toggle.addEventListener('click', () => {
    const aberto = painel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  });

  painel.addEventListener('click', (e) => { if (e.target.closest('.nav__link')) fechar(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && painel.classList.contains('is-open')) { fechar(); toggle.focus(); }
  });

  document.addEventListener('click', (e) => {
    if (painel.classList.contains('is-open') && !e.target.closest('.nav__inner')) fechar();
  });

  aoRolar();
  requestAnimationFrame(() => moverIndicador($('.nav__link.is-active')));
}

/* =============================================================
   REVEAL ao rolar
   ============================================================= */
function initReveal() {
  const alvos = [...$$('.reveal'), ...$$('.group')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      const d = en.target.dataset;
      if (d.delay || d.i) en.target.style.setProperty('--i', d.delay || d.i);
      en.target.classList.add('is-in');
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

  alvos.forEach((el) => obs.observe(el));
}

/* =============================================================
   PARTÍCULAS do fundo (discretas e baratas)
   ============================================================= */
function initParticulas() {
  const canvas = $('#particles');
  if (!canvas || reduceMotion || window.innerWidth < 640) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, pontos = [], raf = null;

  const criar = () => {
    const qtd = Math.round(Math.min(64, (w * h) / 26000));
    pontos = Array.from({ length: qtd }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + .5,
      vx: (Math.random() - .5) * .16,
      vy: -(Math.random() * .22 + .05),
      a: Math.random() * .45 + .15,
      c: Math.random() > .55 ? '34,211,238' : '129,160,255'
    }));
  };

  const medir = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    criar();
  };

  const desenhar = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pontos) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(desenhar);
  };

  medir();
  desenhar();

  window.addEventListener('resize', medir);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
    else if (!raf) desenhar();
  });
}

/* =============================================================
   BOOT
   ============================================================= */
function init() {
  montarDefs();
  montarCategorias();
  montarGaleria();
  initNav();
  initFilters({ CATEGORIAS, JOGOS, normalize });
  initReveal();
  initParticulas();

  $('#ano').textContent = new Date().getFullYear();
  document.title = `${INSTITUCIONAL.titulo} — ${INSTITUCIONAL.escola}`;
}

document.addEventListener('DOMContentLoaded', init);
