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
│   ├── filters.js        busca instantânea + filtros por categoria
│   └── app.js            monta a página, navbar, scroll e efeitos
├── assets/
│   ├── favicon.svg
│   └── covers/           lugar para prints reais dos jogos (opcional)
└── README.md
```

Os scripts são carregados nesta ordem: `games.js → covers.js → filters.js → app.js`.

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
- Capas em SVG desenhado por código: não há download de imagem nenhum.
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
