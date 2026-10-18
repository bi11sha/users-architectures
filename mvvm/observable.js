/**
 * mvvm/observable.js — Observable и Command (механизм привязки данных).
 *
 * КТ3 · MVVM: «Я реализовал класс Observable, который уведомляет подписчиков
 * при изменении значения, и класс Command для обёртки действий».
 *
 * КТ2 · O (Open/Closed): новые свойства ViewModel создаются как new Observable(...)
 * без изменения самого класса. КТ2 · S: Observable только хранит значение и уведомляет.
 */
export class Observable {
  #value; #subs = [];
  constructor(initial) { this.#value = initial; }
  get value() { return this.#value; }
  /** Установка нового значения → автоматическое уведомление подписчиков */
  set value(newValue) { this.#value = newValue; this.#notify(); }
  /** Подписка (View подписывается на свойства ViewModel); сразу отдаёт текущее значение */
  subscribe(fn) { this.#subs.push(fn); fn(this.#value); }
  #notify() { this.#subs.forEach((fn) => fn(this.#value)); }
}

/** Command — обёртка действия (кнопка «Отправить»/«Удалить» вызывает execute) */
export class Command {
  constructor(action) { this.action = action; }
  execute(...args) { return this.action(...args); }
}
