/**
 * onion/infra/UserUI.js — Слой 3: ИНФРАСТРУКТУРА (интерфейс).
 * КТ4 · Onion: «UI (UserUI) — работает с DOM, вызывает методы сервиса».
 * Отличие от Clean: UI САМ решает, как отображать (здесь нет отдельного презентера).
 */
import { escapeHtml } from '../../shared/escape.js';

export class UserUI {
  constructor(service, root = document) {
    this.service = service;
    this.$ = (id) => root.getElementById(id);
    this.$('submit').addEventListener('click', () => this.onAdd());
    this.$('list').addEventListener('click', (e) => {
      if (e.target.dataset?.id) { this.service.deleteUser(Number(e.target.dataset.id)); this.render(); }
    });
    this.render();
  }
  onAdd() {
    try {
      this.service.addUser(this.$('username').value, this.$('age').value);
      this.$('username').value = ''; this.$('age').value = ''; this.$('error').textContent = '';
      this.render();
    } catch (e) { this.$('error').textContent = e.message; }
  }
  render() {
    this.$('list').innerHTML = this.service.getAll().map((u) => `
      <div class="card"><h3>Username - ${escapeHtml(u.username)}</h3>
      <p>Возраст - ${u.age}</p><button data-id="${u.id}">Удалить</button></div>`).join('');
  }
}
