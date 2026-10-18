/**
 * mvp/view.js — VIEW в MVP (пассивное представление).
 *
 * КТ3 · MVP — View: «реализует набор методов для отображения (интерфейс)».
 * ИНТЕРФЕЙС IUsersView (контракт для Presenter):
 *     render(users) · showError(msg) · clearForm() · onAdd(handler) · onDelete(handler)
 * View НЕ знает о существовании Model — вся связь только через Presenter.
 *
 * КТ2 · S: только DOM. Никакой бизнес-логики и обращения к данным.
 */
import { escapeHtml } from '../shared/escape.js';

export class UsersView {
  constructor(root = document) {
    this.$name = root.getElementById('username');
    this.$age = root.getElementById('age');
    this.$btn = root.getElementById('submit');
    this.$list = root.getElementById('list');
    this.$err = root.getElementById('error');
  }
  // --- события наружу: Presenter подписывается на действия пользователя ---
  onAdd(handler) { this.$btn.addEventListener('click', () => handler(this.$name.value, this.$age.value)); }
  onDelete(handler) {
    this.$list.addEventListener('click', (e) => {
      const id = e.target.dataset?.id;
      if (id) handler(Number(id));
    });
  }
  // --- методы интерфейса, которые ВЫЗЫВАЕТ Presenter ---
  render(users) {
    this.$list.innerHTML = users.map((u) => `
      <div class="card"><h3>Username - ${escapeHtml(u.username)}</h3>
      <p>Возраст - ${u.age}</p><button data-id="${u.id}">Удалить</button></div>`).join('');
  }
  showError(msg) { this.$err.textContent = msg; }
  clearForm() { this.$name.value = ''; this.$age.value = ''; this.showError(''); }
}
