/* =============================================================
   filters.js — Busca, filtros, favoritos, ordenação e URL
   -------------------------------------------------------------
   Nunca remove cards do DOM: apenas alterna a visibilidade.
   Isso mantém o site rápido e a galeria sempre organizada por
   categoria, como pede o documento do projeto.

   A ordenação alfabética é a única exceção: como a galeria é
   dividida em um container por categoria, ordenar tudo junto
   exige mover os cards para um grid único (#galeriaFlat).
   O caminho de volta está guardado no mapa "ninho".

   O estado (categoria + busca + ordem) também vive na URL, então
   qualquer recorte da galeria vira um link compartilhável (com a
   âncora #jogos junto, para abrir já na galeria) e o botão voltar
   do navegador desfaz um filtro por vez.
   ============================================================= */

function initFilters({ CATEGORIAS, JOGOS, normalize }) {
  const chipsBox = document.querySelector('#chips');
  const input = document.querySelector('#busca');
  const limpar = document.querySelector('#buscaClear');
  const results = document.querySelector('#results');
  const anuncio = document.querySelector('#anuncio');
  const vazio = document.querySelector('#empty');
  const vazioTitulo = document.querySelector('#emptyTitulo');
  const vazioPadrao = document.querySelector('#emptyPadrao');
  const vazioFav = document.querySelector('#emptyFav');
  const resetVazio = document.querySelector('#emptyReset');
  const galeria = document.querySelector('#galeria');
  const galeriaFlat = document.querySelector('#galeriaFlat');
  const selectOrdem = document.querySelector('#ordem');
  const btnSorteio = document.querySelector('#sorteio');
  const secaoJogos = document.querySelector('#jogos');

  const cards = [...document.querySelectorAll('.card')];
  const grupos = [...document.querySelectorAll('.group')];

  /* de onde cada card veio — usado para desfazer a ordenação alfabética */
  const ninho = new Map(cards.map((c) => [c, c.parentElement]));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ORDENS = ['categoria', 'az', 'za'];
  const CATS_VALIDAS = new Set(['todas', 'favoritos', ...CATEGORIAS.map((c) => c.id)]);

  let categoriaAtual = 'todas';
  let termo = '';
  let ordem = 'categoria';

  /* ordem em que os cards aparecem na tela (muda com a ordenação) */
  let ordemVisual = cards;

  /* evita reescrever o histórico quando quem mandou foi o próprio histórico */
  let vindoDoHistorico = false;

  /* ---------- chips ---------- */
  const dados = [
    { id: 'todas', nome: 'Todos os jogos', cor: '#22d3ee', n: JOGOS.length },
    { id: 'favoritos', nome: 'Favoritos', cor: '#ff4d6d', n: FAVORITOS.contar(), coracao: true },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      nome: c.nome,
      cor: c.cor,
      n: JOGOS.filter((j) => j.categoria === c.id).length
    }))
  ];

  const CORACAO_CHIP =
    '<svg class="chip__coracao" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 20.6 4.8 13.4a4.7 4.7 0 0 1 6.6-6.7l.6.6.6-.6a4.7 4.7 0 0 1 6.6 6.7L12 20.6Z" fill="currentColor"/></svg>';

  chipsBox.innerHTML = dados.map((c) => `
    <button type="button" class="chip" style="--accent:${c.cor}"
            data-cat="${c.id}" aria-pressed="${c.id === 'todas'}">
      ${c.coracao ? CORACAO_CHIP : '<span class="chip__dot" aria-hidden="true"></span>'}
      ${c.nome}
      <span class="chip__n">${c.n}</span>
    </button>`).join('');

  const chips = [...chipsBox.querySelectorAll('.chip')];
  const chipFavN = chipsBox.querySelector('[data-cat="favoritos"] .chip__n');

  /* =============================================================
     FAVORITOS
     ============================================================= */
  function pintarFavorito(botao, marcado, nome) {
    botao.classList.toggle('is-fav', marcado);
    botao.setAttribute('aria-pressed', String(marcado));
    botao.setAttribute('aria-label', marcado
      ? `Remover ${nome} dos favoritos`
      : `Adicionar ${nome} aos favoritos`);
  }

  function sincronizarFavoritos() {
    cards.forEach((card) => {
      const botao = card.querySelector('.card__fav');
      if (botao) pintarFavorito(botao, FAVORITOS.tem(card.dataset.id), card.dataset.nome);
    });
    chipFavN.textContent = FAVORITOS.contar();
  }

  function alternarFavorito(botao) {
    const card = botao.closest('.card');
    const nome = card.dataset.nome;
    const marcado = FAVORITOS.alternar(card.dataset.id);

    pintarFavorito(botao, marcado, nome);
    chipFavN.textContent = FAVORITOS.contar();
    anunciar(`${nome} ${marcado ? 'adicionado aos' : 'removido dos'} favoritos.`);

    /* dentro da view "Favoritos" o card precisa sumir/voltar na hora */
    if (categoriaAtual === 'favoritos') aplicar();
  }

  /* =============================================================
     ORDENAÇÃO
     ============================================================= */
  function ordenarDom() {
    if (ordem === 'categoria') {
      ordemVisual = cards;
      cards.forEach((card) => ninho.get(card).appendChild(card));
      return;
    }

    const sinal = ordem === 'az' ? 1 : -1;
    ordemVisual = [...cards].sort((a, b) =>
      sinal * a.dataset.nome.localeCompare(b.dataset.nome, 'pt-BR', { sensitivity: 'base' }));

    ordemVisual.forEach((card) => galeriaFlat.appendChild(card));
  }

  /* =============================================================
     APLICAÇÃO DO FILTRO
     ============================================================= */
  function aplicar({ animar = true } = {}) {
    const busca = normalize(termo.trim());
    const plano = ordem !== 'categoria';
    let visiveis = 0;

    ordemVisual.forEach((card) => {
      const okCat =
        categoriaAtual === 'todas' ? true :
        categoriaAtual === 'favoritos' ? FAVORITOS.tem(card.dataset.id) :
        card.dataset.cat === categoriaAtual;

      const okBusca = !busca || card.dataset.busca.includes(busca);
      const mostrar = okCat && okBusca;

      card.hidden = !mostrar;
      card.classList.remove('is-anim');
      if (mostrar) {
        card.style.setProperty('--i', visiveis % 9);
        visiveis++;
      }
    });

    /* esconde categorias que ficaram sem nenhum jogo
       (na ordenação alfabética não existem grupos na tela) */
    grupos.forEach((g) => {
      const temAlgum = !plano && [...g.querySelectorAll('.card')].some((c) => !c.hidden);
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
    const semFavoritos = categoriaAtual === 'favoritos' && FAVORITOS.contar() === 0;
    vazio.hidden = visiveis > 0;
    vazioTitulo.textContent = semFavoritos ? 'Nenhum favorito ainda' : 'Nenhum jogo encontrado';
    vazioPadrao.hidden = semFavoritos;
    vazioFav.hidden = !semFavoritos;

    galeria.hidden = plano || visiveis === 0;
    galeriaFlat.hidden = !plano || visiveis === 0;

    const plural = visiveis === 1 ? 'jogo' : 'jogos';
    if (busca && categoriaAtual !== 'todas') {
      const nome = dados.find((d) => d.id === categoriaAtual)?.nome ?? '';
      results.textContent = `${visiveis} ${plural} em “${nome}” para “${termo.trim()}”.`;
    } else if (busca) {
      results.textContent = `${visiveis} ${plural} encontrado${visiveis === 1 ? '' : 's'} para “${termo.trim()}”.`;
    } else if (categoriaAtual === 'favoritos') {
      results.textContent = `${visiveis} ${plural} nos seus favoritos.`;
    } else if (categoriaAtual !== 'todas') {
      const nome = dados.find((d) => d.id === categoriaAtual)?.nome ?? '';
      results.textContent = `Mostrando ${visiveis} ${plural} de “${nome}”.`;
    } else {
      results.textContent = `Mostrando todos os ${visiveis} ${plural}.`;
    }

    limpar.hidden = termo.length === 0;
  }

  /* =============================================================
     ESTADO NA URL  (?cat=&q=&ordem=)
     ============================================================= */
  function lerURL() {
    const p = new URLSearchParams(location.search);
    const cat = p.get('cat');
    const q = p.get('q');
    const ord = p.get('ordem');

    categoriaAtual = CATS_VALIDAS.has(cat) ? cat : 'todas';
    termo = typeof q === 'string' ? q : '';
    ordem = ORDENS.includes(ord) ? ord : 'categoria';

    input.value = termo;
    selectOrdem.value = ordem;
  }

  function escreverURL(empilhar) {
    if (vindoDoHistorico) return;

    let url;
    try {
      url = new URL(location.href);
    } catch {
      return;
    }

    const p = url.searchParams;
    if (categoriaAtual === 'todas') p.delete('cat'); else p.set('cat', categoriaAtual);
    if (!termo.trim()) p.delete('q'); else p.set('q', termo.trim());
    if (ordem === 'categoria') p.delete('ordem'); else p.set('ordem', ordem);

    /* com um filtro ativo o link ganha a âncora da galeria: quem abrir o
       link cai direto no resultado, com a rolagem nativa do navegador —
       mais confiável do que um scrollIntoView disputando com a restauração
       de rolagem que o navegador faz depois do load. */
    if (p.has('cat') || p.has('q') || p.has('ordem')) url.hash = 'jogos';

    if (url.href === location.href) return;

    try {
      history[empilhar ? 'pushState' : 'replaceState'](null, '', url);
    } catch {
      /* alguns navegadores bloqueiam o history em file:// —
         o filtro continua funcionando, só não sincroniza a URL */
    }
  }

  /* =============================================================
     MUDANÇA DE ESTADO — ponto único por onde tudo passa
     ============================================================= */
  function definirEstado({ cat, q, ord }, { empilhar = true, animar = true } = {}) {
    const reordenar = ord !== undefined && ord !== ordem;

    if (cat !== undefined) categoriaAtual = cat;
    if (q !== undefined) { termo = q; input.value = q; }
    if (ord !== undefined) ordem = ord;

    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === categoriaAtual)));
    selectOrdem.value = ordem;

    if (reordenar) ordenarDom();
    aplicar({ animar });
    escreverURL(empilhar);
  }

  function anunciar(texto) {
    anuncio.textContent = texto;
  }

  /* =============================================================
     EVENTOS
     ============================================================= */
  chipsBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) definirEstado({ cat: chip.dataset.cat });
  });

  let debounce;
  input.addEventListener('input', () => {
    limpar.hidden = input.value.length === 0;
    clearTimeout(debounce);
    /* digitar não empilha histórico: seria uma entrada por tecla */
    debounce = setTimeout(() => definirEstado({ q: input.value }, { empilhar: false }), 130);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) definirEstado({ q: '' }, { empilhar: false });
  });

  limpar.addEventListener('click', () => {
    definirEstado({ q: '' }, { empilhar: false });
    input.focus();
  });

  resetVazio.addEventListener('click', () => {
    definirEstado({ cat: 'todas', q: '' });
    input.focus();
  });

  selectOrdem.addEventListener('change', () => {
    definirEstado({ ord: selectOrdem.value });
    const rotulo = selectOrdem.options[selectOrdem.selectedIndex].textContent.trim();
    anunciar(`Galeria ordenada: ${rotulo}.`);
  });

  /* favoritar e filtrar por tag — delegado na seção inteira porque
     a ordenação move os cards entre #galeria e #galeriaFlat */
  secaoJogos.addEventListener('click', (e) => {
    const fav = e.target.closest('.card__fav');
    if (fav) { alternarFavorito(fav); return; }

    const tag = e.target.closest('.card__tag');
    if (tag) definirEstado({ cat: 'todas', q: tag.dataset.tag });
  });

  /* categoria escolhida pelos cards da seção "Categorias" */
  document.addEventListener('filtro:set', (e) => {
    definirEstado({ cat: e.detail.categoria, q: '' });
  });

  /* botão voltar/avançar do navegador */
  window.addEventListener('popstate', () => {
    vindoDoHistorico = true;
    const ordemAntiga = ordem;
    lerURL();
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === categoriaAtual)));
    if (ordem !== ordemAntiga) ordenarDom();
    aplicar();
    vindoDoHistorico = false;
  });

  /* ---------- jogo aleatório ---------- */
  btnSorteio.addEventListener('click', () => {
    const disponiveis = ordemVisual.filter((c) => !c.hidden);
    if (!disponiveis.length) {
      anunciar('Nenhum jogo disponível para sortear com os filtros atuais.');
      return;
    }

    const escolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    cards.forEach((c) => c.classList.remove('is-sorteado'));

    escolhido.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    escolhido.classList.add('is-sorteado');
    escolhido.querySelector('.card__play')?.focus({ preventScroll: true });
    anunciar(`Jogo sorteado: ${escolhido.dataset.nome}. Pressione Enter para jogar.`);

    setTimeout(() => escolhido.classList.remove('is-sorteado'), 2200);
  });

  /* ---------- atalho "/" para cair na busca ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    e.preventDefault();
    input.focus();
    input.select();
  });

  /* =============================================================
     BOOT — o estado inicial vem da URL
     ============================================================= */
  lerURL();
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === categoriaAtual)));
  sincronizarFavoritos();
  ordenarDom();
  aplicar({ animar: false });
}
