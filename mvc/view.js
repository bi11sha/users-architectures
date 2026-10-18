/**
 * mvc/view.js — VIEW в архитектуре MVC (серверный рендер HTML-строки).
 *
 * КТ3 · MVC — View:
 *   «отвечает за отображение и передаёт действия пользователя».
 *   Подписывается на Model в конструкторе и перерисовывается при каждом её изменении.
 *   Особенность MVC (минус из слайда): View ЗНАЕТ о Model — вызывает model.getAll().
 */
import { escapeHtml } from '../shared/escape.js';

export class UsersView {
  constructor(model) {
    this.model = model;
    this.html = '';
    // КТ3·MVC: подписка при инициализации — «View подписывается на изменения Model»
    this.model.subscribe((users) => this.render(users));
    this.render(this.model.getAll()); // первая отрисовка
  }

  /** Перерисовка списка (аналог шаблона {{#each users}} из слайда) */
  render(users) {
    this.html = users.map((u) => `
      <div class="card">
        <h3>Username - ${escapeHtml(u.username)}</h3>
        <p>Возраст - ${u.age}</p>
        <button onclick="removeById(${u.id})">Удалить</button>
      </div>`).join('');
  }

  /** Полная страница: форма + список; message — текст ошибки валидации */
  page(message = '') {
    return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>MVC — Пользователи</title>
<link rel="stylesheet" href="/shared/style.css"></head><body>
<nav><a href="/">← меню</a></nav>
<h2>MVC: создать нового пользователя</h2>
${message ? `<p class="err">${escapeHtml(message)}</p>` : ''}
<form method="POST" action="/mvc/users">
  <label>Имя <input name="username"></label>
  <label>Возраст <input name="age"></label>
  <button>Отправить</button>
</form>
<h2>Список пользователей</h2>
${this.html /* КТ3·MVC: View берёт данные из Model через getAll() внутри render */}
<script>
  // Действие пользователя «Удалить» передаётся на сервер → Controller
  async function removeById(id){ await fetch('/mvc/users/'+id,{method:'DELETE'}); location.reload(); }
</script></body></html>`;
  }
}
