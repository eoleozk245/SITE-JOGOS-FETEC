# 🎮 Jogos com JavaScript

Galeria dos **14 jogos** desenvolvidos em JavaScript pelos alunos do 1º ano do
Ensino Médio integrado ao técnico em Informática para Internet.

**Etec Darcy Pereira de Moraes** · Projeto de Arte Digital
Desenvolvido por **Leonardo de Campos Silva Machado**

---

## 🚀 Como abrir

**Jeito mais rápido:** dê dois cliques em `index.html`. O site funciona direto
do arquivo, sem servidor — os scripts foram escritos justamente para isso.

**Jeito recomendado (VS Code):** instale a extensão *Live Server*, clique com o
botão direito em `index.html` → **Open with Live Server**. Assim o site recarrega
sozinho quando você edita algo.

## 🌐 Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub.
2. Suba **todos os arquivos desta pasta** (o `index.html` precisa ficar na raiz).
3. No repositório: **Settings → Pages → Source: `Deploy from a branch`**,
   branch `main`, pasta `/ (root)` → **Save**.
4. Em ~1 minuto o site sai no ar em
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

---

## 📁 Estrutura

```
/
├── index.html            estrutura da página
├── css/
│   └── style.css         design system, layout, animações, responsivo
├── js/
│   ├── games.js          ⭐ os 14 jogos e as 6 categorias (é aqui que se edita)
│   ├── covers.js         arte vetorial das capas
│   ├── favoritos.js      lista de favoritos salva no navegador
│   ├── filters.js        busca, filtros, favoritos, ordenação e estado na URL
│   └── app.js            monta a página, navbar, scroll e efeitos
├── assets/
│   ├── favicon.svg
│   └── covers/           lugar para prints reais dos jogos (opcional)
└── README.md
```

Os scripts são carregados nesta ordem:
`games.js → favoritos.js → covers.js → filters.js → app.js`.

---

## 🕹️ Como usar a galeria

| Recurso | Como funciona |
|---|---|
| **Busca** | Digite qualquer parte do nome, da descrição, da categoria ou de uma tag. Funciona com ou sem acento. Atalho: tecle <kbd>/</kbd> de qualquer lugar da página; <kbd>Esc</kbd> limpa. |
| **Filtro por categoria** | Pelos chips acima da galeria ou clicando num card da seção *Categorias*. |
| **Favoritos** | O coração no canto da capa salva o jogo. A lista fica **no seu próprio navegador** (nada é enviado para lugar nenhum) e sobrevive ao fechar a aba. O chip *Favoritos* mostra só os salvos. |
| **Tags** | As tags dos cards são clicáveis e filtram a galeria por aquele estilo. |
| **Ordenação** | *Por categoria* (padrão, agrupado) ou por nome, A–Z / Z–A (lista única). |
| **Jogo aleatório** | Sorteia entre os jogos que estão visíveis no momento, rola até o card e deixa o botão *Jogar* pronto para o Enter. |

### Links compartilháveis

O que está filtrado aparece na URL, então dá para mandar um recorte da galeria
para alguém:

```
index.html?cat=runner#jogos          só os corredores infinitos
index.html?q=plataforma#jogos        busca por "plataforma"
index.html?cat=favoritos#jogos       os favoritos de quem abrir (é uma lista local)
index.html?ordem=az#jogos            os 14 jogos em ordem alfabética
```

O botão **voltar** do navegador desfaz um filtro por vez. Digitar na busca não
enche o histórico: só a URL é atualizada.

> Em `file://` (abrindo por dois cliques) alguns navegadores bloqueiam a escrita
> da URL. Os filtros continuam funcionando normalmente — só o link deixa de
> refletir o estado. Com Live Server ou no GitHub Pages funciona tudo.

---

## ✏️ Como mexer no conteúdo

### Adicionar um jogo novo

Abra `js/games.js` e acrescente um objeto no array `JOGOS`:

```js
{
  id: 'meu-jogo',                       // sem espaços nem acentos
  nome: 'Meu Jogo',
  categoria: 'acao-herois',             // id de uma das 6 categorias
  descricao: 'Uma frase curta explicando o jogo.',
  link: 'https://usuario.github.io/meu-jogo/',
  tags: ['Ação', 'Aventura'],
  capa: null                            // null = arte automática
}
```

Pronto: card, contador, chip de filtro e busca se atualizam sozinhos.
Não precisa tocar no HTML.

### Trocar a capa por um print real

```js
capa: 'assets/covers/meu-jogo.jpg'
```

Se o arquivo não existir ou não carregar, o card volta sozinho para a arte
vetorial — nenhum card fica com imagem quebrada.
Detalhes e dicas de tamanho em `assets/covers/LEIA-ME.md`.

### Trocar as cores

Tudo mora no topo de `css/style.css`, no bloco `:root`. Trocar `--brand` e
`--brand-2` já muda o site inteiro. A cor de cada categoria fica no campo
`cor` dentro de `js/games.js`.

---

## 🎨 Decisões de design

| Item | Escolha |
|---|---|
| Identidade | Gaming + tecnologia + UI premium, base azul/ciano |
| Fundo | Gradientes radiais em camadas, aurora animada e partículas — nunca `#000` |
| Tipografia | **Space Grotesk** (títulos) + **Inter** (texto) |
| Cards | Glassmorphism, capa 16:10, hover com elevação, zoom e glow da categoria |
| Botão Jogar | Sempre azul→ciano (ação principal constante) e abre em nova aba |
| Categorias | Acento próprio por categoria, usado só em detalhes — a identidade continua azul |

## ⚡ Performance

- Zero bibliotecas externas: só HTML, CSS e JavaScript puro.
- Capas em SVG desenhado por código: por padrão não há download de imagem nenhum.
- `aspect-ratio` fixo nos cards → sem “pulo” de layout (CLS ≈ 0).
- Partículas desligadas em telas pequenas e quando a aba fica em segundo plano.
- Animações só em `opacity`, `transform` e `translate` (rodam na GPU).

## ♿ Acessibilidade

- Contraste verificado: texto principal 15:1, secundário 9:1, terciário 5,6:1 (WCAG AA/AAA).
- Navegação completa por teclado, com `:focus-visible` bem visível e link “pular para os jogos”.
- Todo botão de ícone tem `aria-label`; o botão Jogar avisa que abre em nova aba.
- Contador de resultados da busca anunciado por leitor de tela (`aria-live`).
- Hierarquia de títulos correta (h1 → h2 → h3) e `lang="pt-BR"`.
- Respeita `prefers-reduced-motion`: quem tem redução de movimento ativada vê o site parado.
- Áreas de toque de no mínimo 44×44 px no celular.
- Favoritar, ordenar e sortear anunciam o resultado por `aria-live`; o coração usa `aria-pressed`.
- O atalho <kbd>/</kbd> é ignorado enquanto você digita em um campo.

## 📱 Responsividade

| Tela | Comportamento |
|---|---|
| Até 620 px | 1 card por linha, menu hambúrguer, filtros deslizando na horizontal, partículas off |
| 621 – 1023 px | 2 cards por linha, 2 categorias por linha |
| 1024 px+ | 3 cards por linha, 3 categorias por linha, navbar completa com indicador |
| 1440 px+ | Mesma leitura, container um pouco mais largo |

---

## ✅ Conteúdo conferido

Os 14 jogos, as 6 categorias, as descrições, os links e os dados do rodapé foram
transcritos do documento oficial **“Arte Digital – site Jogos JavaScript”** e
conferidos um a um.

**Alteração posterior ao documento:** o jogo que constava como *Bom Velhinho*
passou a se chamar **Batalha de Robôs** (id `batalha-de-robos`), com descrição,
tags e capa novas. O link do aluno continua o mesmo.
