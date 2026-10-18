/**
 * clean/ports.js — ПОРТЫ (интерфейсы), которые определяет слой Use Cases.
 *
 * КТ4 · Clean: каждый Use Case получает ДВА порта —
 *   • IGateway   — шлюз данных (хранение)
 *   • IPresenter — порт отображения (показ списка/сообщений)
 * Use Case «не знает, как именно данные сохраняются и отображаются».
 * КТ2 · I: два маленьких специализированных интерфейса вместо одного «большого».
 * КТ2 · D: внутренний слой владеет интерфейсами, внешние слои их реализуют.
 */
export class IGateway {
  save(user) { throw new Error('не реализовано'); }
  delete(id) { throw new Error('не реализовано'); }
  getAll() { throw new Error('не реализовано'); }
}
export class IPresenter {
  showUsers(users) { throw new Error('не реализовано'); }
  showMessage(text) { throw new Error('не реализовано'); }
}
