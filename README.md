# Список пользователей — КТ2 + КТ3 + КТ4 в одном проекте

Запуск (нужен только Node.js 18+, `npm install` не требуется):

    npm start        # http://localhost:5000  — меню со всеми архитектурами
    npm run solid    # консольная демонстрация SOLID (КТ2)

В коде у каждого пункта КТ стоит комментарий вида `КТ3 · MVC — Model`, `КТ2 · S`, `КТ4 · Onion`, `КТ4 · Clean`.
Поиск по проекту: Ctrl+Shift+F → `КТ2`, `КТ3`, `КТ4`.

## Где что реализовано

| КТ | Пункт | Файл |
|----|-------|------|
| КТ2 | S — единственная ответственность | `solid/srp.js`, `shared/User.js`, `mvc/controller.js`, `clean/usecases.js` |
| КТ2 | O — открытость/закрытость | `solid/ocp.js`, `mvvm/observable.js`, `clean/usecases.js` |
| КТ2 | L — подстановка Лисков | `solid/lsp.js`, `onion/infra/InMemoryUserRepository.js`, `clean/gateway.js` |
| КТ2 | I — разделение интерфейсов | `solid/isp.js`, `onion/core/IUserRepository.js`, `clean/ports.js` |
| КТ2 | D — инверсия зависимостей | `solid/dip.js`, `mvp/presenter.js`, `onion/services/UserService.js`, `clean/usecases.js`, `server.js` |
| КТ3 | MVC (Model с подпиской, View, Controller) | `mvc/model.js`, `mvc/view.js`, `mvc/controller.js`, маршруты в `server.js` |
| КТ3 | MVP (Model без оповещений, пассивная View, Presenter) | `mvp/*` |
| КТ3 | MVVM (Observable, Command, ViewModel, View с привязкой) | `mvvm/*` |
| КТ4 | Onion: ядро → сервис → инфраструктура → сборка | `onion/core`, `onion/services`, `onion/infra`, `onion/app.js` |
| КТ4 | Clean: Entity, Use Cases, Gateway, Presenter, Controller, app.js | `clean/*` |

Общее для всех вариантов: `shared/User.js` (валидация: имя не пустое, возраст 0–120).
