/**
 * mvvm/viewmodel.js — VIEWMODEL в MVVM.
 *
 * КТ3 · MVVM — ViewModel: «реактивная модель представления (Observable-свойства и команды)».
 *   • Observable-свойства: список пользователей, поля ввода (имя, возраст), сообщение об ошибке
 *   • Команды: addCmd и removeCmd
 * ViewModel ничего не знает про DOM — View сама подписывается на эти свойства.
 *
 * КТ2 · D: Model приходит через конструктор.
 */
import { Observable, Command } from './observable.js';

export class UsersViewModel {
  constructor(model) {
    this.model = model;
    // --- Observable-свойства (привязываемые данные) ---
    this.users = new Observable([]);
    this.name = new Observable('');
    this.age = new Observable('');
    this.error = new Observable('');
    // --- Команды (строка из слайда: this.addCmd = new Command(() => this.add())) ---
    this.addCmd = new Command(() => this.add());
    this.removeCmd = new Command((id) => this.remove(id));
  }
  add() {
    try {
      this.model.add(this.name.value, this.age.value);
      this.users.value = this.model.getAll(); // ← View перерисуется АВТОМАТИЧЕСКИ (без render())
      this.name.value = ''; this.age.value = ''; this.error.value = '';
    } catch (e) { this.error.value = e.message; }
  }
  remove(id) { this.model.remove(id); this.users.value = this.model.getAll(); }
}
