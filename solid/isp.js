/**
 * КТ2 · I — Interface Segregation Principle (слайд 5).
 * БЫЛО: огромный интерфейс Worker заставляет робота есть и спать.
 * СТАЛО: узкие интерфейсы; класс реализует только нужные.
 */
// ❌ Нарушение
export class BadWorker { work() {} eat() {} sleep() {} }
export class BadRobot extends BadWorker { eat() { throw new Error('робот не ест'); } sleep() { throw new Error('робот не спит'); } }
// ✅ Решение: узкие интерфейсы
export class Workable { work() { throw new Error('не реализовано'); } }
export class Eatable { eat() { throw new Error('не реализовано'); } }
export class Sleepable { sleep() { throw new Error('не реализовано'); } }
export class Human { work() { return 'человек работает'; } eat() { return 'человек ест'; } sleep() { return 'человек спит'; } }
export class Robot { work() { return 'робот работает'; } } // только то, что умеет
