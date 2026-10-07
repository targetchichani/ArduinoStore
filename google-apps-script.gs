// Google Sheets: Extensions → Apps Script → الصق هاد الكود → Deploy → Web app
// (Execute as: Me | Who has access: Anyone) ثم انسخ الرابط وحطو فـ SHEETS_WEBHOOK_URL
const SECRET = 'نفس_SHEETS_SECRET_تاع_.env';
function doPost(e) {
  const o = JSON.parse(e.postData.contents);
  if (o.secret !== SECRET) return ContentService.createTextOutput('forbidden');
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(['رقم الطلب','التاريخ','الاسم','الهاتف','الولاية','البلدية','العنوان','نوع التوصيل','المنتجات','سعر المنتجات','التوصيل','المجموع','ملاحظة','الحالة']);
  sh.appendRow([o.orderId, o.date, o.name, "'" + o.phone, o.wilaya, o.commune, o.address, o.deliveryType === 'desk' ? 'مكتب' : 'منزل', o.items, o.subtotal, o.delivery, o.total, o.note, 'جديد']);
  return ContentService.createTextOutput('ok');
}
