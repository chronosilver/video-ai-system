# Design system

Единый источник токенов оформления для всех видео. Раскладка (сетка/зоны) —
отдельно, в `../grid.ts`.

## Слои

```
fonts.ts    SF Pro Display + Montserrat + mono   ┐
palette.ts  сырая палитра (ВРЕМЕННЫЙ placeholder) ├─ примитивы — напрямую не трогать
scale.ts    числовые шкалы (px)                  ┘
tokens.ts   СЕМАНТИКА ← правишь здесь
motion.ts   EASE-кривые
index.ts    точка входа (реэкспорт)
```

### Шрифты
- `fontDisplay` — **SF Pro Display**, заголовки (`text.display / heading / subheading`).
  Файлы .woff2 кладутся в `public/fonts/` (см. README там); пока их нет — системный
  SF Pro на macOS, иначе Montserrat (fallback-стек).
- `fontBody` — **Montserrat**, остальной текст (`text.title / body / caption`).
  Грузится через `@remotion/google-fonts/Montserrat`.
- `fontMono` — терминальные эффекты (`TextTypewriter`, спиннер-строки).

Пресеты и манифесты импортируют только семантику — через `../common` или
`../common/design-system`. Примитивы (`palette`, `fontSize`, ...) — лишь для
нестандартных сцен.

## Семантические токены (`tokens.ts`)

### `text` — типографические роли
Роль = готовый объект инлайн-стилей `{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color }`.

| Роль | Назначение |
|---|---|
| `text.display` | огромный акцент — одно слово на весь экран |
| `text.heading` | заголовок сцены |
| `text.subheading` | подзаголовок / вторичный заголовок |
| `text.title` | некрупный заголовок, метка секции |
| `text.body` | основной текст |
| `text.caption` | подписи, служебный текст (моно) |

Применение в пресете:
```tsx
<h1 style={text.heading}>Заголовок</h1>
<h2 style={{ ...text.subheading, color: color.accent }}>Подзаголовок</h2>
```

Поменять размер/шрифт/вес/цвет заголовков → править `text` в `tokens.ts`
(размеры — в `scale.ts:fontSize`, шрифт — в `fonts.ts`).

### `color` — цветовые роли
`text`, `textMuted`, `textFaint`, `bg`, `surface`, `border`, `borderStrong`,
`accent`, `onAccent`, `danger`, `series.{indigo,teal,amber,violet,rose}`.
`tint(c, alpha)` — прозрачный оттенок токена.

Бренд-акцент (`color.accent`, сейчас лайм `#ccff00`) — единственный «хардкод»,
меняется под бренд.

### Прочее
`space` (xs…xl + section/page), `radius` (sm/md/lg/pill), `stroke`
(hairline/regular/accent), `elevation` (xs/sm/md/lg), `video` (fps/width/height).

> `palette.ts` — временный плоский placeholder (нейтральные hex, без light/dark).
> Целевая палитра принимается отдельно, см. `about.md` §3.
