/**
 * mvvm/view.js — VIEW в MVVM.
 *
 * КТ3 · MVVM — View: «подписывается на свойства ViewModel и реагирует на изменения».
 * Двусторонняя привязка:
 *   ViewModel → View : vm.users.subscribe(users => this.render(users))   (строка из слайда)
 *   View → ViewModel : input-события записывают значение в vm.name / vm.age
 * Явного вызова render() после действий пользователя в коде НЕТ.
 */
import { escapeHtml } from '../shared/escape.js';

export class UsersView {
  constructor(vm, root = document) {
    const $ = (id) => root.getElementById(id);
    this.$list = $('list'); this.$err = $('error');
    const $name = $('username'), $age = $('age');

    // ViewModel → View (привязка при создании View)
    vm.users.subscribe((users) => this.render(users));
    vm.error.subscribe((msg) => (this.$err.textContent = msg));
    vm.name.subscribe((v) => { if ($name.value !== v) $name.value = v; });
    vm.age.subscribe((v) => { if ($age.value !== v) $age.value = v; });

    // View → ViewModel (пользователь вводит данные → обновляются свойства)
    $name.addEventListener('input', () => (vm.name.value = $name.value));
    $age.addEventListener('input', () => (vm.age.value = $age.value));

    // Действия пользователя вызывают КОМАНДЫ
    $('submit').addEventListener('click', () => vm.addCmd.execute());
    this.$list.addEventListener('click', (e) => {
      if (e.target.dataset?.id) vm.removeCmd.execute(Number(e.target.dataset.id));
    });
  }
  render(users) {
    this.$list.innerHTML = users.map((u) => `
      <div class="card"><h3>Username - ${escapeHtml(u.username)}</h3>
      <p>Возраст - ${u.age}</p><button data-id="${u.id}">Удалить</button></div>`).join('');
  }
}
