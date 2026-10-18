/**
 * mvp/presenter.js — PRESENTER в MVP.
 *
 * КТ3 · MVP — Presenter: «посредник, связывающий Model и View».
 *   1) подписывается на события View (onAdd / onDelete);
 *   2) вызывает методы Model;
 *   3) ЯВНО запрашивает обновлённые данные и передаёт их во View через методы интерфейса
 *      — именно здесь отличие от MVC, где View обновлялась сама через подписку.
 *
 * КТ2 · D (Dependency Inversion): Presenter зависит от «контрактов» View и Model,
 *   конкретные объекты передаются в конструктор (внедрение зависимостей).
 */
export class UsersPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // КТ3·MVP: Presenter подписывается на события View
    view.onAdd((name, age) => this.add(name, age));
    view.onDelete((id) => this.remove(id));
    this.refresh();
  }
  add(name, age) {
    try {
      this.model.add(name, age);
      this.view.clearForm();
      this.refresh();                       // явное обновление
    } catch (e) { this.view.showError(e.message); }
  }
  remove(id) { this.model.remove(id); this.refresh(); }

  /** Из слайда: const users = this.model.getAll(); this.view.render(users); */
  refresh() {
    const users = this.model.getAll();
    this.view.render(users);
  }
}
