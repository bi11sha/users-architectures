/**
 * onion/services/UserService.js — Слой 2: СЕРВИС (application).
 *
 * КТ4 · Onion: «UserService получает репозиторий через конструктор. Работает через
 * интерфейс репозитория. Содержит методы addUser() и deleteUser().»
 * Это «Один сервис со всеми методами» (сравнение с Clean на слайде).
 *
 * КТ2 · D: зависимость от абстракции (IUserRepository), а не от InMemory-реализации.
 * КТ2 · S: сервис координирует сценарии; хранение — в репозитории, DOM — в UI.
 */
import { User } from '../core/User.js';

export class UserService {
  constructor(repository) { this.repo = repository; } // ← внедрение зависимости через конструктор
  addUser(username, age) {
    const user = new User(username, age); // правила домена из слоя 1
    return this.repo.save(user);
  }
  deleteUser(id) { return this.repo.delete(id); }
  getAll() { return this.repo.getAll(); }
}
