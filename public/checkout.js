// ==================== نموذج إتمام الطلب (Checkout) ====================
// ملف إضافي: ما يمس حتى سطر من script.js. يعترض زر "إتمام الطلب" ويفتح نموذج الطلب.
(function () {
    // ⚙️ عنوان السيرفر. '' = نفس الدومين (إذا شغلت الموقع بـ server.js).
    // إذا السيرفر مستضاف بعيد حط مثلا: 'https://my-api.onrender.com'
    const API_URL = window.ORDER_API_URL || '';
    const WHATSAPP_NUMBER = '213670346089';
    const CART_KEY = 'arduinoStoreCart';

    const lang = () => localStorage.getItem('selectedLanguage') || 'ar';
    const T = {
        ar: { title: 'إتمام الطلب', name: 'الاسم الكامل', phone: 'رقم الهاتف (05 / 06 / 07...)', wilaya: 'الولاية', pickW: 'اختر الولاية',
              commune: 'البلدية', address: 'العنوان (اختياري)', type: 'نوع التوصيل', home: 'إلى المنزل', desk: 'إلى المكتب (Stop Desk)',
              note: 'ملاحظة (اختياري)', sub: 'المنتجات', del: 'التوصيل', total: 'المجموع', send: 'تأكيد الطلب', sending: 'جاري الإرسال...',
              badPhone: 'رقم الهاتف لازم يبدا بـ 05 أو 06 أو 07 ويكون 10 أرقام', badName: 'اكتب الاسم الكامل', badW: 'اختر الولاية', badC: 'اكتب البلدية',
              empty: 'السلة فارغة، زيد منتج قبل ما تكمل الطلب.', okTitle: 'تم استلام طلبك ✅', okTxt: 'رقم طلبك:', okSub: 'غادي نتصلو بيك قريب لتأكيد الطلب.',
              wa: 'تأكيد عبر واتساب', close: 'إغلاق', fail: 'تعذر إرسال الطلب. تقدر تكمله عبر واتساب:', retry: 'أرسل عبر واتساب' },
        en: { title: 'Checkout', name: 'Full name', phone: 'Phone (05 / 06 / 07...)', wilaya: 'Wilaya', pickW: 'Select wilaya',
              commune: 'Commune', address: 'Address (optional)', type: 'Delivery type', home: 'Home delivery', desk: 'Office (Stop Desk)',
              note: 'Note (optional)', sub: 'Items', del: 'Delivery', total: 'Total', send: 'Confirm order', sending: 'Sending...',
              badPhone: 'Phone must start with 05, 06 or 07 and have 10 digits', badName: 'Enter your full name', badW: 'Select a wilaya', badC: 'Enter your commune',
              empty: 'Your cart is empty. Add a product first.', okTitle: 'Order received ✅', okTxt: 'Your order number:', okSub: 'We will call you soon to confirm.',
              wa: 'Confirm via WhatsApp', close: 'Close', fail: 'Could not send the order. You can finish it via WhatsApp:', retry: 'Send via WhatsApp' }
    };
    const t = (k) => T[lang()][k] || T.ar[k];
    const fmt = (n) => Number(n).toLocaleString('en-US') + ' DA';
    const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } };
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // ---------- الستايل (محقون من هنا باش ما نمسوش style.css) ----------
    const css = document.createElement('style');
    css.textContent = `
    .co-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100000;display:flex;align-items:center;justify-content:center;padding:12px}
    .co-modal{background:var(--card-bg,#fff);color:var(--text-color,#222);width:100%;max-width:480px;max-height:92vh;overflow:auto;border-radius:14px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.4);font-family:inherit}
    .dark-mode .co-modal{background:#1e1e1e;color:#eee}
    .co-modal h3{margin:0 0 14px;font-size:1.25rem}
    .co-field{margin-bottom:11px}
    .co-field label{display:block;font-size:.88rem;margin-bottom:4px;opacity:.85}
    .co-field input,.co-field select,.co-field textarea{width:100%;padding:10px;border:1px solid #bbb;border-radius:8px;font:inherit;background:transparent;color:inherit;box-sizing:border-box}
    .dark-mode .co-field select option{background:#1e1e1e}
    .co-field.err input,.co-field.err select{border-color:#e53935}
    .co-err-msg{color:#e53935;font-size:.8rem;margin-top:3px;display:none}
    .co-field.err .co-err-msg{display:block}
    .co-radios{display:flex;gap:8px}
    .co-radios label{flex:1;border:1px solid #bbb;border-radius:8px;padding:9px;text-align:center;cursor:pointer;font-size:.88rem;opacity:1;margin:0}
    .co-radios input{display:none}
    .co-radios input:checked+span{font-weight:700;color:#ff6b00}
    .co-radios label:has(input:checked){border-color:#ff6b00;background:rgba(255,107,0,.08)}
    .co-summary{border-top:1px dashed #999;margin-top:6px;padding-top:10px;font-size:.95rem}
    .co-summary div{display:flex;justify-content:space-between;margin-bottom:4px}
    .co-summary .co-total{font-weight:700;font-size:1.1rem;color:#ff6b00}
    .co-actions{display:flex;gap:8px;margin-top:14px}
    .co-actions button{flex:1;padding:12px;border:0;border-radius:8px;font:inherit;font-weight:700;cursor:pointer}
    .co-btn-main{background:#ff6b00;color:#fff}.co-btn-main:disabled{opacity:.6;cursor:wait}
    .co-btn-sec{background:#888;color:#fff}.co-btn-wa{background:#25d366;color:#fff}
    .co-center{text-align:center}.co-center .co-id{font-size:1.3rem;font-weight:700;color:#ff6b00;direction:ltr}
    .co-fail{background:rgba(229,57,53,.1);color:#e53935;padding:9px;border-radius:8px;margin-bottom:10px;font-size:.88rem;display:none}`;
    document.head.appendChild(css);

    function waMessage(cart, data, wilaya, delivery, orderId) {
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        let m = (orderId ? `طلب رقم ${orderId}\n` : 'طلب جديد:\n');
        cart.forEach(i => { m += `- ${i.name} x${i.qty} = ${fmt(i.price * i.qty)}\n`; });
        m += `\nالمنتجات: ${fmt(total)}\nالتوصيل: ${fmt(delivery)}\nالمجموع: ${fmt(total + delivery)}\n`;
        m += `\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالولاية: ${wilaya ? wilaya.name : ''}\nالبلدية: ${data.commune}\nالعنوان: ${data.address || '-'}\nالتوصيل: ${data.deliveryType === 'desk' ? 'مكتب' : 'منزل'}`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;
    }

    function openCheckout() {
        const cart = getCart();
        if (!cart.length) { alert(t('empty')); return; }
        if (typeof DELIVERY_DATA === 'undefined') { alert('delivery-data.js missing'); return; }
        const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const rtl = lang() === 'ar';

        const ov = document.createElement('div');
        ov.className = 'co-overlay';
        ov.innerHTML = `
        <div class="co-modal" dir="${rtl ? 'rtl' : 'ltr'}">
          <div id="coForm">
            <h3>${t('title')}</h3>
            <div class="co-fail" id="coFail"></div>
            <div class="co-field" data-f="name"><label>${t('name')}</label><input id="coName" autocomplete="name"><div class="co-err-msg">${t('badName')}</div></div>
            <div class="co-field" data-f="phone"><label>${t('phone')}</label><input id="coPhone" type="tel" inputmode="numeric" maxlength="10" dir="ltr" autocomplete="tel"><div class="co-err-msg">${t('badPhone')}</div></div>
            <div class="co-field" data-f="wilaya"><label>${t('wilaya')}</label>
              <select id="coWilaya"><option value="">${t('pickW')}</option>${DELIVERY_DATA.map(w => `<option value="${w.code}">${String(w.code).padStart(2, '0')} - ${esc(w.name)}</option>`).join('')}</select>
              <div class="co-err-msg">${t('badW')}</div></div>
            <div class="co-field" data-f="commune"><label>${t('commune')}</label><input id="coCommune"><div class="co-err-msg">${t('badC')}</div></div>
            <div class="co-field"><label>${t('address')}</label><input id="coAddress" autocomplete="street-address"></div>
            <div class="co-field"><label>${t('type')}</label>
              <div class="co-radios">
                <label><input type="radio" name="coType" value="home" checked><span>🏠 ${t('home')}</span></label>
                <label><input type="radio" name="coType" value="desk"><span>🏢 ${t('desk')}</span></label>
              </div></div>
            <div class="co-field"><label>${t('note')}</label><textarea id="coNote" rows="2"></textarea></div>
            <div class="co-summary">
              <div><span>${t('sub')}</span><span>${fmt(subtotal)}</span></div>
              <div><span>${t('del')}</span><span id="coDel">—</span></div>
              <div class="co-total"><span>${t('total')}</span><span id="coTot">${fmt(subtotal)}</span></div>
            </div>
            <div class="co-actions">
              <button class="co-btn-main" id="coSend">${t('send')}</button>
              <button class="co-btn-sec" id="coCancel">${t('close')}</button>
            </div>
          </div>
        </div>`;
        document.body.appendChild(ov);
        document.body.style.overflow = 'hidden';

        const $ = (id) => ov.querySelector('#' + id);
        const close = () => { ov.remove(); document.body.style.overflow = ''; };
        $('coCancel').onclick = close;
        ov.addEventListener('mousedown', e => { if (e.target === ov) close(); });

        const getType = () => ov.querySelector('input[name=coType]:checked').value;
        const getWilaya = () => DELIVERY_DATA.find(w => String(w.code) === $('coWilaya').value);
        const getDelivery = () => { const w = getWilaya(); return w ? w[getType()] : 0; };
        function refresh() {
            const w = getWilaya();
            $('coDel').textContent = w ? fmt(getDelivery()) : '—';
            $('coTot').textContent = fmt(subtotal + getDelivery());
        }
        $('coWilaya').onchange = refresh;
        ov.querySelectorAll('input[name=coType]').forEach(r => r.onchange = refresh);
        // أرقام فقط فالهاتف
        $('coPhone').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); });

        function validate() {
            const ok = {
                name: $('coName').value.trim().length >= 3,
                phone: /^0[567]\d{8}$/.test($('coPhone').value),
                wilaya: !!getWilaya(),
                commune: $('coCommune').value.trim().length >= 2
            };
            Object.keys(ok).forEach(k => ov.querySelector(`[data-f=${k}]`).classList.toggle('err', !ok[k]));
            return Object.values(ok).every(Boolean);
        }

        $('coSend').onclick = async () => {
            if (!validate()) return;
            const data = {
                name: $('coName').value.trim(), phone: $('coPhone').value, wilayaCode: Number($('coWilaya').value),
                commune: $('coCommune').value.trim(), address: $('coAddress').value.trim(),
                deliveryType: getType(), note: $('coNote').value.trim(),
                items: cart.map(i => ({ id: i.id, qty: i.qty }))   // السعر ما نبعثوهش، السيرفر هو اللي يحسبو
            };
            const btn = $('coSend');
            btn.disabled = true; btn.textContent = t('sending');
            try {
                const res = await fetch(API_URL + '/api/order', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
                });
                const j = await res.json().catch(() => ({}));
                if (!res.ok || !j.ok) {
                    if (res.status === 400 && j.error) throw new Error('VALIDATION:' + j.error);
                    throw new Error('SERVER');
                }
                // نجاح: نفرغ السلة ونحدث الواجهة
                localStorage.setItem(CART_KEY, JSON.stringify([]));
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                const wa = waMessage(cart, data, getWilaya(), j.delivery, j.orderId);
                ov.querySelector('.co-modal').innerHTML = `
                  <div class="co-center">
                    <h3>${t('okTitle')}</h3>
                    <p>${t('okTxt')}</p><p class="co-id">${esc(j.orderId)}</p>
                    <p>${t('total')}: <b>${fmt(j.total)}</b></p>
                    <p>${t('okSub')}</p>
                    <div class="co-actions">
                      <a class="co-btn-wa" style="flex:1;padding:12px;border-radius:8px;text-decoration:none;font-weight:700" href="${wa}" target="_blank">${t('wa')}</a>
                      <button class="co-btn-sec" id="coDone">${t('close')}</button>
                    </div>
                  </div>`;
                ov.querySelector('#coDone').onclick = close;
            } catch (err) {
                btn.disabled = false; btn.textContent = t('send');
                const fail = $('coFail');
                if (String(err.message).startsWith('VALIDATION:')) {
                    fail.textContent = err.message.slice(11);
                    fail.style.display = 'block';
                } else {
                    // السيرفر طايح: نقترح واتساب كحل احتياطي (الطلب ما يضيعش)
                    const wa = waMessage(cart, data, getWilaya(), getDelivery(), null);
                    fail.innerHTML = `${t('fail')} <a href="${wa}" target="_blank" style="color:#25d366;font-weight:700">${t('retry')}</a>`;
                    fail.style.display = 'block';
                }
            }
        };
    }

    // نعترض الضغطة قبل ما يوصل لكود الواتساب القديم (اللي يبقى سليم فـ script.js)
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#cartCheckoutBtn')) {
            e.preventDefault();
            e.stopImmediatePropagation();
            openCheckout();
        }
    }, true);
})();
