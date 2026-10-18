/**
 * shared/User.js — сущность «Пользователь» + бизнес-правила валидации.
 *
 * ┌─ КТ2 · S (Single Responsibility) ──────────────────────────────────────┐
 * │ Класс отвечает ТОЛЬКО за данные пользователя и их корректность.         │
 * │ Хранение (БД) и отображение сюда не попадают — они вынесены в           │
 * │ репозитории / представления (см. слайд SOLID, «User / UserDB / Sender»).│
 * └─────────────────────────────────────────────────────────────────────────┘
 * КТ4 · Onion (Слой 1 — Ядро / domain) и КТ4 · Clean (Сущности, entity.js):
 * этот файл не импортирует ничего внешнего — зависимостей нет вообще.
 * Его используют ВСЕ архитектуры проекта (MVC, MVP, MVVM, Onion, Clean).
 */
export class User {
  constructor(username, age, id = null) {
    // Правило домена №1: имя не пустое (слайд «Onion — Слой 1»)
    if (!username || !String(username).trim()) throw new Error('Имя обязательно');

    // Правило домена №2: возраст — целое число от 0 до 120
    const n = Number(age);
    if (age === '' || age === null || age === undefined || !Number.isInteger(n) || n < 0 || n > 120) {
      throw new Error('Возраст должен быть числом от 0 до 120');
    }

    this.id = id;
    this.username = String(username).trim();
    this.age = n;
  }
}
