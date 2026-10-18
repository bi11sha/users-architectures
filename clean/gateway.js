/**
 * clean/gateway.js — ШЛЮЗ ДАННЫХ (слой адаптеров).
 * КТ4 · Clean: «Шлюз данных (InMemoryGateway) — реализует интерфейс хранения».
 * КТ2 · L: подставляется везде, где ожидается IGateway.
 */
import { IGateway } from './ports.js';
export class InMemoryGateway extends IGateway {
  #users = []; #next = 1;
  save(user) { user.id = this.#next++; this.#users.push(user); return user; }
  delete(id) { this.#users = this.#users.filter((u) => u.id !== id); }
  getAll() { return [...this.#users]; }
}
