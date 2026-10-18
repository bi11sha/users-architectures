/**
 * server.js — единая точка входа проекта (без внешних зависимостей, только Node.js).
 *
 * КТ3 · MVC (серверная часть): здесь создаются Model → View → Controller и подключаются к маршрутам.
 * MVP / MVVM / Onion / Clean — клиентские: сервер лишь отдаёт им статические файлы.
 * КТ2 · D: Model и View создаются снаружи и передаются Controller'у через конструктор.
 */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { UserModel } from './mvc/model.js';
import { UsersView } from './mvc/view.js';
import { UserController } from './mvc/controller.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

// ----- КТ3 · MVC: сборка триады -----
const model = new UserModel();
const view = new UsersView(model);            // View подписывается на Model
const controller = new UserController(model, view);

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const STATIC_DIRS = ['public', 'shared', 'mvp', 'mvvm', 'onion', 'clean']; // клиентские части

const readBody = (req) => new Promise((ok) => { let s = ''; req.on('data', (c) => (s += c)); req.on('end', () => ok(s)); });

http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://x');

  // ----- Маршруты MVC (КТ3) -----
  if (pathname === '/mvc/users' && req.method === 'GET') return controller.list(req, res);
  if (pathname === '/mvc/users' && req.method === 'POST') {
    req.body = Object.fromEntries(new URLSearchParams(await readBody(req)));
    return controller.create(req, res);
  }
  const del = pathname.match(/^\/mvc\/users\/(\d+)$/);
  if (del && req.method === 'DELETE') return controller.remove(req, res, del[1]);

  // ----- Статика для остальных архитектур -----
  let rel = pathname === '/' ? 'public/index.html' : pathname.slice(1);
  if (rel.endsWith('/')) rel += 'index.html';
  const top = rel.split('/')[0];
  const file = path.join(ROOT, rel);
  if (!STATIC_DIRS.includes(top) || !file.startsWith(ROOT)) { res.writeHead(404); return res.end('Not found'); }
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
