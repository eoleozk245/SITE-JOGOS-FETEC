/* =============================================================
   favoritos.js — Jogos marcados com coração pelo visitante
   -------------------------------------------------------------
   Guarda apenas os ids dos jogos no localStorage do navegador.
   Nada é enviado para lugar nenhum: é uma lista local, do
   próprio aparelho de quem está visitando.

   Se o armazenamento estiver bloqueado (janela anônima, alguns
   navegadores abrindo por file://), o site continua funcionando
   normalmente — os favoritos só não sobrevivem ao fechar a aba.
   ============================================================= */

const FAVORITOS = (() => {
  const CHAVE = 'jogosjs:favoritos';

  /* a memória é sempre a fonte de leitura; o localStorage é o espelho */
  let memoria = new Set();
  let persistente = true;

  try {
    const bruto = localStorage.getItem(CHAVE);
    const lido = bruto ? JSON.parse(bruto) : null;
    if (Array.isArray(lido)) {
      memoria = new Set(lido.filter((id) => typeof id === 'string'));
    }
  } catch {
    /* storage indisponível ou conteúdo corrompido: começa do zero */
    persistente = false;
  }

  function gravar() {
    if (!persistente) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify([...memoria]));
    } catch {
      persistente = false;
    }
  }

  return {
    lista: () => [...memoria],
    tem: (id) => memoria.has(id),
    contar: () => memoria.size,

    /* alterna e devolve o novo estado (true = agora é favorito) */
    alternar(id) {
      const marcado = !memoria.has(id);
      if (marcado) memoria.add(id);
      else memoria.delete(id);
      gravar();
      return marcado;
    }
  };
})();
