/**
 * onion/core/IUserRepository.js — ИНТЕРФЕЙС репозитория (живёт в ядре/сервисе, а не в инфраструктуре).
 *
 * КТ4 · Onion: «Сервис работает через интерфейс репозитория, а не конкретную реализацию».
 * КТ2 · D (Dependency Inversion): внутренний слой определяет контракт, внешний — реализует.
 * КТ2 · I (Interface Segregation): контракт узкий — всего 3 метода, ничего лишнего.
 */
export class IUserRepository {
  save(user) { throw new Error('не реализовано'); }
  delete(id) { throw new Error('не реализовано'); }
  getAll() { throw new Error('не реализовано'); }
}
