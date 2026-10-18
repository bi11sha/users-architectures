/**
 * clean/usecases.js — СЦЕНАРИИ ИСПОЛЬЗОВАНИЯ.
 *
 * КТ4 · Clean: «Отдельные классы: AddUserUseCase, DeleteUserUseCase, GetAllUsersUseCase.
 * Каждый получает два порта: шлюз данных (gateway) и презентер (presenter).»
 * Отличие от Onion: вместо одного UserService с методами — по классу на каждый сценарий.
 *
 * КТ2 · S: один класс = один сценарий = одна причина для изменений.
 * КТ2 · O: новый сценарий (например, UpdateUserUseCase) добавляется НОВЫМ классом,
 *          существующие классы не правятся.
 */
import { User } from './entity.js';

export class AddUserUseCase {
  constructor(gateway, presenter) { this.gateway = gateway; this.presenter = presenter; }
  execute(username, age) {
    try {
      this.gateway.save(new User(username, age));
      this.presenter.showMessage('');
      this.presenter.showUsers(this.gateway.getAll());
    } catch (e) { this.presenter.showMessage(e.message); }
  }
}
export class DeleteUserUseCase {
  constructor(gateway, presenter) { this.gateway = gateway; this.presenter = presenter; }
  execute(id) { this.gateway.delete(id); this.presenter.showUsers(this.gateway.getAll()); }
}
export class GetAllUsersUseCase {
  constructor(gateway, presenter) { this.gateway = gateway; this.presenter = presenter; }
  execute() { this.presenter.showUsers(this.gateway.getAll()); }
}
