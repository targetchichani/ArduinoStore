// ==================== سيرفر الطلبات (Express) ====================
// يتحقق من الأسعار من جهة السيرفر، يسجل الطلب، ويبعث إشعار تيليجرام + Google Sheets
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.jsonl');
fs.mkdirSync(DATA_DIR, { recursive: true });

// نقرا نفس ملفات الأسعار تاع الموقع (مصدر واحد للحقيقة)
function loadConst(file, name) {
const code = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');  return vm.runInNewContext(code + '\n;' + name, {});
}
const PRODUCTS = Object.fromEntries(loadConst('products-data.js', 'PRODUCTS_DATA').map(p => [p.id, p]));
const WILAYAS = Object.fromEntries(loadConst('delivery-data.js', 'DELIVERY_DATA').map(w => [w.code, w]));

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || true }));
app.use(express.json({ limit: '50kb' }));

// حماية بسيطة ضد السبام: 5 طلبات فالدقيقة لكل IP
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const arr = (hits.get(req.ip) || []).filter(t => now - t < 60000);
  if (arr.length >= 5) return res.status(429).json({ ok: false, error: 'محاولات كثيرة، عاود بعد دقيقة.' });
  arr.push(now); hits.set(req.ip, arr); next();
}

const clean = (s, max = 200) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

app.post('/api/order', rateLimit, async (req, res) => {
  try {
    const b = req.body || {};
    const name = clean(b.name, 80);
    const phone = clean(b.phone, 20).replace(/[\s.-]/g, '');
    const commune = clean(b.commune, 80);
    const address = clean(b.address, 200);
    const note = clean(b.note, 300);
    const deliveryType = b.deliveryType === 'desk' ? 'desk' : 'home';
    const wilaya = WILAYAS[Number(b.wilayaCode)];

    if (name.length < 3) return res.status(400).json({ ok: false, error: 'الاسم غير صالح.' });
    if (!/^0[567]\d{8}$/.test(phone)) return res.status(400).json({ ok: false, error: 'رقم الهاتف لازم يبدا بـ 05 أو 06 أو 07 ويكون 10 أرقام.' });
    if (!wilaya) return res.status(400).json({ ok: false, error: 'اختر الولاية.' });
    if (commune.length < 2) return res.status(400).json({ ok: false, error: 'اكتب البلدية.' });
    if (!Array.isArray(b.items) || !b.items.length || b.items.length > 50)
      return res.status(400).json({ ok: false, error: 'السلة فارغة.' });

    // الأسعار تتحسب هنا، ماشي من المتصفح
    let subtotal = 0;
    const items = [];
    for (const it of b.items) {
      const p = PRODUCTS[it.id];
      const qty = parseInt(it.qty, 10);
      if (!p || !(qty >= 1 && qty <= 99)) return res.status(400).json({ ok: false, error: 'منتج غير صالح فالسلة.' });
      subtotal += p.price * qty;
      items.push({ id: p.id, name: p.name, price: p.price, qty });
    }
    const delivery = wilaya[deliveryType];
    const total = subtotal + delivery;
    const orderId = 'AS-' + Date.now().toString(36).toUpperCase();

    const order = {
      orderId, date: new Date().toISOString(), status: 'new',
      name, phone, wilaya: wilaya.name, wilayaCode: wilaya.code, commune, address,
      deliveryType, subtotal, delivery, total, items, note
    };
    fs.appendFileSync(ORDERS_FILE, JSON.stringify(order) + '\n');

    // الإشعارات ما توقفش الطلب إذا فشلات
    await Promise.allSettled([notifyTelegram(order), pushToSheets(order)]);
    res.json({ ok: true, orderId, subtotal, delivery, total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'خطأ فالسيرفر، حاول مرة أخرى.' });
  }
});

async function notifyTelegram(o) {
  const { TELEGRAM_BOT_TOKEN: t, TELEGRAM_CHAT_ID: c } = process.env;
  if (!t || !c) return;
  const lines = o.items.map(i => `• ${i.name} x${i.qty} = ${i.price * i.qty} DA`).join('\n');
  const text = `🛒 طلب جديد ${o.orderId}\n\n👤 ${o.name}\n📞 ${o.phone}\n📍 ${o.wilaya} - ${o.commune}\n🏠 ${o.address || '-'}\n🚚 ${o.deliveryType === 'desk' ? 'مكتب (Stop Desk)' : 'منزل'}\n\n${lines}\n\nالمنتجات: ${o.subtotal} DA\nالتوصيل: ${o.delivery} DA\n💰 المجموع: ${o.total} DA${o.note ? '\n📝 ' + o.note : ''}`;
  await fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: c, text })
  });
}

async function pushToSheets(o) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ ...o, secret: process.env.SHEETS_SECRET || '', items: o.items.map(i => `${i.name} x${i.qty}`).join(' | ') })
  });
}

// الموقع نفسو (HTML/CSS/JS/الصور)
app.use(express.static(PUBLIC_DIR, { dotfiles: 'deny', index: 'index.html' }));
app.use((req, res) => res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
