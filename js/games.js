/* =============================================================
   games.js — Fonte única de dados do catálogo
   -------------------------------------------------------------
   Conteúdo extraído do documento oficial do projeto
   "Arte Digital – site Jogos JavaScript".
   Nomes, descrições e links NÃO devem ser alterados.

   Para adicionar um jogo novo no futuro, basta acrescentar um
   objeto neste array — o site inteiro se reconstrói sozinho.

   Campo "capa":
     null  -> o site desenha a arte vetorial do jogo (covers.js)
     "..." -> caminho ou URL de uma imagem real
              ex.: "assets/covers/spider-man.jpg"
   ============================================================= */

const CATEGORIAS = [
  {
    id: 'acao-herois',
    nome: 'Ação e Heróis',
    resumo: 'Combate, agilidade e rivalidades clássicas dos quadrinhos.',
    cor: '#ff4d6d',
    icone: 'bolt'
  },
  {
    id: 'classicos-arcade',
    nome: 'Clássicos Reformulados e Arcade',
    resumo: 'Fliperama de sempre, repaginado com cara de hoje.',
    cor: '#ffc53d',
    icone: 'joystick'
  },
  {
    id: 'ritmo-plataforma',
    nome: 'Ritmo, Plataforma e Reflexos',
    resumo: 'Saltos no tempo certo, precisão e muito reflexo.',
    cor: '#a855f7',
    icone: 'pulse'
  },
  {
    id: 'runner',
    nome: 'Corredores Infinitos e Fuga',
    resumo: 'Corra, desvie e sobreviva o máximo que conseguir.',
    cor: '#22e39a',
    icone: 'run'
  },
  {
    id: 'coop-rpg',
    nome: 'Cooperativo e RPG',
    resumo: 'Trabalho em equipe, quebra-cabeças e aventura.',
    cor: '#ff8f3c',
    icone: 'shield'
  },
  {
    id: 'criatividade-esportes',
    nome: 'Criatividade e Esportes',
    resumo: 'Construção livre, mira, física e criatividade.',
    cor: '#2dd4bf',
    icone: 'cube'
  }
];

const JOGOS = [
  /* ---------- Ação e Heróis ---------- */
  {
    id: 'spider-man',
    nome: 'Spider Man',
    categoria: 'acao-herois',
    descricao:
      'Aventura inspirada no herói aracnídeo e em Miles Morales, focada em ação e agilidade.',
    link: 'https://ianfillype.github.io/SpiderMan-and-Miles-Morales-/',
    tags: ['Ação', 'Aventura', 'Herói'],
    capa: 'assets/covers/spider-man.jpg'
  },
  {
    id: 'spider-man-vs-venom',
    nome: 'Spider-Man vs Venom',
    categoria: 'acao-herois',
    descricao:
      'Jogo de combate ou plataforma que revive a clássica rivalidade entre o herói de Nova York e o simbionte Venom.',
    link: 'https://otaviohss2000-cmyk.github.io/Spider-Man-vs-Venom/',
    tags: ['Combate', 'Plataforma', 'Herói'],
    capa: 'assets/covers/spider-man-vs-venom.jpg'
  },

  /* ---------- Clássicos Reformulados e Arcade ---------- */
  {
    id: 'pac-man-neon',
    nome: 'Pac-Man Neon',
    categoria: 'classicos-arcade',
    descricao:
      'O clássico jogo de comer pastilhas e fugir de fantasmas, mas com um visual moderno e brilhante em estilo neon.',
    link: 'https://yschavareto5-ctrl.github.io/estagioo/',
    tags: ['Arcade', 'Labirinto', 'Neon'],
    capa: 'assets/covers/pac-man-neon.jpg'
  },
  {
    id: 'pac-number',
    nome: 'Pac-Number',
    categoria: 'classicos-arcade',
    descricao:
      'Uma variação criativa e matemática inspirada nas mecânicas de labirinto do Pac-Man original.',
    link: 'https://pedroschumann33-commits.github.io/fetec23/',
    tags: ['Arcade', 'Lógica', 'Labirinto'],
    capa: 'assets/covers/pac-number.jpg'
  },
  {
    id: 'batalha-de-robos',
    nome: 'Batalha de Robôs',
    categoria: 'classicos-arcade',
    descricao:
      'Duelo de robôs em fases de ação e plataforma, na linha dos clássicos de tiro e reflexo do fliperama.',
    link: 'https://joaofelipedeoliveira730-lab.github.io/GAMESDOVELHO/',
    tags: ['Ação', 'Robôs', 'Retrô'],
    capa: 'assets/covers/batalha-de-robos.jpg'
  },

  /* ---------- Ritmo, Plataforma e Reflexos ---------- */
  {
    id: 'geometry-dash',
    nome: 'Geometry Dash',
    categoria: 'ritmo-plataforma',
    descricao:
      'Jogo de plataforma baseado em ritmo onde você deve saltar por obstáculos pontiagudos no tempo certo da música.',
    link: 'https://gabrieloolls.github.io/jogo/',
    tags: ['Ritmo', 'Plataforma', 'Reflexo'],
    capa: null
  },
  {
    id: 'bloco-sorridente',
    nome: 'Bloco Sorridente',
    categoria: 'ritmo-plataforma',
    descricao:
      'Um remix personalizado inspirado nas mecânicas desafiadoras e no estilo visual de Geometry Dash.',
    link: 'https://muriloantonioalmeida12-bot.github.io/geometry-dash-remix/',
    tags: ['Remix', 'Plataforma', 'Desafio'],
    capa: null
  },
  {
    id: 'parkour-magico',
    nome: 'Parkour Mágico',
    categoria: 'ritmo-plataforma',
    descricao:
      'Desafio de plataforma onde o objetivo é saltar entre obstáculos usando agilidade e elementos mágicos.',
    link: 'https://davilanche9-dotcom.github.io/Parkour-M-gico/',
    tags: ['Parkour', 'Plataforma', 'Magia'],
    capa: null
  },

  /* ---------- Corredores Infinitos e Fuga (Runner) ---------- */
  {
    id: 'dino-runner',
    nome: 'Dino Runner',
    categoria: 'runner',
    descricao:
      'O famoso jogo do dinossauro do Google Chrome, onde você corre sem parar desviando de cactos e pterodáctilos.',
    link: 'https://kauangamer845-art.github.io/dino-runner/',
    tags: ['Runner', 'Infinito', 'Clássico'],
    capa: null
  },
  {
    id: 'doggy-escape',
    nome: 'Doggy Escape',
    categoria: 'runner',
    descricao:
      'Jogo casual de esquiva e velocidade focado na fuga de um cachorrinho simpático.',
    link: 'https://calopsitadomal20-hue.github.io/jogocachorrinho/',
    tags: ['Casual', 'Esquiva', 'Velocidade'],
    capa: null
  },

  /* ---------- Cooperativo e RPG ---------- */
  {
    id: 'templo-dos-elementos',
    nome: 'Templo dos elementos',
    categoria: 'coop-rpg',
    descricao:
      'Jogo de quebra-cabeça e plataforma cooperativo baseado no clássico "Fireboy and Watergirl" (Foguinho e Aguinha).',
    link: 'https://waguinhodinosauro-tech.github.io/Foguinho-e-Aguinha/',
    tags: ['Cooperativo', 'Puzzle', 'Plataforma'],
    capa: null
  },
  {
    id: 'pokemon-firered',
    nome: 'Pokémon FireRed',
    categoria: 'coop-rpg',
    descricao:
      'Adaptação ou emulação do clássico RPG de Game Boy Advance para capturar e batalhar com monstrinhos de bolso.',
    link: 'https://joaopedromunhoz010-ops.github.io/P-k-mon-FireRed-java-escola/',
    tags: ['RPG', 'Aventura', 'Retrô'],
    capa: null
  },

  /* ---------- Criatividade e Esportes ---------- */
  {
    id: 'minecraft',
    nome: 'Minecraft',
    categoria: 'criatividade-esportes',
    descricao:
      'Versão inspirada no famoso jogo de blocos voltada para exploração, sobrevivência ou construção livre.',
    link: 'https://eloh017.github.io/JOGO-MINECRAFT/',
    tags: ['Sandbox', 'Construção', 'Exploração'],
    capa: null
  },
  {
    id: 'rei-da-mesa',
    nome: 'Rei da mesa',
    categoria: 'criatividade-esportes',
    descricao:
      'Simulador virtual de bilhar (sinuca) feito para testar sua mira, física e ângulos nas tacadas.',
    link: 'https://kallebrafael.github.io/JogoBilharETEC/',
    tags: ['Esporte', 'Física', 'Mira'],
    capa: null
  }
];

/* Informações institucionais — conforme o documento oficial */
const INSTITUCIONAL = {
  titulo: 'Jogos com JavaScript',
  descricao:
    'Jogos desenvolvidos pelos alunos do 1º ano do Ensino Médio integrado ao técnico em Informática para Internet',
  escola: 'Etec Darcy Pereira de Moraes',
  turma: '1º ano – Informática para Internet',
  autor: 'Leonardo de Campos Silva Machado'
};

const getCategoria = (id) => CATEGORIAS.find((c) => c.id === id);
const getJogosPorCategoria = (id) => JOGOS.filter((j) => j.categoria === id);
