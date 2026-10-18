/**
 * clean/controller.js — КОНТРОЛЛЕР (слой интерфейсных адаптеров).
 * КТ4 · Clean: «Контроллер — тонкий слой, принимает действия пользователя и
 * вызывает нужные Use Case». Логики и отображения здесь нет.
 */
export class UserController {
  constructor({ add, remove, getAll }, root = document) {
    root.getElementById('submit').addEventListener('click', () =>
      add.execute(root.getElementById('username').value, root.getElementById('age').value));
    root.getElementById('list').addEventListener('click', (e) => {
      if (e.target.dataset?.id) remove.execute(Number(e.target.dataset.id));
    });
    getAll.execute(); // первичная отрисовка
  }
}
