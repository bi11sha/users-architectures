/**
 * mvc/model.js — MODEL в архитектуре MVC.
 *
 * КТ3 · MVC — Model:
 *   «хранит список пользователей и уведомляет подписчиков об изменениях».
 *   Реализован механизм подписки: subscribe() + _notify().
 *   Когда Controller вызывает create()/remove(), Model сама оповещает View.
 *
 * КТ2 · S: Модель отвечает только за данные и их изменение (не за HTML и не за HTTP).
 */
import { User } from '../shared/User.js';

export class UserModel {
  #users = [];        // хранилище в памяти
  #nextId = 1;
  #subscribers = [];  // КТ3·MVC: список подписчиков (View подписывается при инициализации)

  /** КТ3·MVC: подписка View на изменения Model */
  subscribe(fn) { this.#subscribers.push(fn); }
  _notify() { this.#subscribers.forEach((fn) => fn(this.getAll())); }

  /** Метод из слайда: View/Controller получают данные через getAll() */
  getAll() { return [...this.#users]; }

  /** Добавление: валидация — в сущности User; после изменения — уведомление подписчиков */
  create({ username, age }) {
    const user = new User(username, age, this.#nextId++); // бросит Error при плохих данных
    this.#users.push(user);
    this._notify();            // КТ3·MVC: «Model обновляет данные и автоматически оповещает View»
    return user;
  }

  remove(id) {
    this.#users = this.#users.filter((u) => u.id !== Number(id));
    this._notify();
  }
}
