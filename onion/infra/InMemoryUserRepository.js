/**
 * onion/infra/InMemoryUserRepository.js — Слой 3: ИНФРАСТРУКТУРА (хранение).
 * КТ4 · Onion: «Репозиторий (InMemoryUserRepository) — хранит данные в памяти, реализует интерфейс».
 * КТ2 · L (Liskov): может подставляться вместо IUserRepository, не ломая сервис —
 * можно заменить на LocalStorage/БД-репозиторий без правок UserService.
 */
import { IUserRepository } from '../core/IUserRepository.js';

export class InMemoryUserRepository extends IUserRepository {
  #users = []; #next = 1;
  save(user) { user.id = this.#next++; this.#users.push(user); return user; }
  delete(id) { this.#users = this.#users.filter((u) => u.id !== id); }
  getAll() { return [...this.#users]; }
}
