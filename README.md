# Favorite Place

Офлайн-дневник ресторанов: места, визиты, блюда, оценки, фото и избранное.

Стек: React 18 + TypeScript + Vite + Redux Toolkit + redux-persist + Capacitor.

## Быстрый старт (браузер)

```bash
npm install
npm run dev
```

Откройте http://localhost:5173/#/ (роутинг через HashRouter).

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка в `dist/` |
| `npm run build:mobile` | Сборка + `cap sync` |
| `npm run cap:open:android` | Открыть Android Studio |
| `npm run cap:add:ios` / `cap:open:ios` | iOS (нужен CocoaPods) |
| `npm run preview` | Превью production-сборки |

Подробнее про мобильную сборку — в [MOBILE.md](./MOBILE.md).

## Модель данных

- **places** — рестораны (название, кухня, адрес, заметки, избранное)
- **visits** — визиты (дата, оценка, блюда с оценками, фото, компаньоны)
- **dishes** — каталог блюд по местам

Счётчик визитов и рейтинг места считаются из `visits` (селекторы в `src/store/selectors.ts`).

Данные сохраняются в **localStorage** (`persist:favorite_place`). Экспорт/импорт JSON — на экране «Избранное».

## Основные сценарии

1. Добавить место → добавить визит с блюдами и фото
2. Открыть место → визит → блюдо
3. Изменить / удалить место, визит или блюдо
4. Обновить страницу — данные на месте

Чеклист ручного тестирования — [TESTING.md](./TESTING.md).
