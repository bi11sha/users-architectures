/**
 * clean/app.js — сборка (самый внешний слой: фреймворки/драйверы).
 * КТ4 · Clean: «В app.js создаются шлюз, презентер, все Use Case и контроллер.»
 */
import { InMemoryGateway } from './gateway.js';
import { HtmlPresenter } from './presenter.js';
import { AddUserUseCase, DeleteUserUseCase, GetAllUsersUseCase } from './usecases.js';
import { UserController } from './controller.js';

const gateway = new InMemoryGateway();
const presenter = new HtmlPresenter();
new UserController({
  add: new AddUserUseCase(gateway, presenter),
  remove: new DeleteUserUseCase(gateway, presenter),
  getAll: new GetAllUsersUseCase(gateway, presenter),
});
