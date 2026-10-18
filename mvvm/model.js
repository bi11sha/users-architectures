/** mvvm/model.js — КТ3 · MVVM — Model: «данные и бизнес-логика» (хранение + валидация через User). */
import { User } from '../shared/User.js';
export class UserModel {
  #users = []; #nextId = 1;
  getAll() { return [...this.#users]; }
  add(username, age) { this.#users.push(new User(username, age, this.#nextId++)); }
  remove(id) { this.#users = this.#users.filter((u) => u.id !== id); }
}
