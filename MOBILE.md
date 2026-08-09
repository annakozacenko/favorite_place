# Мобильная сборка (Capacitor)

Приложение упаковывается в нативную оболочку через [Capacitor](https://capacitorjs.com/). Веб-часть собирается Vite в `dist/`, затем копируется в Android/iOS.

## Требования

- Node.js 18+ (в проекте используется Capacitor CLI 7; для CLI 8 нужен Node 22+)
- **Android:** [Android Studio](https://developer.android.com/studio), JDK 17+
- **iOS (только macOS):** Xcode, [CocoaPods](https://cocoapods.org/) (`brew install cocoapods`)

## Команды

```bash
# Сборка веба + синхронизация с нативными проектами
npm run build:mobile

# Только синхронизация (после изменений в React)
npm run cap:sync

# Открыть в IDE
npm run cap:open:android
npm run cap:open:ios
```

## Первый запуск Android

1. `npm run build:mobile`
2. `npm run cap:open:android`
3. В Android Studio: Run на эмуляторе или устройстве

## Первый запуск iOS

Если папки `ios/` ещё нет:

```bash
npm run cap:add:ios   # нужен CocoaPods
npm run build:mobile
npm run cap:open:ios
```

В Xcode: выберите Team, затем Run.

## Роутинг

В мобильной сборке используется `HashRouter` (`/#/`, `/#/place/1`), чтобы навигация работала без сервера.

## Данные офлайн

Redux Persist сохраняет данные в WebView (localStorage). На устройстве они сохраняются между запусками так же, как в браузере.

На **телефоне** фото визитов сохраняются в файловую систему приложения (`Filesystem`, каталог `visits/`). В **браузере** — как data URL в localStorage (удобно для разработки; большие альбомы лучше тестировать на устройстве).

После `npm install` выполните `npm run build:mobile`, чтобы подтянуть плагины `@capacitor/camera` и `@capacitor/filesystem`.

### iOS: разрешения для камеры

После `cap add ios` добавьте в `ios/App/App/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Фото блюд и визитов в ваш дневник ресторанов</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Выбор фото из галереи для визита</string>
```

## Иконки и splash

Сейчас стоят стандартные иконки Capacitor. Чтобы заменить:

1. Положите исходник 1024×1024 в `resources/icon.png`
2. Установите `@capacitor/assets` и выполните `npx capacitor-assets generate`

## Идентификатор приложения

- App ID: `com.favoriteplace.app`
- Настройки: `capacitor.config.ts`
