/* =============================================================
   filters.js — Busca instantânea + filtros por categoria
   -------------------------------------------------------------
   Nunca remove cards do DOM: apenas alterna a visibilidade.
   Isso mantém o site rápido e a galeria sempre organizada por
   categoria, como pede o documento do projeto.
   ============================================================= */

function initFilters({ CATEGORIAS, JOGOS, normalize }) {
  const chipsBox = document.querySelector('#chips');
  const input = document.querySelector('#busca');
  const limpar = document.querySelector('#buscaClear');
  const results = document.querySelector('#results');
  const vazio = document.querySelector('#empty');
  const resetVazio = document.querySelector('#emptyReset');

  const cards = [...document.querySelectorAll('.card')];
  const grupos = [...document.querySelectorAll('.group')];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let categoriaAtual = 'todas';
  let termo = '';

  /* ---------- chips ---------- */
  const dados = [
    { id: 'todas', nome: 'Todos os jogos', cor: '#22d3ee', n: JOGOS.length },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      nome: c.nome,
      cor: c.cor,
      n: JOGOS.filter((j) => j.categoria === c.id).length
    }))
  ];

  chipsBox.innerHTML = dados.map((c) => `
    <button type="button" class="chip" style="--accent:${c.cor}"
            data-cat="${c.id}" aria-pressed="${c.id === 'todas'}">
      <span class="chip__dot" aria-hidden="true"></span>
      ${c.nome}
      <span class="chip__n">${c.n}</span>
    </button>`).join('');

  const chips = [...chipsBox.querySelectorAll('.chip')];

  /* ---------- aplicação do filtro ---------- */
  function aplicar({ animar = true } = {}) {
    const busca = normalize(termo.trim());
    let visiveis = 0;

    cards.forEach((card) => {
      const okCat = categoriaAtual === 'todas' || card.dataset.cat === categoriaAtual;
      const okBusca = !busca || card.dataset.busca.includes(busca);
      const mostrar = okCat && okBusca;

      card.hidden = !mostrar;
      card.classList.remove('is-anim');
      if (mostrar) {
        card.style.setProperty('--i', visiveis % 9);
        visiveis++;
      }
    });

    /* esconde categorias que ficaram sem nenhum jogo */
    grupos.forEach((g) => {
      const temAlgum = [...g.querySelectorAll('.card')].some((c) => !c.hidden);
      g.hidden = !temAlgum;

      /* garante que nada fique invisível: um grupo que aparece por causa
         de um filtro pode nunca ter passado pelo observer de scroll */
      if (animar && temAlgum) {
        g.classList.add('is-in');
        g.querySelector('.group__head')?.classList.add('is-in');
      }
    });

    /* reanima a entrada dos cards visíveis */
    if (animar && !reduceMotion) {
      requestAnimationFrame(() => {
        cards.forEach((c) => { if (!c.hidden) c.classList.add('is-anim'); });
      });
    }

    /* estado vazio + contador acessível */
    vazio.hidden = visiveis > 0;
    document.querySelector('#galeria').hidden = visiveis === 0;

    const plural = visiveis === 1 ? 'jogo' : 'jogos';
    if (busca && categoriaAtual !== 'todas') {
      const nome = dados.find((d) => d.id === categoriaAtual)?.nome ?? '';
      results.textContent = `${visiveis} ${plural} em “${nome}” para “${termo.trim()}”.`;
    } else if (busca) {
      results.textContent = `${visiveis} ${plural} encontrado${visiveis === 1 ? '' : 's'} para “${termo.trim()}”.`;
    } else if (categoriaAtual !== 'todas') {
      const nome = dados.find((d) => d.id === categoriaAtual)?.nome ?? '';
      results.textContent = `Mostrando ${visiveis} ${plural} de “${nome}”.`;
    } else {
      results.textContent = `Mostrando todos os ${visiveis} ${plural}.`;
    }

    limpar.hidden = termo.length === 0;
  }

  function definirCategoria(id) {
    categoriaAtual = id;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === id)));
    aplicar();
  }

  /* ---------- eventos ---------- */
  chipsBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) definirCategoria(chip.dataset.cat);
  });

  let debounce;
  input.addEventListener('input', () => {
    termo = input.value;
    limpar.hidden = termo.length === 0;
    clearTimeout(debounce);
    debounce = setTimeout(() => aplicar(), 130);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) { input.value = ''; termo = ''; aplicar(); }
  });

  limpar.addEventListener('click', () => {
    input.value = ''; termo = '';
    aplicar();
    input.focus();
  });

  resetVazio.addEventListener('click', () => {
    input.value = ''; termo = '';
    definirCategoria('todas');
    input.focus();
  });

  /* categoria escolhida pelos cards da seção "Categorias" */
  document.addEventListener('filtro:set', (e) => {
    input.value = ''; termo = '';
    definirCategoria(e.detail.categoria);
  });

  aplicar({ animar: false });
}
