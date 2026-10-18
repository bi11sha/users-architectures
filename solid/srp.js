/**
 * КТ2 · S — Single Responsibility Principle (слайд 2 презентации SOLID).
 * БЫЛО: класс User и хранил данные, и сохранял в БД, и слал email.
 * СТАЛО: три класса — по одной ответственности.
 */
// ❌ Нарушение (для сравнения)
export class BadUser {
  constructor(name, email) { this.name = name; this.email = email; }
  saveToDb() { console.log(`Сохранён ${this.name} в БД`); }       // лишняя ответственность
  sendEmail(msg) { console.log(`Письмо для ${this.email}: ${msg}`); } // лишняя ответственность
}
// ✅ Решение
export class SrpUser { constructor(name, email) { this.name = name; this.email = email; } } // только данные
export class UserDB { save(user) { console.log(`Сохранён ${user.name} в БД`); } }            // только хранение
export class EmailSender { send(user, msg) { console.log(`Письмо для ${user.email}: ${msg}`); } } // только почта
