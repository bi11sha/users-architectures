/** Запуск: npm run solid — показывает работу всех примеров КТ2 (S, O, L, I, D). */
import { SrpUser, UserDB, EmailSender } from './srp.js';
import { TextReport, HtmlReport, JsonReport, makeReport } from './ocp.js';
import { FlyingBird, Ostrich, moveAll } from './lsp.js';
import { Human, Robot } from './isp.js';
import { Notifier, ConsoleStorage } from './dip.js';

console.log('--- S ---');
const u = new SrpUser('Анна', 'anna@mail.ru'); new UserDB().save(u); new EmailSender().send(u, 'Привет!');
console.log('--- O ---');
for (const r of [new TextReport(), new HtmlReport(), new JsonReport()]) console.log(makeReport(r, ['a', 'b']));
console.log('--- L ---');
console.log(moveAll([new FlyingBird(), new Ostrich()]));
console.log('--- I ---');
console.log(new Human().eat(), '|', new Robot().work());
console.log('--- D ---');
new Notifier(new ConsoleStorage()).notify('зависимость внедрена');
