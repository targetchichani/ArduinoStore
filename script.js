document.addEventListener("DOMContentLoaded", () => {
  // ==================== 0. الوضع الليلي (Dark Mode Toggle) ====================
    const THEME_KEY = 'siteTheme';
    const themeToggleBtn = document.getElementById('darkModeToggleBtn');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark'
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي');
        }
    }

    let currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem(THEME_KEY, currentTheme);
            applyTheme(currentTheme);
        });
    }

  // ==================== 1. نظام اللغات (مضبوط نيشَان ومعالج الألوان) ====================
    const translations = {
        ar: {
            doc_title: "متجر أردوينو الإلكتروني - Houssam HK",
            logo: '<span style="color: #007a87; font-weight: 550; font-size: 24px;">أردوينو</span> <span style="color: #e67e22; font-weight: 700; font-size: 24px;">ستور</span>',
            nav_home: "الرئيسية",
            nav_community: 'مجتمع <i class="fas fa-chevron-down nav-arrow"></i>',
            nav_projects: 'المشاريع <i class="fas fa-chevron-down nav-arrow"></i>',
            nav_shop: "تسوق",
            intro_title: 'أردوينو <span style="color: #e67e22;">ستور</span>',
            intro_desc: "منصتك الأولى للحصول على أفضل القطع الإلكترونية والمتحكمات الذكية لبناء مشاريعك البرمجية بكل سهولة.",
            intro_btn: "⌄ استمر",
            hero_title: "ابدأ رحلة الابتكار مع أفضل القطع الإلكترونية",
            hero_desc: "نوفر لك لوحات Arduino الأصلي ومكوناتها لتطوير مشاريعك البرمجية بكل سهولة ومن مكان واحد.",
            hero_btn: "تسوّق الآن",
            products_title: "منتجاتنا المتميزة",
            products_desc: "أفضل القطع المختارة لمشاريعك القادمة",
            products_view_all: "تصفح كل المنتجات",
            form_title: "راسلنا",
            form_name: "الاسم",
            form_email: "البريد الإلكتروني",
            form_message: "رسالتك",
            form_submit: "إرسال",
            footer_about_title: "أردوينو ستور",
            footer_about_desc: "منصتك الأولى للحصول على أفضل القطع الإلكترونية والمتحكمات الذكية لبناء وتطوير مشاريعك البرمجية بكل سهولة.",
            footer_links_title: "روابط سريعة",
            footer_link_products: "المنتجات",
            footer_contact_title: "تواصل معنا",
            footer_phone: '<i class="fas fa-phone-alt"></i> <a href="tel:+213670346089" style="direction: ltr; display: inline-block;">+213 670 34 60 89</a>',
            footer_support: "دعم فني متواصل 24/7",
            footer_social_title: "تابعنا على منصاتنا",
            footer_social_desc: "اشترك وماتنساش تتابعنا على حساباتنا الرسمية:",
            footer_rights: "أردوينو ستور - المطور Houssam HK. جميع الحقوق محفوظة.",
            proj_weather: '<i class="fas fa-cloud-sun"></i> weather situation',
            proj_thermometer: '<i class="fas fa-thermometer-half"></i> LCD thermometer',
            proj_blinking: '<i class="fas fa-bolt"></i> Blinking LED',
            proj_alarm: '<i class="fas fa-bell"></i> Motion alarm',
            proj_robot: '<i class="fas fa-car"></i> Robot car',
            comm_web: '<i class="fas fa-code"></i> web developer',
            comm_app: '<i class="fas fa-mobile-alt"></i> app developer',
            comm_ai: '<i class="fas fa-robot"></i> Ai automation',
            comm_workshops: '<i class="fas fa-chalkboard-teacher"></i> workshops',
            comm_github: '<i class="fab fa-github"></i> github',
            cart_title: "سلة المشتريات",
            cart_empty: "السلة فارغة حالياً",
            cart_total: "المجموع",
            cart_checkout: "إتمام الطلب عبر واتساب",
            wishlist_title: "المفضلة",
            wishlist_empty: "لائحة المفضلة فارغة حالياً",
            search_placeholder: "ابحث عن منتج...",
            filter_all: "الكل",
            no_results: "ماكاينش نتائج مطابقة",
            back_to_shop: "رجوع للمتجر",
            add_to_cart: "أضف إلى السلة",
            quantity: "الكمية",
            loading_product: "جاري تحميل المنتج...",
            product_not_found: "هاد المنتج ماكاينش",
            trust_delivery: "توصيل لكل الولايات",
            trust_warranty: "ضمان على المنتج",
            rate_this_product: "قيّم هذا المنتج",
            rate_thanks: "شكراً على تقييمك!",
            reviews_label: "تقييم",
            faq_title: "الأسئلة الشائعة",
            faq_subtitle: "إجابات على أكثر الأسئلة اللي توصلنا بخصوص التوصيل والدفع والمنتجات",
            faq_q1: "شحال يخلص التوصيل ولوقتاش يوصل الطلب؟",
            faq_a1: "التوصيل يوصل لكل ولايات الوطن، وثمنه يختلف حسب البلدية (مكتب أو للمنزل). مدة التوصيل عادة بين 2 و5 أيام حسب الولاية.",
            faq_q2: "كيفاش نخلص الطلب؟",
            faq_a2: "الخلاص يكون عند الاستلام (Cash on Delivery) عبر مكاتب التوصيل، ولا مباشرة مع عون التوصيل عند وصول الطرد لباب الدار.",
            faq_q3: "واش المنتجات أصلية ومضمونة؟",
            faq_a3: "إيه بالتأكيد، كل المنتجات أصلية ومختارة بعناية، وتستافد من ضمان على العيوب الصناعية حسب نوع المنتج.",
            faq_q4: "نقدر نبدل ولا نرجع المنتج إذا ما عجبنيش؟",
            faq_a4: "إيه، تقدر تبدل ولا ترجع المنتج فظرف 7 أيام من تاريخ الاستلام بشرط يكون فحالته الأصلية وبلا استعمال.",
            faq_q5: "كيفاش نتواصل معاكم إذا عندي مشكل ولا استفسار؟",
            faq_a5: "تقدر تراسلنا مباشرة عبر زر واتساب العائم فالموقع، ولا عبر البريد الإلكتروني أو الهاتف الموجودين فالفوتر.",
            error_404_title: "الصفحة اللي قلبت عليها ماكانتش",
            error_404_desc: "يمكن الرابط تبدل ولا الصفحة تشالت. جرب ترجع للرئيسية ولا تكمل التسوق عندنا.",
            error_404_home: "الرئيسية",
            error_404_shop: "تصفح المتجر",
            testimonials_title: "وش قالوا عنا الزبائن",
            testimonials_subtitle: "تجارب حقيقية من زبائن اشترو معانا وثقو في الجودة والخدمة",
            testimonial1_text: "جودة المكونات والشرح واضحة جداً، شكراً لأنكم تسهلون علينا الدخول في هذا المجال التقني.",
            testimonial1_name: "ياسين مولفي",
            testimonial1_location: "سيدي بلعباس",
            testimonial2_text: "تعلمت الكثير من دروسك، التدرج في شرح المكونات من الصفر هو أفضل شيء في موقعكم.",
            testimonial2_name: "نذير تازغات",
            testimonial2_location: "وهران",
            testimonial3_text: "أفضل موقع عربي لمشاريع الأردوينو، المحتوى مرتب ومفيد جداً للهواة والمحترفين.",
            testimonial3_name: "شمام إلياس ",
            testimonial3_location: "بومرداس ",
            testimonial4_text: "مشروع رائع ومبسط! شكراً لك على مشاركة الكود وشرح الخطوات بهذه الطريقة الواضحة.",
            testimonial4_name: "جليل عبد الباسط",
            testimonial4_location: "واد رهيوا",
            trust_cod: "الدفع عند الاستلام",
            trust_support: "دعم فني 24/7",
            partners_title:"من بين زبائننا: طلبة وموظفين ",
            sponsors_title: "رعاتنا"
        },
        en: {
            doc_title: "Arduino Store - Houssam HK",
            logo: '<span style="color: #007a87; font-weight: 550; font-size: 24px;">Arduino</span> <span style="color: #e67e22; font-weight: 700; font-size: 24px;">Store</span>',
            nav_home: "Home",
            nav_community: 'Community <i class="fas fa-chevron-down nav-arrow"></i>',
            nav_projects: 'Projects <i class="fas fa-chevron-down nav-arrow"></i>',
            nav_shop: "Shop",
            intro_title: 'Arduino <span style="color: #e67e22;">Store</span>',
            intro_desc: "Your premier platform to get the best electronic parts and smart microcontrollers to build your software projects with ease.",
            intro_btn: "⌄ Continue",
            hero_title: "Start your innovation journey with the best electronic components",
            hero_desc: "We provide original Arduino boards and components to develop your programming projects easily and all in one place.",
            hero_btn: "Shop Now",
            products_title: "Our Featured Products",
            products_desc: "The best parts hand-picked for your next project",
            products_view_all: "Browse All Products",
            form_title: "Contact Us",
            form_name: "Name",
            form_email: "Email",
            form_message: "Your Message",
            form_submit: "Send",
            footer_about_title: "Arduino Store",
            footer_about_desc: "Your premier platform to get the best electronic parts and smart microcontrollers to build and develop your software projects with ease.",
            footer_links_title: "Quick Links",
            footer_link_products: "Products",
            footer_contact_title: "Contact Us",
            footer_phone: '<i class="fas fa-phone-alt"></i> <a href="tel:+213670346089" style="direction: ltr; display: inline-block;">+213 670 34 60 89</a>',
            footer_support: "Continuous technical support 24/7",
            footer_social_title: "Follow Us On Our Platforms",
            footer_social_desc: "Subscribe and don't forget to follow our official accounts:",
            footer_rights: "Arduino Store - Developed by Houssam HK. All rights reserved.",
            proj_weather: '<i class="fas fa-cloud-sun"></i> weather situation',
            proj_thermometer: '<i class="fas fa-thermometer-half"></i> LCD thermometer',
            proj_blinking: '<i class="fas fa-bolt"></i> Blinking LED',
            proj_alarm: '<i class="fas fa-bell"></i> Motion alarm',
            proj_robot: '<i class="fas fa-car"></i> Robot car',
            comm_web: '<i class="fas fa-code"></i> web developer',
            comm_app: '<i class="fas fa-mobile-alt"></i> app developer',
            comm_ai: '<i class="fas fa-robot"></i> Ai automation',
            comm_workshops: '<i class="fas fa-chalkboard-teacher"></i> workshops',
            comm_github: '<i class="fab fa-github"></i> github',
            cart_title: "Shopping Cart",
            cart_empty: "Your cart is empty",
            cart_total: "Total",
            cart_checkout: "Checkout via WhatsApp",
            wishlist_title: "Wishlist",
            wishlist_empty: "Your wishlist is empty",
            search_placeholder: "Search for a product...",
            filter_all: "All",
            no_results: "No matching products found",
            back_to_shop: "Back to shop",
            add_to_cart: "Add to cart",
            quantity: "Quantity",
            loading_product: "Loading product...",
            product_not_found: "This product doesn't exist",
            trust_delivery: "Delivery to all provinces",
            trust_warranty: "Product warranty",
            rate_this_product: "Rate this product",
            rate_thanks: "Thanks for your rating!",
            reviews_label: "reviews",
            faq_title: "Frequently Asked Questions",
            faq_subtitle: "Answers to the most common questions about delivery, payment and products",
            faq_q1: "How much does delivery cost and how long does it take?",
            faq_a1: "We deliver to all provinces of the country, price varies by municipality (office pickup or home delivery). Delivery usually takes 2 to 5 days depending on the province.",
            faq_q2: "How do I pay for my order?",
            faq_a2: "Payment is Cash on Delivery through delivery offices, or directly with the delivery agent when the package arrives at your door.",
            faq_q3: "Are the products original and guaranteed?",
            faq_a3: "Yes, all products are original and carefully selected, and benefit from a warranty against manufacturing defects depending on the product type.",
            faq_q4: "Can I exchange or return a product if I'm not satisfied?",
            faq_a4: "Yes, you can exchange or return the product within 7 days of receiving it, provided it's in its original condition and unused.",
            faq_q5: "How can I contact you if I have an issue or question?",
            faq_a5: "You can message us directly via the floating WhatsApp button on the site, or through the email and phone number found in the footer.",
            error_404_title: "The page you're looking for doesn't exist",
            error_404_desc: "The link may have changed or the page was removed. Try going back home or continue shopping with us.",
            error_404_home: "Home",
            error_404_shop: "Browse Shop",
            testimonials_title: "What Our Customers Say",
            testimonials_subtitle: "Real experiences from customers who trusted our quality and service",
            testimonial1_text: "The quality of the components and the explanations are very clear, thank you for making it easier for us to get into this technical field.",
            testimonial1_name: "Yassine Moulfi",
            testimonial1_location: "Sidi Bel Abbes",
            testimonial2_text: "I learned a lot from your lessons, the gradual step-by-step explanation of components from scratch is the best thing about your site.",
            testimonial2_name: "Nadir Tasghat",
            testimonial2_location: "Oran",
            testimonial3_text: "The best Arabic website for Arduino projects, the content is organized and very useful for both hobbyists and professionals.",
            testimonial3_name: "Chemmam Ilyes",
            testimonial3_location: "BOUMERDES",
            testimonial4_text: "A great and simplified project! Thank you for sharing the code and explaining the steps so clearly.",
            testimonial4_name: "Djlil Abdelbasset",
            testimonial4_location: "Oued Rhiou",
            trust_cod: "Cash on delivery",
            trust_support: "24/7 technical support",
            partners_title: "Our clients include: students and employees",
            sponsors_title: "Our Sponsors"
        }
    };

   const langToggleBtn = document.getElementById('lang-toggle-btn');
   let currentLang = localStorage.getItem('selectedLanguage') || 'ar';

   function changeLanguage(lang) {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // ملاحظة: ما بقيناش نفرضو document.title = doc_title هنا، لأن <title> عندها
        // data-i18n ديالها (بحال error_404_title فصفحة 404) وكيتبدلات ديجا فالحلقة فوق.
        // كنا نبدلوها زوج مرات ونمسحو أي عنوان خاص بالصفحة (بحال عنوان صفحة 404).

        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
        }

        window.dispatchEvent(new CustomEvent('languageChanged'));
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('selectedLanguage', currentLang);
            changeLanguage(currentLang);
        });
    }

    // تشغيل اللغة عند تحميل الصفحة ديركت
    changeLanguage(currentLang);

    // ==================== 2. تفاعل حركة الـ Parallax المعدل والمستقر ====================
    const hero = document.querySelector('.hero-section');
    const bgContainer = document.getElementById('heroParallaxBg');

    if (hero && bgContainer) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const xOffset = (mouseX / rect.width) - 0.5;
            const yOffset = (mouseY / rect.height) - 0.5;

            const moveX = xOffset * -35; 
            const moveY = yOffset * -35;
            const rotateX = yOffset * 4;  
            const rotateY = xOffset * -4; 

            bgContainer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            bgContainer.style.transition = 'transform 0.8s ease';
            bgContainer.style.transform = 'translate3d(0px, 0px, 0) rotateX(0deg) rotateY(0deg)';
        });

        hero.addEventListener('mouseenter', () => {
            bgContainer.style.transition = 'transform 0.1s ease-out';
        });

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled <= hero.offsetHeight) {
                hero.style.backgroundPosition = `center ${scrolled * 0.4}px`;
            }
        });
    }

    // ==================== 3. قائمة الموبايل (Hamburger Menu) ====================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mainNav = document.getElementById('mainNav');

    if (menuToggleBtn && mainNav) {
        menuToggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // فتح/سد القوائم الفرعية (مجتمع / المشاريع) بالضغط بدل الـ hover فالموبايل
        document.querySelectorAll('.has-mega-menu > a').forEach((link) => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    link.parentElement.classList.toggle('open');
                }
            });
        });

        // سد القائمة كي تضغط برا منها
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 &&
                mainNav.classList.contains('active') &&
                !mainNav.contains(e.target) &&
                e.target !== menuToggleBtn &&
                !menuToggleBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ==================== 4. سكرول ناعم يدوي (يصلح مشكل القفزة المفاجئة فـ Safari) ====================
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // ملاحظة: ما نبدلوش الـ URL hash هنا عمداً، باش ما يصرى قفزة مفاجئة كي تعاود تكرر الصفحة
                }
            }
        });
    });

    // إذا كانت الصفحة تحملت وعندها hash فالـ URL (مثلا #main-hero)، نمسحوه باش مايبقاش يأثر على الإعادة
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // ==================== 5. نظام سلة المشتريات (Cart) ====================
    const CART_KEY = 'arduinoStoreCart';
    const WHATSAPP_NUMBER = '213670346089'; // بلا + وبلا صفر البداية

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function formatPrice(num) {
        return num.toLocaleString('en-US') + ' DA';
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        saveCart(cart);
        renderCart();
        bumpCartBadge();
    }

    function updateQty(id, delta) {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(id);
            return;
        }
        saveCart(cart);
        renderCart();
    }

    function removeFromCart(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        renderCart();
    }

    function bumpCartBadge() {
        const badge = document.getElementById('cartCount');
        if (!badge) return;
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 200);
    }

    function renderCart() {
        const cart = getCart();
        const countEl = document.getElementById('cartCount');
        const itemsContainer = document.getElementById('cartItemsContainer');
        const totalEl = document.getElementById('cartTotalPrice');
        if (!countEl || !itemsContainer || !totalEl) return;

        const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
        countEl.textContent = totalQty;

        if (cart.length === 0) {
            const emptyText = (currentLang === 'ar') ? 'السلة فارغة حالياً' : 'Your cart is empty';
            itemsContainer.innerHTML = `<p class="cart-empty-msg">${emptyText}</p>`;
            totalEl.textContent = formatPrice(0);
            return;
        }

        let total = 0;
        itemsContainer.innerHTML = cart.map(item => {
            const lineTotal = item.price * item.qty;
            total += lineTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img loading="lazy" decoding="async" src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${formatPrice(lineTotal)}</div>
                        <div class="cart-item-qty-controls">
                            <button class="cart-qty-btn cart-qty-minus" data-id="${item.id}">−</button>
                            <span>${item.qty}</span>
                            <button class="cart-qty-btn cart-qty-plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            `;
        }).join('');

        totalEl.textContent = formatPrice(total);
    }

    // ربط أزرار "أضف إلى السلة" فكل المنتجات
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const { id, name, price, img } = btn.dataset;
            if (!id) return; // زر بلا بيانات منتج (احتياط)
            addToCart({ id, name, price: parseInt(price, 10) || 0, img });

            // تأثير بصري صغير على الزر نفسه
            btn.classList.add('added');
            setTimeout(() => btn.classList.remove('added'), 400);
        });
    });

    // فتح/غلق درج السلة
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');

    function openCart() {
        if (!cartDrawer || !cartOverlay) return;
        if (typeof closeWishlist === 'function') closeWishlist();
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.classList.add('cart-open');
    }

    function closeCart() {
        if (!cartDrawer || !cartOverlay) return;
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.classList.remove('cart-open');
    }

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // أزرار +/- والحذف جوا السلة (event delegation)
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const plusBtn = e.target.closest('.cart-qty-plus');
            const minusBtn = e.target.closest('.cart-qty-minus');
            const removeBtn = e.target.closest('.cart-item-remove');

            if (plusBtn) updateQty(plusBtn.dataset.id, 1);
            if (minusBtn) updateQty(minusBtn.dataset.id, -1);
            if (removeBtn) removeFromCart(removeBtn.dataset.id);
        });
    }

    // زر إتمام الطلب عبر واتساب
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                const emptyAlert = (currentLang === 'ar') ? 'السلة فارغة، زيد منتج قبل ما تكمل الطلب.' : 'Your cart is empty. Add a product before checking out.';
                alert(emptyAlert);
                return;
            }

            let message = (currentLang === 'ar') ? 'مرحباً، بغيت نطلب:\n' : 'Hello, I would like to order:\n';
            let total = 0;
            cart.forEach(item => {
                const lineTotal = item.price * item.qty;
                total += lineTotal;
                message += `- ${item.name} x${item.qty} = ${formatPrice(lineTotal)}\n`;
            });
            message += (currentLang === 'ar') ? `\nالمجموع الكلي: ${formatPrice(total)}` : `\nTotal: ${formatPrice(total)}`;

            const encodedMessage = encodeURIComponent(message);
            const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
            window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
        });
    }

    // عرض السلة عند تحميل الصفحة
    renderCart();

    // الاستماع لتحديثات السلة الجاية من صفحات أخرى (بحال product-detail.js)
    window.addEventListener('cartUpdated', renderCart);

    // ==================== 5.5. نظام المفضلة (Wishlist) ====================
    const WISHLIST_KEY = 'arduinoStoreWishlist';

    function getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveWishlist(list) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    }

    function bumpWishlistBadge() {
        const badge = document.getElementById('wishlistCount');
        if (!badge) return;
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 200);
    }

    // يزيد المنتج للمفضلة إلى ماكانش، ويحذفه إلى كان موجود
    function toggleWishlistItem(product) {
        let list = getWishlist();
        const existingIndex = list.findIndex(item => item.id === product.id);
        if (existingIndex > -1) {
            list.splice(existingIndex, 1);
        } else {
            list.push(product);
        }
        saveWishlist(list);
        renderWishlist();
        syncWishlistButtons();
        bumpWishlistBadge();
    }

    // يحدث شكل كل أزرار القلب (فـ البطاقات وصفحة التفاصيل) حسب حالة المفضلة الحالية
    function syncWishlistButtons() {
        const list = getWishlist();
        document.querySelectorAll('.wishlist-btn, .product-detail-wishlist-btn').forEach(btn => {
            const id = btn.dataset.id;
            if (!id) return;
            const active = list.some(item => item.id === id);
            btn.classList.toggle('active', active);
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('far', !active);
                icon.classList.toggle('fas', active);
            }
        });
    }

    function removeFromWishlist(id) {
        let list = getWishlist();
        list = list.filter(item => item.id !== id);
        saveWishlist(list);
        renderWishlist();
        syncWishlistButtons();
    }

    function renderWishlist() {
        const list = getWishlist();
        const countEl = document.getElementById('wishlistCount');
        const itemsContainer = document.getElementById('wishlistItemsContainer');
        if (!countEl || !itemsContainer) return;

        countEl.textContent = list.length;

        if (list.length === 0) {
            const emptyText = (currentLang === 'ar') ? 'لائحة المفضلة فارغة حالياً' : 'Your wishlist is empty';
            itemsContainer.innerHTML = `<p class="cart-empty-msg">${emptyText}</p>`;
            return;
        }

        const moveText = (currentLang === 'ar') ? 'أضف للسلة' : 'Add to cart';

        itemsContainer.innerHTML = list.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img loading="lazy" decoding="async" src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="wishlist-item-actions">
                        <button class="wishlist-item-move-btn" data-id="${item.id}"><i class="fas fa-cart-plus"></i> ${moveText}</button>
                    </div>
                </div>
                <button class="cart-item-remove wishlist-item-remove" data-id="${item.id}" title="حذف"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    // ربط أزرار القلب فـ كل بطاقات المنتجات (index.html و shop.html)
    document.querySelectorAll('.wishlist-btn, .product-detail-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const { id, name, price, img } = btn.dataset;
            if (!id) return;
            toggleWishlistItem({ id, name, price: parseInt(price, 10) || 0, img });
        });
    });

    // فتح/غلق درج المفضلة
    const wishlistToggleBtn = document.getElementById('wishlistToggleBtn');
    const wishlistDrawer = document.getElementById('wishlistDrawer');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');

    function openWishlist() {
        if (!wishlistDrawer || !wishlistOverlay) return;
        closeCart();
        wishlistDrawer.classList.add('active');
        wishlistOverlay.classList.add('active');
        document.body.classList.add('cart-open');
    }

    function closeWishlist() {
        if (!wishlistDrawer || !wishlistOverlay) return;
        wishlistDrawer.classList.remove('active');
        wishlistOverlay.classList.remove('active');
        document.body.classList.remove('cart-open');
    }

    if (wishlistToggleBtn) wishlistToggleBtn.addEventListener('click', openWishlist);
    if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', closeWishlist);
    if (wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlist);

    // أزرار "أضف للسلة" و"حذف" جوا درج المفضلة (event delegation)
    const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
    if (wishlistItemsContainer) {
        wishlistItemsContainer.addEventListener('click', (e) => {
            const moveBtn = e.target.closest('.wishlist-item-move-btn');
            const removeBtn = e.target.closest('.wishlist-item-remove');

            if (moveBtn) {
                const id = moveBtn.dataset.id;
                const item = getWishlist().find(i => i.id === id);
                if (item) {
                    addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
                    removeFromWishlist(id);
                }
            }
            if (removeBtn) removeFromWishlist(removeBtn.dataset.id);
        });
    }

    // عرض المفضلة عند تحميل الصفحة
    renderWishlist();
    syncWishlistButtons();

    // الاستماع لتحديثات المفضلة الجاية من صفحات أخرى (بحال product-detail.js)
    window.addEventListener('wishlistUpdated', () => {
        renderWishlist();
        syncWishlistButtons();
    });

    // ==================== 6. البحث والفلترة (فقط فـ shop.html) ====================
    const productsGrid = document.getElementById('productsGrid');
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const searchInput = document.getElementById('productSearchInput');
    const noResultsMsg = document.getElementById('noResultsMsg');

    if (productsGrid && categoryFiltersEl) {
        const categoryLabels = {
            ar: {
                all: "الكل",
                "Microcontrollers": "متحكمات",
                "IoT Boards": "لوحات IoT",
                "Sensors": "حساسات",
                "Accessories": "إكسسوارات",
                "Drivers": "متحكمات محركات",
                "Motors": "محركات",
                "Displays": "شاشات عرض",
                "Modules": "وحدات",
                "Wireless": "اتصال لاسلكي",
                "Power": "تغذية كهربائية"
            },
            en: {
                all: "All",
                "Microcontrollers": "Microcontrollers",
                "IoT Boards": "IoT Boards",
                "Sensors": "Sensors",
                "Accessories": "Accessories",
                "Drivers": "Drivers",
                "Motors": "Motors",
                "Displays": "Displays",
                "Modules": "Modules",
                "Wireless": "Wireless",
                "Power": "Power"
            }
        };

        const allCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const categories = Array.from(new Set(allCards.map(c => c.dataset.category))).sort();

        // بناء أزرار الفلترة
        categories.forEach(cat => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip';
            chip.dataset.category = cat;
            chip.textContent = categoryLabels[currentLang][cat] || cat;
            categoryFiltersEl.appendChild(chip);
        });

        let activeCategory = 'all';

        function applyFilters() {
            const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
            let visibleCount = 0;

            allCards.forEach(card => {
                const matchesCategory = (activeCategory === 'all') || (card.dataset.category === activeCategory);
                const matchesSearch = !query || card.dataset.name.toLowerCase().includes(query);
                const show = matchesCategory && matchesSearch;
                card.classList.toggle('hidden-by-filter', !show);
                if (show) visibleCount++;
            });

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        categoryFiltersEl.addEventListener('click', (e) => {
            const chip = e.target.closest('.filter-chip');
            if (!chip) return;
            categoryFiltersEl.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.dataset.category;
            applyFilters();
        });

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }

        // إعادة ترجمة أزرار الفلترة كي تبدل اللغة
        window.addEventListener('languageChanged', () => {
            categoryFiltersEl.querySelectorAll('.filter-chip').forEach(chip => {
                const cat = chip.dataset.category;
                chip.textContent = categoryLabels[currentLang][cat] || cat;
            });
        });
    }

    // ==================== نظام التقييمات (Ratings) - نجوم حقيقية + عدد المراجعات ====================
    const RATINGS_KEY = 'arduinoStoreUserRatings';

    function getUserRatings() {
        try {
            return JSON.parse(localStorage.getItem(RATINGS_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveUserRating(productId, value) {
        const ratings = getUserRatings();
        ratings[productId] = value;
        localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    }

    // يحسب متوسط التقييم وعدد المراجعات، ويدمج تقييم المستخدم الحالي (من هاد الجهاز) إذا كاين
    function getRatingStats(product) {
        const baseAvg = product.rating || 4.5;
        const baseCount = product.reviewCount || 0;
        const userRating = getUserRatings()[product.id] || null;

        if (!userRating) {
            return { avg: baseAvg, count: baseCount, userRating: null };
        }

        const totalCount = baseCount + 1;
        const avg = ((baseAvg * baseCount) + userRating) / totalCount;
        return { avg: avg, count: totalCount, userRating: userRating };
    }

    // يبني HTML لنجوم القراءة فقط (نجمة ممتلئة / نصف نجمة / نجمة فارغة)
    function buildStarsHTML(avg) {
        let html = '';
        const rounded = Math.round(avg * 2) / 2;
        for (let i = 1; i <= 5; i++) {
            if (rounded >= i) {
                html += '<i class="fas fa-star"></i>';
            } else if (rounded >= i - 0.5) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }
        return html;
    }

    // نصدرهم للعالم الخارجي باش يستعملهم product-detail.js بلا تكرار للكود
    window.ArduinoRatings = {
        getStats: getRatingStats,
        buildStarsHTML: buildStarsHTML,
        saveRating: saveUserRating
    };

    // نزيد شارة التقييم (نجوم + عدد) فكل كارت منتج فالرئيسية وصفحة المتجر
    function renderCardRatings() {
        if (typeof PRODUCTS_DATA === 'undefined') return;
        document.querySelectorAll('.product-card[data-id]').forEach(card => {
            const product = PRODUCTS_DATA.find(p => p.id === card.dataset.id);
            if (!product) return;

            const stats = getRatingStats(product);
            let ratingEl = card.querySelector('.card-rating');
            if (!ratingEl) {
                const categoryEl = card.querySelector('.product-category');
                if (!categoryEl) return;
                ratingEl = document.createElement('div');
                ratingEl.className = 'card-rating';
                categoryEl.insertAdjacentElement('afterend', ratingEl);
            }
            ratingEl.innerHTML = `<span class="stars-display">${buildStarsHTML(stats.avg)}</span><span class="rating-count">(${stats.count})</span>`;
        });
    }

    renderCardRatings();
    window.addEventListener('languageChanged', renderCardRatings);

    // ==================== Skeleton Loading لصور المنتجات (كروت الرئيسية والمتجر) ====================
    function initCardImageSkeletons() {
        document.querySelectorAll('.card-img-box').forEach(box => {
            const img = box.querySelector('img');
            if (!img || box.dataset.skeletonReady) return;
            box.dataset.skeletonReady = 'true';

            if (img.complete && img.naturalWidth > 0) {
                box.classList.add('img-loaded');
                return;
            }

            box.classList.add('img-skeleton');
            img.addEventListener('load', () => {
                box.classList.remove('img-skeleton');
                box.classList.add('img-loaded');
            });
            img.addEventListener('error', () => {
                box.classList.remove('img-skeleton');
            });
        });
    }

    initCardImageSkeletons();

    // ==================== زر العودة للأعلى (Back to Top) ====================
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== قسم الأسئلة الشائعة (FAQ Accordion) ====================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const wasActive = item.classList.contains('active');

            item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
});