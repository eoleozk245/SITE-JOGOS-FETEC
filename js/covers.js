/* =============================================================
   covers.js — Arte vetorial das capas
   -------------------------------------------------------------
   Cada jogo recebe uma "key art" própria, desenhada em SVG com a
   identidade visual do site. Vantagens: carrega instantaneamente,
   nunca deforma, funciona offline e mantém o catálogo coerente.

   Quer usar um print real de um jogo?
   Basta preencher o campo "capa" em js/games.js:
       capa: 'assets/covers/dino-runner.jpg'
   O card passa a usar a imagem e ignora o desenho automático.
   ============================================================= */

const VB = '0 0 640 400';

/* Texturas compartilhadas por todas as capas (injetadas uma vez) */
const SHARED_DEFS = `
<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <defs>
    <pattern id="cvGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="#ffffff" stroke-opacity=".055" stroke-width="1"/>
    </pattern>
    <pattern id="cvDots" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#ffffff" fill-opacity=".07"/>
    </pattern>
    <linearGradient id="cvScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset=".45" stop-color="#050a1a" stop-opacity="0"/>
      <stop offset="1" stop-color="#050a1a" stop-opacity=".72"/>
    </linearGradient>
    <radialGradient id="cvVignette" cx=".5" cy=".42" r=".78">
      <stop offset=".55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".45"/>
    </radialGradient>
  </defs>
</svg>`;

/* ---------- moldura padrão de todas as capas ---------- */
function frame(id, accent, motif, opts = {}) {
  const { glow = [430, 110], texture = 'cvGrid', deep = '#081127' } = opts;
  return `<svg class="cover-art" viewBox="${VB}" preserveAspectRatio="xMidYMid slice"
     role="img" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${deep}"/>
      <stop offset=".55" stop-color="#0b1a3d"/>
      <stop offset="1" stop-color="#071026"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="${accent}" stop-opacity=".55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}-cyan" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#22d3ee" stop-opacity=".38"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="400" fill="url(#${id}-bg)"/>
  <ellipse cx="${glow[0]}" cy="${glow[1]}" rx="290" ry="230" fill="url(#${id}-glow)"/>
  <ellipse cx="110" cy="330" rx="250" ry="200" fill="url(#${id}-cyan)"/>
  <rect width="640" height="400" fill="url(#${texture})"/>
  ${motif}
  <rect width="640" height="400" fill="url(#cvScrim)"/>
  <rect width="640" height="400" fill="url(#cvVignette)"/>
</svg>`;
}

/* =============================================================
   MOTIVOS — um por jogo
   ============================================================= */
const MOTIVOS = {
  /* ---------------- Spider Man ---------------- */
  'spider-man': (id, a) => frame(id, a, `
    <g stroke="#ffffff" stroke-opacity=".26" fill="none" stroke-width="1.6" stroke-linecap="round">
      <path d="M0 0 L640 210M0 0 L520 400M0 0 L250 400M0 0 L640 90M0 0 L640 330M0 0 L60 400"/>
      <path d="M96 0A96 96 0 0 1 0 96" stroke-opacity=".34"/>
      <path d="M186 0A186 186 0 0 1 0 186" stroke-opacity=".3"/>
      <path d="M292 0A292 292 0 0 1 0 292" stroke-opacity=".24"/>
      <path d="M410 0A410 410 0 0 1 0 410" stroke-opacity=".18"/>
      <path d="M540 0A540 540 0 0 1 0 540" stroke-opacity=".12"/>
    </g>
    <g transform="translate(432 186)">
      <ellipse rx="150" ry="118" fill="${a}" fill-opacity=".16"/>
      <g fill="#f8fbff">
        <ellipse cx="0" cy="0" rx="26" ry="34"/>
        <ellipse cx="0" cy="-36" rx="17" ry="14"/>
      </g>
      <g stroke="#f8fbff" stroke-width="7" stroke-linecap="round" fill="none">
        <path d="M-22-16C-58-44-74-30-96-58M22-16C58-44 74-30 96-58"/>
        <path d="M-24-2C-64-8-80 8-108 4M24-2C64-8 80 8 108 4"/>
        <path d="M-22 14C-56 32-66 24-88 52M22 14C56 32 66 24 88 52"/>
        <path d="M-14 30C-34 58-44 60-56 88M14 30C34 58 44 60 56 88"/>
      </g>
    </g>`, { glow: [440, 180] }),

  /* ---------------- Spider-Man vs Venom ---------------- */
  'spider-man-vs-venom': (id, a) => frame(id, a, `
    <g stroke="#ff4d6d" stroke-opacity=".3" fill="none" stroke-width="1.6">
      <path d="M0 0 L300 400M0 0 L300 120M0 0 L120 400M0 0 L300 260"/>
      <path d="M120 0A120 120 0 0 1 0 120"/><path d="M230 0A230 230 0 0 1 0 230"/>
      <path d="M340 0A340 340 0 0 1 0 340" stroke-opacity=".18"/>
    </g>
    <path d="M640 0H360c40 120 10 200-40 400H640Z" fill="#0a0616" fill-opacity=".85"/>
    <g fill="#c084fc" fill-opacity=".5">
      <path d="M470 0c22 46 6 92-14 150 34-24 60-70 66-150Z"/>
      <path d="M600 0c-10 60-42 96-84 132 52-6 92-52 108-132Z" fill-opacity=".35"/>
    </g>
    <g transform="translate(176 206)">
      <path d="M0-92c42 0 74 30 74 68 0 40-34 82-74 106-40-24-74-66-74-106 0-38 32-68 74-68Z"
        fill="#f4f8ff"/>
      <g fill="#e11d48">
        <path d="M-12-24c-20-16-48-14-56 2-6 14 10 28 32 28 18 0 30-14 24-30Z"/>
        <path d="M12-24c20-16 48-14 56 2 6 14-10 28-32 28-18 0-30-14-24-30Z"/>
      </g>
      <g stroke="#0b1330" stroke-opacity=".38" stroke-width="1.6" fill="none">
        <path d="M0-92v174M-52-72 -34 76M52-72 34 76M-70-24H70M-64 16H64M-40 54H40"/>
      </g>
    </g>
    <g transform="translate(468 200)">
      <path d="M0-96c46 0 80 32 80 72 0 42-36 88-80 114-44-26-80-72-80-114 0-40 34-72 80-72Z"
        fill="#170b2b"/>
      <g fill="#f2f6ff">
        <path d="M-14-32c-24-20-56-16-64 4-6 16 12 32 38 32 20 0 32-18 26-36Z"/>
        <path d="M14-32c24-20 56-16 64 4 6 16-12 32-38 32-20 0-32-18-26-36Z"/>
      </g>
      <path d="M-52 26c26 12 78 12 104 0-6 24-22 44-52 58-30-14-46-34-52-58Z" fill="#f2f6ff"/>
      <g stroke="#170b2b" stroke-width="3.5" stroke-linecap="round">
        <path d="M-38 30 -28 52M-16 34-10 60M8 34 12 60M32 30 40 50M-52 26H52"/>
      </g>
    </g>
    <g transform="translate(322 208)">
      <circle r="34" fill="#061024" fill-opacity=".85" stroke="#22d3ee" stroke-opacity=".5" stroke-width="2"/>
      <text y="12" text-anchor="middle" font-family="Space Grotesk, sans-serif"
        font-size="30" font-weight="700" fill="#22d3ee">VS</text>
    </g>`,
    { glow: [470, 150], deep: '#0a0a1e' }),

  /* ---------------- Pac-Man Neon ---------------- */
  'pac-man-neon': (id, a) => frame(id, a, `
    <g fill="none" stroke="#22d3ee" stroke-width="7" stroke-opacity=".55" stroke-linejoin="round">
      <rect x="44" y="52" width="150" height="86" rx="16"/>
      <rect x="232" y="52" width="112" height="46" rx="14"/>
      <rect x="382" y="52" width="214" height="46" rx="14"/>
      <rect x="44" y="186" width="80" height="164" rx="16"/>
      <rect x="172" y="240" width="180" height="52" rx="16"/>
      <rect x="404" y="150" width="192" height="90" rx="16"/>
      <rect x="404" y="286" width="120" height="64" rx="16"/>
    </g>
    <g fill="${a}" fill-opacity=".9">
      <circle cx="228" cy="168" r="6"/><circle cx="262" cy="168" r="6"/><circle cx="296" cy="168" r="6"/>
      <circle cx="330" cy="168" r="6"/><circle cx="364" cy="168" r="6"/><circle cx="150" cy="330" r="6"/>
      <circle cx="184" cy="330" r="6"/><circle cx="218" cy="330" r="6"/>
    </g>
    <circle cx="196" cy="168" r="12" fill="#fff"/>
    <g transform="translate(432 300)">
      <path d="M0 0 40-24A47 47 0 1 0 40 24Z" fill="#ffd93d"/>
      <circle cx="4" cy="-20" r="5" fill="#071026"/>
    </g>
    <g transform="translate(552 296)">
      <path d="M-34 22V-6a34 34 0 0 1 68 0v28l-11-10-12 10-11-10-12 10-11-10Z" fill="#22d3ee" fill-opacity=".92"/>
      <g fill="#071026"><circle cx="-12" cy="-6" r="7"/><circle cx="14" cy="-6" r="7"/></g>
    </g>`, { glow: [420, 300], texture: 'cvDots' }),

  /* ---------------- Pac-Number ---------------- */
  'pac-number': (id, a) => frame(id, a, `
    <g fill="none" stroke="#3b82f6" stroke-width="6" stroke-opacity=".5" stroke-linejoin="round">
      <rect x="52" y="60" width="240" height="70" rx="14"/>
      <rect x="330" y="60" width="258" height="70" rx="14"/>
      <rect x="52" y="176" width="120" height="164" rx="14"/>
      <rect x="212" y="176" width="216" height="70" rx="14"/>
      <rect x="468" y="176" width="120" height="164" rx="14"/>
      <rect x="212" y="286" width="216" height="54" rx="14"/>
    </g>
    <g font-family="Space Grotesk, monospace" font-weight="700" font-size="30" fill="${a}">
      <text x="196" y="168">7</text><text x="256" y="168">3</text><text x="316" y="168">9</text>
      <text x="376" y="168">1</text><text x="436" y="168">5</text>
      <text x="150" y="278" fill="#22d3ee">4</text><text x="452" y="278" fill="#22d3ee">8</text>
    </g>
    <g transform="translate(120 156)">
      <path d="M0 0 33-20A39 39 0 1 0 33 20Z" fill="#ffd93d"/>
      <circle cx="3" cy="-17" r="4.5" fill="#071026"/>
    </g>
    <text x="320" y="380" text-anchor="middle" font-family="Space Grotesk, monospace"
      font-size="22" fill="#8fb6ff" fill-opacity=".5">+  −  ×  ÷</text>`,
    { glow: [400, 130] }),

  /* ---------------- Batalha de Robôs ---------------- */
  'batalha-de-robos': (id, a) => frame(id, a, `
    <g fill="#ffffff" fill-opacity=".08">
      ${[[74, 62], [556, 76], [612, 250], [46, 268]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}
    </g>
    <path d="M0 336h640" stroke="#dbeafe" stroke-opacity=".22" stroke-width="3"/>

    <!-- robô da esquerda, com o canhão apontado -->
    <g transform="translate(196 250)">
      <rect x="-30" y="-96" width="60" height="50" rx="12" fill="#f8fbff" fill-opacity=".92"/>
      <rect x="-20" y="-80" width="40" height="15" rx="7.5" fill="#22d3ee"/>
      <path d="M0-96v-20" stroke="#f8fbff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="-122" r="7" fill="${a}"/>
      <rect x="-44" y="-40" width="88" height="82" rx="14" fill="${a}" fill-opacity=".92"/>
      <rect x="-18" y="-24" width="36" height="30" rx="8" fill="#081127" fill-opacity=".45"/>
      <rect x="44" y="-22" width="56" height="26" rx="13" fill="#f8fbff" fill-opacity=".85"/>
      <rect x="-32" y="42" width="26" height="44" rx="8" fill="#f8fbff" fill-opacity=".6"/>
      <rect x="6" y="42" width="26" height="44" rx="8" fill="#f8fbff" fill-opacity=".6"/>
    </g>

    <!-- robô da direita, espelhado -->
    <g transform="translate(452 258) scale(-1 1)">
      <rect x="-28" y="-88" width="56" height="46" rx="11" fill="#f8fbff" fill-opacity=".85"/>
      <rect x="-19" y="-73" width="38" height="14" rx="7" fill="#ff4d6d"/>
      <rect x="-41" y="-36" width="82" height="76" rx="13" fill="#3b82f6" fill-opacity=".9"/>
      <rect x="-16" y="-21" width="32" height="27" rx="7" fill="#081127" fill-opacity=".45"/>
      <rect x="41" y="-18" width="50" height="24" rx="12" fill="#f8fbff" fill-opacity=".8"/>
      <rect x="-30" y="40" width="24" height="40" rx="7" fill="#f8fbff" fill-opacity=".55"/>
      <rect x="5" y="40" width="24" height="40" rx="7" fill="#f8fbff" fill-opacity=".55"/>
    </g>

    <!-- disparo cruzando o centro -->
    <path d="M324 214l-30 34h22l-14 30 34-38h-22l16-26Z" fill="#22d3ee"/>
    <g stroke="#22d3ee" stroke-opacity=".55" stroke-width="4" stroke-linecap="round">
      <path d="M300 240h-16M356 236h16M312 268l-12 10M350 208l12-10"/>
    </g>`, { glow: [320, 190] }),

  /* ---------------- Geometry Dash ---------------- */
  'geometry-dash': (id, a) => frame(id, a, `
    <g fill="${a}" fill-opacity=".3">
      ${[40, 84, 128, 172, 216, 260, 304, 348, 392, 436, 480, 524, 568]
      .map((x, i) => { const h = 30 + ((i * 37) % 110); return `<rect x="${x}" y="${300 - h}" width="24" height="${h}" rx="6"/>`; }).join('')}
    </g>
    <path d="M40 236C130 236 150 120 232 120s102 116 192 116 116-60 176-60"
      fill="none" stroke="#22d3ee" stroke-width="4" stroke-dasharray="12 12" stroke-opacity=".65"/>
    <g fill="#f8fbff">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
        const x = 24 + i * 46; return `<path d="M${x} 340L${x + 23} 292L${x + 46} 340Z" fill="#c4b5fd" fill-opacity=".9"/>`;
      }).join('')}
    </g>
    <rect x="0" y="338" width="640" height="62" fill="#1b1140"/>
    <rect x="0" y="338" width="640" height="5" fill="${a}"/>
    <g transform="translate(232 112) rotate(-18)">
      <rect x="-38" y="-38" width="76" height="76" rx="12" fill="${a}"/>
      <rect x="-38" y="-38" width="76" height="76" rx="12" fill="none" stroke="#f8fbff" stroke-width="4"/>
      <g fill="#f8fbff"><rect x="-20" y="-14" width="12" height="14" rx="4"/><rect x="8" y="-14" width="12" height="14" rx="4"/>
      <rect x="-16" y="12" width="32" height="7" rx="3.5"/></g>
    </g>`, { glow: [250, 110], deep: '#0d0724' }),

  /* ---------------- Bloco Sorridente ---------------- */
  'bloco-sorridente': (id, a) => frame(id, a, `
    <g stroke="#22d3ee" stroke-opacity=".22" stroke-width="2">
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0 ${60 + i * 58}H640"/>`).join('')}
    </g>
    <path d="M20 268C120 268 132 150 226 150s110 118 206 118 92-52 188-52"
      fill="none" stroke="#f0abfc" stroke-width="5" stroke-linecap="round" stroke-opacity=".6"/>
    <g>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
      const x = 18 + i * 46; return `<path d="M${x} 342L${x + 23} 296L${x + 46} 342Z" fill="${a}" fill-opacity=".85"/>`;
    }).join('')}</g>
    <rect x="0" y="340" width="640" height="60" fill="#2a0f3d"/>
    <rect x="0" y="340" width="640" height="5" fill="#f0abfc"/>
    <g transform="translate(320 176) rotate(12)">
      <rect x="-62" y="-62" width="124" height="124" rx="20" fill="#f0abfc"/>
      <rect x="-62" y="-62" width="124" height="124" rx="20" fill="none" stroke="#f8fbff" stroke-width="5"/>
      <g fill="#2a0f3d"><circle cx="-24" cy="-16" r="10"/><circle cx="24" cy="-16" r="10"/>
      <path d="M-30 16c10 20 50 20 60 0-6 30-54 30-60 0Z"/></g>
    </g>`, { glow: [330, 160], deep: '#150a2e' }),

  /* ---------------- Parkour Mágico ---------------- */
  'parkour-magico': (id, a) => frame(id, a, `
    <g fill="#1e293b" fill-opacity=".0">
      ${[[46, 300, 150], [232, 234, 128], [396, 300, 118], [520, 200, 100]]
      .map(([x, y, w]) => `<g><rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${a}" fill-opacity=".9"/>
      <rect x="${x}" y="${y + 20}" width="${w}" height="10" rx="5" fill="#1e1b4b" fill-opacity=".8"/>
      <ellipse cx="${x + w / 2}" cy="${y + 42}" rx="${w / 2}" ry="12" fill="${a}" fill-opacity=".18"/></g>`).join('')}
    </g>
    <path d="M120 296C160 220 200 232 250 226M296 226C340 250 356 268 400 292M456 292C486 266 500 224 540 198"
      fill="none" stroke="#c4b5fd" stroke-width="3.5" stroke-dasharray="8 10" stroke-linecap="round" stroke-opacity=".8"/>
    <g fill="#f8fbff">
      ${[[110, 120, 12], [300, 86, 16], [500, 128, 11], [206, 168, 8], [430, 170, 9], [590, 260, 8]]
      .map(([x, y, r]) => `<path d="M${x} ${y - r}L${x + r * 0.32} ${y - r * 0.32}L${x + r} ${y}L${x + r * 0.32} ${y + r * 0.32}L${x} ${y + r}L${x - r * 0.32} ${y + r * 0.32}L${x - r} ${y}L${x - r * 0.32} ${y - r * 0.32}Z" fill-opacity=".85"/>`).join('')}
    </g>
    <g transform="translate(298 182)" fill="none" stroke="#f8fbff" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="-44" r="17" fill="#f8fbff" stroke="none"/>
      <path d="M4-22Q-2 0 2 20" stroke-width="19"/>
      <path d="M2 18-28 34M2 18 26 32l10 26" stroke-width="14"/>
      <path d="M0-12-34-26M0-12 34-32" stroke-width="13"/>
    </g>`, { glow: [300, 150], deep: '#100b2c' }),

  /* ---------------- Dino Runner ---------------- */
  'dino-runner': (id, a) => frame(id, a, `
    <g fill="#f8fbff" fill-opacity=".14">
      <rect x="90" y="84" width="120" height="22" rx="11"/><rect x="126" y="66" width="72" height="22" rx="11"/>
      <rect x="420" y="120" width="140" height="22" rx="11"/><rect x="452" y="102" width="84" height="22" rx="11"/>
    </g>
    <g fill="${a}">
      <g transform="translate(96 196)">
        <rect x="40" y="0" width="60" height="18"/><rect x="58" y="18" width="60" height="18"/>
        <rect x="76" y="-18" width="46" height="18"/><rect x="104" y="-4" width="10" height="10" fill="#071026"/>
        <rect x="18" y="18" width="76" height="20"/><rect x="0" y="36" width="88" height="20"/>
        <rect x="10" y="56" width="70" height="20"/><rect x="24" y="76" width="20" height="24"/>
        <rect x="58" y="76" width="20" height="24"/><rect x="-16" y="24" width="20" height="14"/>
      </g>
    </g>
    <g fill="#22d3ee" fill-opacity=".85">
      <g transform="translate(392 214)">
        <rect x="16" y="0" width="20" height="86"/><rect x="0" y="16" width="16" height="34"/>
        <rect x="0" y="16" width="12" height="12"/><rect x="36" y="28" width="16" height="34"/>
        <rect x="40" y="28" width="12" height="12"/>
      </g>
      <g transform="translate(500 240)"><rect x="14" y="0" width="18" height="60"/>
      <rect x="0" y="14" width="14" height="26"/><rect x="32" y="22" width="14" height="26"/></g>
    </g>
    <g fill="#f8fbff" fill-opacity=".85" transform="translate(470 96)">
      <rect x="0" y="10" width="52" height="12"/><rect x="34" y="0" width="26" height="12"/>
      <rect x="56" y="6" width="10" height="8"/><rect x="10" y="22" width="30" height="10"/>
    </g>
    <g fill="#8fb6ff" fill-opacity=".55">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect x="${i * 58}" y="300" width="${i % 3 === 0 ? 42 : 26}" height="6" rx="3"/>`).join('')}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${20 + i * 82}" y="322" width="14" height="5" rx="2.5"/>`).join('')}
    </g>`, { glow: [430, 200], texture: 'cvDots' }),

  /* ---------------- Doggy Escape ---------------- */
  'doggy-escape': (id, a) => frame(id, a, `
    <g stroke="${a}" stroke-opacity=".5" stroke-width="6" stroke-linecap="round">
      <path d="M40 132H180M70 176H240M40 226H150M96 276H206M44 320H132"/>
    </g>
    <g transform="translate(380 226)">
      <ellipse cx="0" cy="88" rx="140" ry="18" fill="#071026" fill-opacity=".5"/>
      <path d="M-96 0C-96-34-66-56-26-56H44c34 0 60 22 60 54 0 26-16 44-44 50l-8 34h-24l4-32H-30l-8 34h-24l4-34C-84 44-96 24-96 0Z" fill="${a}"/>
      <path d="M104-14c22-16 40-32 48-56 4 30-6 56-24 74Z" fill="${a}"/>
      <circle cx="86" cy="-72" r="42" fill="${a}"/>
      <path d="M56-104c-18-24-14-46 4-54 14-6 26 8 28 30Z" fill="#e0a85f"/>
      <circle cx="100" cy="-80" r="7" fill="#0b1330"/>
      <ellipse cx="126" cy="-62" rx="11" ry="9" fill="#0b1330"/>
      <path d="M110-46c8 10 22 8 26-2" stroke="#0b1330" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
    <g fill="#f8fbff" fill-opacity=".7">
      <g transform="translate(120 92) rotate(-18)"><rect x="-26" y="-6" width="52" height="12" rx="6"/>
      <circle cx="-30" cy="-8" r="8"/><circle cx="-30" cy="8" r="8"/><circle cx="30" cy="-8" r="8"/><circle cx="30" cy="8" r="8"/></g>
      <g transform="translate(560 320) rotate(14) scale(.7)"><rect x="-26" y="-6" width="52" height="12" rx="6"/>
      <circle cx="-30" cy="-8" r="8"/><circle cx="-30" cy="8" r="8"/><circle cx="30" cy="-8" r="8"/><circle cx="30" cy="8" r="8"/></g>
    </g>`, { glow: [400, 200] }),

  /* ---------------- Templo dos elementos ---------------- */
  'templo-dos-elementos': (id, a) => frame(id, a, `
    <g fill="#dbeafe" fill-opacity=".14">
      <path d="M320 42 556 132H84Z"/>
      <rect x="84" y="140" width="472" height="26" rx="6"/>
      ${[112, 208, 304, 400, 496].map(x => `<rect x="${x}" y="172" width="44" height="150" rx="6"/>`).join('')}
      <rect x="70" y="326" width="500" height="30" rx="8"/>
    </g>
    <g stroke="#dbeafe" stroke-opacity=".22" stroke-width="2" fill="none">
      ${[112, 208, 304, 400, 496].flatMap(x => [0, 1, 2].map(i => `<path d="M${x + 8} ${196 + i * 42}v72"/>`)).join('')}
    </g>
    <g transform="translate(196 250)">
      <ellipse cy="70" rx="72" ry="16" fill="#ff8f3c" fill-opacity=".28"/>
      <path d="M0-72c26 34 52 48 52 84A52 52 0 0 1-52 12c0-32 30-40 30-76 8 12 18 18 22 8Z" fill="#ff8f3c"/>
      <path d="M0-24c14 18 24 26 24 46A24 24 0 1 1-24 22c0-16 16-22 16-40 4 8 6 10 8 -6Z" fill="#ffd93d"/>
    </g>
    <g transform="translate(444 250)">
      <ellipse cy="70" rx="72" ry="16" fill="#22d3ee" fill-opacity=".28"/>
      <path d="M0-76C40-24 60 0 60 28A60 60 0 0 1-60 28c0-28 20-52 60-104Z" fill="#22d3ee"/>
      <path d="M-14 22a26 26 0 0 0 20 34" stroke="#f8fbff" stroke-width="7" fill="none" stroke-linecap="round" stroke-opacity=".8"/>
    </g>`, { glow: [320, 200] }),

  /* ---------------- Pokémon FireRed ---------------- */
  'pokemon-firered': (id, a) => frame(id, a, `
    <g fill="#22e39a" fill-opacity=".2">
      ${[10, 78, 146, 214, 470, 540, 604].map(x => `<path d="M${x} 400c0-40 8-70 22-96-24 20-34 54-34 96Zm26 0c-4-46 4-84 24-114-28 18-42 62-40 114Zm30 0c2-38 14-66 34-88-30 14-46 46-50 88Z"/>`).join('')}
    </g>
    <g transform="translate(320 196)">
      <circle r="112" fill="#f8fbff"/>
      <path d="M-112 0a112 112 0 0 1 224 0Z" fill="${a}"/>
      <rect x="-112" y="-11" width="224" height="22" fill="#131a2e"/>
      <circle r="38" fill="#131a2e"/><circle r="27" fill="#f8fbff"/><circle r="14" fill="#e6edfb"/>
      <path d="M-64-64a90 90 0 0 1 36-24" stroke="#ffffff" stroke-opacity=".65" stroke-width="9"
        fill="none" stroke-linecap="round"/>
    </g>
    <g fill="#ffd93d" fill-opacity=".85">
      <path d="M104 92l10 26 26 10-26 10-10 26-10-26-26-10 26-10Z"/>
      <path d="M536 258l8 20 20 8-20 8-8 20-8-20-20-8 20-8Z" fill-opacity=".6"/>
    </g>`, { glow: [320, 170], texture: 'cvDots' }),

  /* ---------------- Minecraft ---------------- */
  'minecraft': (id, a) => frame(id, a, `
    <rect x="470" y="52" width="66" height="66" fill="#ffd93d" fill-opacity=".8"/>
    <g>
      ${[
      [200, 210, '#3f8f3a', '#7cc45f', '#2f6b2c'],
      [288, 258, '#8a6a45', '#a98457', '#6b5136'],
      [376, 210, '#3f8f3a', '#7cc45f', '#2f6b2c'],
      [288, 162, '#3f8f3a', '#7cc45f', '#2f6b2c'],
      [112, 258, '#7b7b7b', '#9a9a9a', '#5c5c5c'],
      [464, 258, '#7b7b7b', '#9a9a9a', '#5c5c5c']
    ].map(([x, y, left, top, right]) => `<g transform="translate(${x} ${y})">
        <path d="M0-48 44-24 0 0-44-24Z" fill="${top}"/>
        <path d="M-44-24 0 0v48l-44-24Z" fill="${left}"/>
        <path d="M44-24 0 0v48l44-24Z" fill="${right}"/>
      </g>`).join('')}
    </g>
    <g transform="translate(452 152) rotate(38)">
      <rect x="-6" y="-10" width="12" height="104" rx="3" fill="#8a6a45"/>
      <path d="M-52-28c34-16 70-16 104 0-18-4-32 6-52 6s-34-10-52-6Z" fill="#cbd5e1"/>
      <path d="M-52-28c34-16 70-16 104 0l-8 14c-30-12-58-12-88 0Z" fill="#94a3b8"/>
    </g>
    <g fill="#f8fbff" fill-opacity=".1">
      <rect x="0" y="340" width="640" height="60"/>
    </g>`, { glow: [300, 190], deep: '#07142a' }),

  /* ---------------- Rei da mesa ---------------- */
  'rei-da-mesa': (id, a) => frame(id, a, `
    <g transform="translate(320 216)">
      <rect x="-268" y="-140" width="536" height="280" rx="26" fill="#5b3a1f"/>
      <rect x="-246" y="-118" width="492" height="236" rx="14" fill="#0f6b52"/>
      <rect x="-246" y="-118" width="492" height="236" rx="14" fill="${a}" fill-opacity=".18"/>
      <g fill="#1a1208">
        <circle cx="-238" cy="-110" r="18"/><circle cx="0" cy="-118" r="16"/><circle cx="238" cy="-110" r="18"/>
        <circle cx="-238" cy="110" r="18"/><circle cx="0" cy="118" r="16"/><circle cx="238" cy="110" r="18"/>
      </g>
      <ellipse cx="-40" cy="10" rx="150" ry="70" fill="#ffffff" fill-opacity=".05"/>
      <g>
        ${[[96, -46, '#ffd93d'], [130, -24, '#ff4d6d'], [130, -68, '#3b82f6'], [164, -2, '#f8fbff'],
      [164, -46, '#a855f7'], [164, -90, '#22e39a'], [198, 20, '#ff8f3c'], [198, -24, '#131a2e'],
      [198, -68, '#22d3ee'], [198, -112, '#ff4d6d']]
      .map(([x, y, c]) => `<g transform="translate(${x} ${y + 44})"><circle r="21" fill="${c}"/>
        <circle cx="-6" cy="-7" r="7" fill="#ffffff" fill-opacity=".45"/></g>`).join('')}
      </g>
      <circle cx="-120" cy="44" r="21" fill="#f8fbff"/>
      <circle cx="-126" cy="37" r="7" fill="#ffffff" fill-opacity=".6"/>
      <g stroke="#f8fbff" stroke-opacity=".45" stroke-width="2.5" stroke-dasharray="9 9">
        <path d="M-120 44H64"/>
      </g>
      <g transform="translate(-120 44) rotate(6)">
        <rect x="-306" y="-6" width="180" height="12" rx="6" fill="#c78b4a"/>
        <rect x="-146" y="-6" width="24" height="12" rx="6" fill="#131a2e"/>
        <rect x="-306" y="-6" width="40" height="12" rx="6" fill="#8a5a2b"/>
      </g>
    </g>`, { glow: [330, 200], deep: '#08132a' })
};

/* API pública ------------------------------------------------ */
function coverFor(jogo, corCategoria) {
  const motivo = MOTIVOS[jogo.id];
  if (motivo) return motivo(`cv-${jogo.id}`, corCategoria);
  /* fallback elegante caso um jogo novo seja adicionado sem arte */
  return frame(`cv-${jogo.id}`, corCategoria, `
    <text x="320" y="228" text-anchor="middle" font-family="Space Grotesk, sans-serif"
      font-size="130" font-weight="700" fill="#ffffff" fill-opacity=".14">${jogo.nome.charAt(0)}</text>`);
}
