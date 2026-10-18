/**
 * mvc/controller.js — CONTROLLER в архитектуре MVC.
 *
 * КТ3 · MVC — Controller: «обрабатывает ввод и управляет Model».
 * Контроллер принимает HTTP-запрос, вызывает метод Model и отвечает.
 * Сам HTML не строит (это работа View), данные не хранит (это работа Model).
 *
 * КТ2 · S: единственная ответственность — обработка запросов.
 * КТ2 · D: модель и представление приходят через конструктор, а не создаются внутри.
 */
export class UserController {
  constructor(model, view) { this.model = model; this.view = view; }

  /** GET /mvc/users — показать страницу */
  list = (req, res) => this.#send(res, 200, this.view.page());

  /** POST /mvc/users — создать пользователя (аналог create из слайда) */
  create = (req, res) => {
    try {
      const { age, username } = req.body;
      this.model.create({ age, username });        // Controller управляет Model
      res.writeHead(302, { Location: '/mvc/users' }); // redirect, как в слайде
      res.end();
    } catch (e) {
      // ошибка валидации → страница с сообщением (аналог users-error.hbs)
      this.#send(res, 400, this.view.page(e.message));
    }
  };

  /** DELETE /mvc/users/:id */
  remove = (req, res, id) => {
    this.model.remove(id);
    res.writeHead(204); res.end();
  };

  #send(res, code, html) {
    res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
}
