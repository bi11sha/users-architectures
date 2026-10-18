/**
 * clean/presenter.js — ПРЕЗЕНТЕР (адаптер отображения).
 * КТ4 · Clean: «Презентер (HtmlPresenter) — реализует интерфейс отображения
 * (показывает список, сообщения)». Это ВЫДЕЛЕННЫЙ порт отображения —
 * в Onion за это отвечал сам UI.
 */
import { IPresenter } from './ports.js';
import { escapeHtml } from '../shared/escape.js';

export class HtmlPresenter extends IPresenter {
  constructor(root = document) { super(); this.$list = root.getElementById('list'); this.$err = root.getElementById('error'); }
  showUsers(users) {
    this.$list.innerHTML = users.map((u) => `
      <div class="card"><h3>Username - ${escapeHtml(u.username)}</h3>
      <p>Возраст - ${u.age}</p><button data-id="${u.id}">Удалить</button></div>`).join('');
  }
  showMessage(text) { this.$err.textContent = text; }
}
