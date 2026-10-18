/**
 * КТ2 · D — Dependency Inversion (применено в самом проекте, см. также mvp/presenter.js,
 * onion/services/UserService.js, clean/usecases.js). Здесь — минимальный пример.
 * Высокоуровневый класс зависит от абстракции (storage), реализация подставляется снаружи.
 */
export class Notifier {
  constructor(storage) { this.storage = storage; } // зависимость внедряется через конструктор
  notify(text) { this.storage.write(text); }
}
export class ConsoleStorage { write(t) { console.log('→', t); } }
