/**
 * mvp/model.js — MODEL в MVP.
 *
 * КТ3 · MVP — Model: «только хранит данные и выдаёт их по запросу (без оповещений)».
 * В отличие от MVC здесь НЕТ subscribe()/notify — никто не узнаёт об изменениях сам;
 * Presenter должен явно запросить данные (getAll) после изменения.
 */
import { User } from '../shared/User.js';

export class UserModel {
  #users = [];
  #nextId = 1;
  getAll() { return [...this.#users]; }
  add(username, age) { const u = new User(username, age, this.#nextId++); this.#users.push(u); return u; }
  remove(id) { this.#users = this.#users.filter((u) => u.id !== id); }
}
