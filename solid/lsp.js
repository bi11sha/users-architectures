/**
 * КТ2 · L — Liskov Substitution Principle (слайд 4).
 * БЫЛО: Ostrich extends Bird и ломает fly() (бросает ошибку) — подставить страуса вместо Bird нельзя.
 * СТАЛО: выделили общий интерфейс, отдельно летающих и нелетающих.
 */
// ❌ Нарушение
export class BadBird { fly() { return 'летит'; } }
export class BadOstrich extends BadBird { fly() { throw new Error('страус не летает'); } }
// ✅ Решение
export class Bird { move() { throw new Error('не реализовано'); } }               // общий интерфейс
export class FlyingBird extends Bird { move() { return 'летит'; } }
export class Sparrow extends FlyingBird {}
export class Ostrich extends Bird { move() { return 'бежит'; } }                  // не наследует fly → ничего не ломает
export const moveAll = (birds) => birds.map((b) => b.move());                     // любая Bird подставляется
