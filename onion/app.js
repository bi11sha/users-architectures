/**
 * onion/app.js — «Сборка зависимостей» (composition root).
 * КТ4 · Onion: «В одном файле создаются все объекты и связываются между собой.»
 * Порядок снаружи → внутрь: Инфраструктура → Сервис → UI. Зависимости направлены к центру.
 */
import { InMemoryUserRepository } from './infra/InMemoryUserRepository.js';
import { UserService } from './services/UserService.js';
import { UserUI } from './infra/UserUI.js';

const repository = new InMemoryUserRepository();   // инфраструктура
const service = new UserService(repository);       // сервис получает репозиторий через конструктор
new UserUI(service);                               // UI получает сервис
