/* ============================================================
   home.js - النسخة المتكاملة (الحفاظ على الدوال الأصلية + التعديلات)
   ============================================================ */

// 1. إعادة تحديث الأسعار عند الضغط على زر تغيير العملة
const headerBtn = document.querySelector('.header-buttons button');
if (headerBtn) {
    headerBtn.addEventListener('click', () => {
        setTimeout(() => {
            document.querySelectorAll('.coupon-price-wrapper').forEach(el => el.remove());
            // إعادة تصفير الـ dataset للسماح للدالة بالعمل مجدداً
            document.querySelectorAll("custom-salla-product-card").forEach(c => delete c.dataset.priceAdded);
            addCouponPricesLazy();
        }, 1200);
    });
}

// 2. تغير نص ازرار الكوبون (دالة أصلية)
function updateDiscountButtons() {
    document.querySelectorAll('.s-button-text').forEach(btn => {
        const label = btn.querySelector('span:first-child');
        if (label && (label.textContent.trim() === 'تفاصيل الخصم' || label.textContent.trim() === 'إضافة للسلة')) {
            label.textContent = 'إضافة للسلة';
            const icon = btn.querySelector('.icon');
            if (icon) {
                icon.className = 'icon sicon-cart'; 
            }
        }
    });
}

/* ================================
   دوال معالجة الصور (الجديدة)
================================ */
(function () {
    function waitForImageSrc(img, callback) {
        if (img.src && img.src.includes('http')) {
            callback(img.src);
            return;
        }
        const observer = new MutationObserver(() => {
            if (img.src && img.src.includes('http')) {
                observer.disconnect();
                callback(img.src);
            }
        });
        observer.observe(img, { attributes: true, attributeFilter: ['src'] });
    }

    function addLazyImage(card) {
        const bgShadow = card.querySelector('.coupon-area .bg-shadow');
        if (!bgShadow || bgShadow.querySelector('img')) return;

        const productImg = card.querySelector('img');
        if (!productImg) return;

        waitForImageSrc(productImg, (src) => {
            if (bgShadow.querySelector('img')) return;
            const img = document.createElement('img');
            img.className = 'coupon-lazy-img';
            img.alt = productImg.alt || 'Product Image';
            img.loading = 'lazy';
            img.dataset.src = src;
            bgShadow.appendChild(img);

            requestAnimationFrame(() => {
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
            });
        });
    }

    const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addLazyImage(entry.target);
                intersectionObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '150px', threshold: 0.1 });

    const domObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.matches?.('custom-salla-product-card[card-style="coupon"]')) {
                        intersectionObserver.observe(node);
                    } else {
                        node.querySelectorAll?.('custom-salla-product-card[card-style="coupon"]')
                            .forEach(card => intersectionObserver.observe(card));
                    }
                }
            });
        });
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('custom-salla-product-card[card-style="coupon"]')
            .forEach(card => intersectionObserver.observe(card));
})();

/* ================================
   دوال العناوين والأسعار والترويج
================================ */
function waitForCouponImageLoaded(card, callback) {
    const img = card.querySelector('.coupon-lazy-img');
    if (!img) return;
    if (img.classList.contains('loaded')) { callback(); return; }
    const observer = new MutationObserver(() => {
        if (img.classList.contains('loaded')) { observer.disconnect(); callback(); }
    });
    observer.observe(img, { attributes: true, attributeFilter: ['class'] });
}

function initializeCouponTitlesLazy() {
    document.querySelectorAll('.coupon-area').forEach(couponArea => {
        const card = couponArea.closest('custom-salla-product-card');
        if (!card || card.dataset.titleAdded) return;

        waitForCouponImageLoaded(card, () => {
            card.dataset.titleAdded = "true";
            const bgShadow = couponArea.querySelector('.bg-shadow');
            const couponData = couponArea.querySelector('.coupon__data');
            const couponTitleLink = couponArea.querySelector('.coupon__title');

            if (!bgShadow || !couponTitleLink) return;
            if (couponArea.querySelector('.coupon__title-container')) return;

            const titleContainer = document.createElement('div');
            titleContainer.className = 'coupon__title-container loaded';
            titleContainer.style.textAlign = "center";
            titleContainer.innerHTML = `<a class="coupon__title" style="font-weight:bold; display:block; margin:5px 0;" href="${couponTitleLink.href}">${couponTitleLink.textContent}</a>`;

            bgShadow.parentNode.insertBefore(titleContainer, bgShadow.nextSibling);
            if (couponData) couponData.remove();
        });
    });
}

function getCurrencyFromHeader() {
    const span = document.querySelector('.header-buttons button span:last-child');
    if (!span) return 'ر.س';
    if (span.querySelector('i.sicon-sar') || span.textContent.includes('SAR')) return 'ر.س';
    return span.textContent.trim() || 'ر.س';
}

function addCouponPricesLazy() {
    document.querySelectorAll("custom-salla-product-card[card-style='coupon']").forEach(card => {
        if (card.dataset.priceAdded) return;

        waitForCouponImageLoaded(card, () => {
            if (card.dataset.priceAdded) return;
            card.dataset.priceAdded = "true";

            const productJson = card.getAttribute("product");
            if (!productJson) return;
            const product = JSON.parse(productJson);
            const currency = getCurrencyFromHeader();

            const priceDiv = document.createElement("div");
            priceDiv.className = "coupon-price-wrapper loaded";
            priceDiv.style.cssText = "display:flex; gap:8px; justify-content:center; align-items:center; margin-top:5px; font-weight:bold;";

            if (!product.is_available || product.quantity === 0) {
                priceDiv.innerHTML = `<span style="color:#f87171; font-size:12px;">نفذت الكمية</span>`;
            } else {
                if (product.sale_price < product.regular_price && product.sale_price > 0) {
                    priceDiv.innerHTML = `
                        <span style="opacity:0.6; text-decoration:line-through; font-size:13px;">${product.regular_price} ${currency}</span>
                        <span style="color:#f87171; font-size:14px;">${product.sale_price} ${currency}</span>`;
                } else {
                    priceDiv.innerHTML = `<span>${product.regular_price} ${currency}</span>`;
                }
            }

            const anchor = card.querySelector(".coupon__title-container") || card.querySelector(".coupon__title");
            if (anchor) anchor.after(priceDiv);
        });
    });
}

function addPromotionsLazy() {
    document.querySelectorAll('custom-salla-product-card').forEach(card => {
        if (card.dataset.promoAdded) return;
        waitForCouponImageLoaded(card, () => {
            if (card.dataset.promoAdded) return;
            try {
                const product = JSON.parse(card.getAttribute('product'));
                if (!product.promotion_title) return;
                card.dataset.promoAdded = "true";

                const priceWrapper = card.querySelector('.coupon-price-wrapper');
                const promoEl = document.createElement('div');
                promoEl.className = 'promo-text loaded';
                promoEl.style.cssText = "font-size:11px; color:#38bdf8; text-align:center;";
                promoEl.textContent = product.promotion_title;

                if (priceWrapper) priceWrapper.before(promoEl);
            } catch(e) {}
        });
    });
}

// 3. دالة إضافة منتج الكوبون للسلة (دالة أصلية)
function initButtonConversion() {
    document.querySelectorAll('custom-salla-product-card').forEach(card => {
        const productData = JSON.parse(card.getAttribute('product') || '{}');
        const productId = productData.id || card.id;
        const sallaButton = card.querySelector('salla-button');
        
        if (sallaButton && !sallaButton.dataset.bound) {
            sallaButton.dataset.bound = "true";
            sallaButton.style.cursor = "pointer";
            sallaButton.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                if (window.Salla?.cart?.addItem) {
                    Salla.cart.addItem(productId, 1);
                } else {
                    fetch('/cart/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ product_id: productId, quantity: 1 })
                    }).then(r => r.json()).then(data => { if (data.success) window.location.reload(); });
                }
            });
        }
    });
}

// 4. لمن تضغط على الصورة يفتح المنتج (دالة أصلية)
function linkCouponImages() {
    document.querySelectorAll('.coupon__title').forEach(title => {
        const card = title.closest('custom-salla-product-card');
        if (card) {
            const img = card.querySelector('.bg-shadow img');
            if (img) {
                img.style.cursor = "pointer";
                img.onclick = () => window.location.href = title.href;
            }
        }
    });
}

// 5. تحديث حالة "نفذت الكمية" (دالة أصلية)
function updateSoldOutButton(card) {
    try {
        const product = JSON.parse(card.getAttribute('product'));
        if (!product) return;
        const isAvailable = product.is_available && product.quantity !== 0;
        const btn = card.querySelector("salla-add-product-button");
        if (!isAvailable && btn) {
            const container = btn.parentElement;
            btn.remove();
            if (container && !container.querySelector(".sold-out-btn")) {
                const sold = document.createElement("div");
                sold.className = "sold-out-btn";
                sold.style.cssText = "background:#eee; color:#999; padding:8px; text-align:center; border-radius:5px;";
                sold.textContent = "نفذت الكمية";
                container.appendChild(sold);
            }
        }
    } catch(e){}
}

/* ================================
   التشغيل والمراقبة النهائية
================================ */
function runAll() {
    updateDiscountButtons();
    initializeCouponTitlesLazy();
    addCouponPricesLazy();
    addPromotionsLazy();
    initButtonConversion();
    linkCouponImages();
    document.querySelectorAll("custom-salla-product-card").forEach(updateSoldOutButton);
}

// التشغيل عند التحميل
window.addEventListener('load', runAll);
document.addEventListener('DOMContentLoaded', runAll);

// مراقب التغييرات (لضمان العمل عند التنقل SPA والدخول العادي)
const globalObserver = new MutationObserver(() => {
    runAll();
});
globalObserver.observe(document.body, { childList: true, subtree: true });

// تشغيل فوري احتياطي
setTimeout(runAll, 1500);
