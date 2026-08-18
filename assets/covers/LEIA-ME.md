# Capas dos jogos

Por padrão o site **desenha sozinho** a capa de cada jogo (arte vetorial em SVG,
gerada por `js/covers.js`). Isso garante que nenhuma imagem quebre, que o site
carregue rápido e que a galeria fique visualmente coerente.

## Quer usar um print real de um jogo?

1. Tire o print (recomendado: **1280 × 800 px**, proporção 16:10).
2. Salve nesta pasta com o `id` do jogo, por exemplo:
   `assets/covers/dino-runner.jpg`
3. Abra `js/games.js`, encontre o jogo e troque a linha:

```js
capa: null
```

por

```js
capa: 'assets/covers/dino-runner.jpg'
```

Pronto — aquele card passa a usar a imagem, e todos os outros continuam
com a arte automática. Dá pra misturar os dois à vontade.

> Se o arquivo não estiver aqui, estiver com outro nome ou não carregar, o card
> **volta sozinho para a arte vetorial**. Nunca aparece imagem quebrada.

## 🖼️ Capas reais já em uso

Estes seis jogos usam print/arte real (os outros oito seguem com a arte
vetorial gerada — dá para misturar à vontade):

```
spider-man.jpg           spider-man-vs-venom.jpg   pac-man-neon.jpg
pac-number.jpg           batalha-de-robos.jpg      geometry-dash.jpg
```

Para trocar uma delas, basta substituir o arquivo mantendo o mesmo nome —
não precisa mexer em `js/games.js`.

## Dicas rápidas

- Use **JPG** (foto/print) ou **WebP** (menor e mais moderno).
- Mantenha todas as capas na mesma proporção para o grid não “dançar”.
- Evite imagens acima de 400 KB — o site fica mais lento sem necessidade.
- O `alt` da imagem já é gerado automaticamente com o nome do jogo.

## IDs disponíveis

```
spider-man              spider-man-vs-venom     pac-man-neon
pac-number              batalha-de-robos        geometry-dash
bloco-sorridente        parkour-magico          dino-runner
doggy-escape            templo-dos-elementos    pokemon-firered
minecraft               rei-da-mesa
```
