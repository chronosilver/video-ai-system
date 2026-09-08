# public/fonts/

## SF Pro Display (заголовки)

Шрифт проприетарный (Apple), в репозиторий не коммитится. Скачай его с
developer.apple.com/fonts и положи сюда **.woff2** со следующими именами:

| Файл | Начертание | weight |
|---|---|---|
| `SFProDisplay-Thin.woff2`    | Thin    | 100 |
| `SFProDisplay-Light.woff2`   | Light   | 300 |
| `SFProDisplay-Regular.woff2` | Regular | 400 |

Список имён — в `src/common/design-system/fonts.ts` (`SF_SOURCES`). По гайдлайну
(`about.md` §2) заголовки используют только тонкие начертания: `display` — Thin 100,
`heading`/`subheading` — Light 300. Regular 400 — про запас.

Apple раздаёт `.otf`/`.ttf` — сконвертируй в `.woff2` (например `woff2_compress`
или онлайн-конвертер).

### Пока файлов нет

Всё работает: на macOS подхватывается системный **SF Pro** (через `-apple-system`
в fallback-стеке), на других ОС / при рендере на Linux — **Montserrat**.
В консоли студии будут 404 на эти файлы — это ожидаемо до того, как ты их добавишь.

## Montserrat (основной текст)

Ничего добавлять не нужно — грузится через `@remotion/google-fonts/Montserrat`.
