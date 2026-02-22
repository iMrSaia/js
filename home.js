// إعادة تحديث الأسعار عند الضغط على زر تغيير العملة
const headerBtn = document.querySelector('.header-buttons button');
if (headerBtn) {
    headerBtn.addEventListener('click', () => {
        setTimeout(() => {
            document.querySelectorAll('.coupon-price-wrapper').forEach(el => el.remove());
            addCouponPrices();
        }, 1200); // ننتظر تحديث العملة بعد الضغط على الزر
    });
}


// تغير نص ازرار الكوبون
function updateDiscountButtons() {
    document.querySelectorAll('.s-button-text').forEach(btn => {

        // تغيير النص بنفس طريقتك
        const label = btn.querySelector('span:first-child');
        if (label && label.textContent.trim() === 'تفاصيل الخصم') {
            label.textContent = 'إضافة للسلة';

            // تغيير الأيقونة لأيقونة cart
            const icon = btn.querySelector('.icon');
            if (icon) {
                icon.className = 'icon sicon-cart'; 
            }
        }
    });
}

window.addEventListener('load', function() {
    updateDiscountButtons();

    // مراقبة عناصر الصفحة
    const observer = new MutationObserver(() => {
        updateDiscountButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});


/*هذا الجديد اضافة الصور للكوبون*/

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

        observer.observe(img, {
            attributes: true,
            attributeFilter: ['src']
        });
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

            // لا نضع src إلا عند الدخول للشاشة
            img.dataset.src = src;

            bgShadow.appendChild(img);

            requestAnimationFrame(() => {
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
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
    }, {
        rootMargin: '150px',
        threshold: 0.1
    });

    const domObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.matches?.('custom-salla-product-card[card-style="coupon"]')) {
                    intersectionObserver.observe(node);
                } else if (node.querySelectorAll) {
                    node
                        .querySelectorAll('custom-salla-product-card[card-style="coupon"]')
                        .forEach(card => intersectionObserver.observe(card));
                }
            });
        });
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    document
        .querySelectorAll('custom-salla-product-card[card-style="coupon"]')
        .forEach(card => intersectionObserver.observe(card));

})();



/* ================================
   انتظار تحميل صورة الكوبون
================================ */
function waitForCouponImageLoaded(card, callback) {
    const img = card.querySelector('.coupon-lazy-img');
    if (!img) return;

    if (img.classList.contains('loaded')) {
        callback();
        return;
    }

    const observer = new MutationObserver(() => {
        if (img.classList.contains('loaded')) {
            observer.disconnect();
            callback();
        }
    });
    observer.observe(img, { attributes: true, attributeFilter: ['class'] });
}

/* ================================
   اضافة العنوان على الكوبون بعد الصورة
================================ */
function initializeCouponTitlesLazy() {
    try {
        const couponAreas = document.querySelectorAll('.coupon-area');
        if (couponAreas.length === 0) return false;

        couponAreas.forEach(couponArea => {
            const card = couponArea.closest('custom-salla-product-card');
            if (!card || card.dataset.titleAdded) return;

            waitForCouponImageLoaded(card, () => {
                card.dataset.titleAdded = "true";

                const bgShadow = couponArea.querySelector('.bg-shadow');
                const couponData = couponArea.querySelector('.coupon__data');
                const couponTitleLink = couponArea.querySelector('.coupon__title');

                if (!bgShadow || !couponData || !couponTitleLink) return;
                if (couponArea.querySelector('.coupon__title-container')) return;

                const titleContainer = document.createElement('div');
                titleContainer.className = 'coupon__title-container coupon-lazy-img';
                titleContainer.innerHTML = `<a class="coupon__title" href="${couponTitleLink.href}">${couponTitleLink.textContent}</a>`;

                bgShadow.parentNode.insertBefore(titleContainer, bgShadow.nextSibling);
                couponData.remove();

                void titleContainer.offsetWidth;
                titleContainer.classList.add('loaded');
            });
        });
    } catch (e) {}
}

/* ================================
   السعر بعد الصورة
================================ */
function getCurrencyFromHeader() {
    const span = document.querySelector('.header-buttons button span:last-child');
    if (!span) return 'ر.س';
    if (span.querySelector('i.sicon-sar')) return 'SAR_ICON';
    return span.textContent.trim() || 'ر.س';
}

function addCouponPricesLazy() {
    document.querySelectorAll("custom-salla-product-card[card-style='coupon']").forEach(card => {
        if (card.dataset.priceAdded) return;

        waitForCouponImageLoaded(card, () => {
            if (card.dataset.priceAdded) return;
            card.dataset.priceAdded = "true";

            if (card.querySelector(".coupon-price-wrapper")) return;

            const productJson = card.getAttribute("product");
            if (!productJson) return;
            const product = JSON.parse(productJson);
            if (!product) return;

            const finalPrice = product.sale_price;
            const originalPrice = product.regular_price;
            const isAvailable = product.is_available && product.quantity !== 0;
            const currency = getCurrencyFromHeader();

            const priceDiv = document.createElement("div");
            priceDiv.className = "coupon-price-wrapper coupon-lazy-img";
            priceDiv.style.display = "flex";
            priceDiv.style.gap = "8px";
            priceDiv.style.alignItems = "center";
			priceDiv.style.justifyContent = "center"; 
            priceDiv.style.flexWrap = "wrap";
            priceDiv.style.overflow = "visible";
            priceDiv.style.marginTop = "5px";
            priceDiv.style.fontWeight = "bold";

            function appendPrice(spanEl, price) {
                if (currency === 'SAR_ICON') {
                    spanEl.textContent = price + ' ';
                    const icon = document.createElement("i");
                    icon.className = "sicon-sar";
                    spanEl.appendChild(icon);
                } else {
                    spanEl.textContent = `${price} ${currency}`;
                }
            }

            if (!isAvailable) {
                const soldOutSpan = document.createElement("span");
                soldOutSpan.textContent = "نفذت الكمية";
                soldOutSpan.style.color = "#f87171";
                soldOutSpan.style.fontSize = "12px";
                priceDiv.appendChild(soldOutSpan);
            } else if (originalPrice === 0) {
                const setPriceSpan = document.createElement("span");
                setPriceSpan.textContent = "الأسعار والكمية بالداخل";
                setPriceSpan.style.color = "#ffffff";
                setPriceSpan.style.fontSize = "10px";
                priceDiv.appendChild(setPriceSpan);
            } else if (finalPrice > 0 && finalPrice < originalPrice) {
                const beforeSpan = document.createElement("span");
                beforeSpan.style.opacity = "0.6";
                beforeSpan.style.textDecoration = "line-through";
                beforeSpan.style.whiteSpace = "nowrap";
                beforeSpan.style.fontSize = "14px";
                appendPrice(beforeSpan, originalPrice);
                priceDiv.appendChild(beforeSpan);

                const finalSpan = document.createElement("span");
                finalSpan.style.color = "#f87171";
                finalSpan.style.whiteSpace = "nowrap";
                finalSpan.style.fontSize = "14px";
                appendPrice(finalSpan, finalPrice);
                priceDiv.appendChild(finalSpan);
            } else {
                const baseSpan = document.createElement("span");
                baseSpan.style.whiteSpace = "nowrap";
                baseSpan.style.fontSize = "14px";
                appendPrice(baseSpan, originalPrice);
                priceDiv.appendChild(baseSpan);
            }

            const titleContainer = card.querySelector(".coupon__title-container") || card.querySelector(".coupon__title");
            (titleContainer || card).after(priceDiv);

            void priceDiv.offsetWidth;
            priceDiv.classList.add('loaded');
        });
    });
}

/* ================================
   العنوان الترويجي بعد الصورة
================================ */
function addPromotionsLazy() {
    document.querySelectorAll('custom-salla-product-card').forEach(card => {
        if (card.dataset.promoAdded) return;

        waitForCouponImageLoaded(card, () => {
            if (card.dataset.promoAdded) return;
            card.dataset.promoAdded = "true";

            try {
                const product = JSON.parse(card.getAttribute('product'));
                const promoTitle = product.promotion_title;
                if (!promoTitle) return;

                const priceWrapper = card.querySelector('.coupon-price-wrapper');
                if (!priceWrapper) return;

                const promoEl = document.createElement('div');
                promoEl.className = 'promo-text coupon-lazy-img';
                promoEl.textContent = promoTitle;
                priceWrapper.parentNode.insertBefore(promoEl, priceWrapper);

                void promoEl.offsetWidth;
                promoEl.classList.add('loaded');
            } catch(e) {}
        });
    });
}

/* ================================
   تشغيل جميع العناصر
================================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeCouponTitlesLazy();
    addCouponPricesLazy();
    addPromotionsLazy();

    new MutationObserver(() => {
        initializeCouponTitlesLazy();
        addCouponPricesLazy();
        addPromotionsLazy();
    }).observe(document.body, { childList: true, subtree: true });
});



/*اضافة منتج الكوبون للسلة*/
(function() {
  'use strict';
  
  function initButtonConversion() {
    const cards = document.querySelectorAll('custom-salla-product-card[id]');
    
    cards.forEach(card => {
      const productId = card.id;
      if (!productId) return;
      
      const sallaButton = card.querySelector('salla-button');
      if (!sallaButton) return;

      // إضافة كلاس بدل style
      sallaButton.classList.add('force-pointer');
      
      const link = sallaButton.querySelector('a');
      if (link) {
        link.removeAttribute('href');
      }
      
      sallaButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        addProductToCart(productId);
      });
    });
  }
  
  function addProductToCart(productId) {
    if (window.Salla?.cart?.addItem) {
      Salla.cart.addItem(productId, 1);
      return;
    }
    
    fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity: 1 })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) window.location.reload();
    });
  }

  setTimeout(initButtonConversion, 1500);
})();



/*لمن تضغط على الصورة يفتح المنتج*/
document.addEventListener("DOMContentLoaded", function() {
    function linkCouponImages() {
        document.querySelectorAll('.coupon__title').forEach(title => {
            const url = title.href;
            const card = title.closest('custom-salla-product-card');

            if (card) {
                const imgDiv = card.querySelector('.bg-shadow img');
                if (imgDiv) {
                    imgDiv.style.cursor = "pointer";
                    imgDiv.onclick = () => window.location.href = url;
                }
            }
        });
    }

    linkCouponImages(); // نفّذ عند تحميل الصفحة

    // مراقبة التغييرات لو ظهر كوبونات جديدة بعد التحميل
    const observer = new MutationObserver(() => {
        linkCouponImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});


/*حذف اضافة للسلة وبعدا يضيف نفذت الكمية*/
function updateSoldOutButton(card) {
    const product = card.product;
    if (!product) return;

    const isAvailable = product.is_available && product.quantity !== 0;

    const btn = card.querySelector("salla-add-product-button");
    const btnContainer = btn?.parentElement;

    if (!isAvailable) {
        if (btn) btn.remove();

        if (btnContainer && !btnContainer.querySelector(".sold-out-btn")) {
            const sold = document.createElement("div");
            sold.className = "sold-out-btn";
            sold.textContent = "نفذت الكمية";
            btnContainer.appendChild(sold);
        }
    } else {
        const sold = btnContainer?.querySelector(".sold-out-btn");
        if (sold) sold.remove();
    }
}

// تحديث كل العناصر الحالية
document.querySelectorAll("custom-salla-product-card").forEach(updateSoldOutButton);

// المراقبة فقط داخل حاوية المنتجات
const container = document.querySelector(".product-index"); // عدّل حسب مكان المنتجات
if (container) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.matches("custom-salla-product-card")) {
                    updateSoldOutButton(node);
                }
            });
        });
    });

    observer.observe(container, { childList: true, subtree: true });
}
