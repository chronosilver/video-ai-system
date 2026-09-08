# Reels-сервис — React (Remotion) + Notion

Сервис получает на вход текст сценария и короткие комментарии и сам собирает
короткий вертикальный ролик (reels, 1080×1920), опираясь на собственную
дизайн-систему и библиотеку пресетов.

## Документация

Полная структура проекта — в [`docs/`](docs/README.md):

- [Видение](docs/01-vision.md) · [Текущее состояние](docs/02-current-state.md) ·
  [Архитектура](docs/03-architecture.md)
- [Notion-пространство](docs/04-notion-workspace.md) ·
  [Конвейер генерации](docs/05-generation-pipeline.md) ·
  [Дизайн-система](docs/06-design-system.md)
- [Роадмап](docs/07-roadmap.md) · [Бэклог](docs/08-backlog.md) ·
  [Рабочее соглашение с агентом](docs/09-agent-workflow.md)

Оперативное состояние — [`handoff.md`](handoff.md). Правила для агента внутри
рендер-слоя — [`CLAUDE.md`](CLAUDE.md).

## Запуск рендер-слоя (`project1/`)

```bash
cd project1
npm install
npm run dev        # Remotion Studio → http://localhost:3000
```

## Статус

Построен рендер-слой (манифесты сцен → видео). Ядро продукта — Notion-интеграция и
автогенерация «сценарий → манифест» — в работе. Детали: [docs/02-current-state.md](docs/02-current-state.md).
