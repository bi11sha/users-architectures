/**
 * КТ2 · O — Open/Closed Principle (слайд 3).
 * БЫЛО: функция report(type) с if/else — для JSON-отчёта её надо ПРАВИТЬ.
 * СТАЛО: абстракция + наследование — новый формат = новый класс, старый код не меняем.
 */
// ❌ Нарушение
export function badReport(data, type) {
  if (type === 'text') return data.join(', ');
  if (type === 'html') return `<ul>${data.map((d) => `<li>${d}</li>`).join('')}</ul>`;
  // для JSON пришлось бы дописывать сюда ещё один if
}
// ✅ Решение
export class Report { generate(data) { throw new Error('не реализовано'); } } // абстракция
export class TextReport extends Report { generate(d) { return d.join(', '); } }
export class HtmlReport extends Report { generate(d) { return `<ul>${d.map((x) => `<li>${x}</li>`).join('')}</ul>`; } }
export class JsonReport extends Report { generate(d) { return JSON.stringify(d); } } // добавлен БЕЗ правки остального
export const makeReport = (report, data) => report.generate(data); // работает с любым наследником
