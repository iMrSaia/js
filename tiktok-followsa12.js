(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. الإعدادات ---
        const totalReviewsCount = 1232;
        const perPage = 5; 
        let currentIndex = 0;

        // تحديث العدادات العلوية
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', totalReviewsCount.toString());
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = `(${totalReviewsCount} تقييم)`;
        }
        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = `${totalReviewsCount} تعليق`;

        // --- 2. قوائم البيانات ---
        const mFirst = ["خالد", "عبدالله", "فهد", "سلطان", "فيصل", "محمد", "سعد", "ماجد", "بدر", "تركي", "سلمان", "راكان", "مشعل", "طلال", "بندر", "نواف", "ثامر", "زياد", "سعود", "وليد", "ياسر", "أحمد", "إبراهيم", "يوسف", "علي", "عمر", "صالح", "عبدالعزيز", "مشاري", "متعب", "باسل", "راشد", "فارس", "سامي", "رائد", "منير", "عصام", "وائل", "لؤي", "بسام", "نايف", "حماد", "منصور", "سطام", "خليل", "ناصر", "ياسين", "طه"];
        const fFirst = ["نورة", "سارة", "أمل", "مرام", "هيفاء", "ريم", "العنود", "ليلى", "نجلاء", "غادة", "رهف", "هند", "شروق", "نوف", "مشاعل", "أريج", "لطيفة", "موضي", "دلال", "منى", "خلود", "منيرة", "عبير", "أسماء", "فاطمة", "مريم", "عائشة", "تهاني", "نجود", "جواهر", "بدور", "شوق", "حصة", "سحر", "أحلام", "بشاير", "نادية", "مها", "رنا", "ليان", "جود", "تولين", "ديمة", "ريتاج"];
        const lNames = ["العتيبي", "القحطاني", "الزهراني", "الغامدي", "الحربي", "الشمري", "الدوسري", "المطيري", "الرشيدي", "السبيعي", "الشهري", "عسيري", "المالكي", "العنزي", "الرويلي", "الشهراني", "التميمي", "البقمي", "السهلي", "الخالدي", "الفضلي", "المرهون", "الحازمي", "القرني", "اليامي", "الثبيتي", "السلمي", "الجحدلي", "الصعيدي", "النفيعي", "الصلبي", "الشراري", "البلوي", "العمري", "الأسمري", "الاحمري", "الصبحي", "الذبياني", "اللحياني", "الحويطي", "الشرقي", "المري", "الهاجري", "السعدي"];

        const comments = [
            "ما شاء الله المتابعين وصلوا سريع 🔥", "أطلق متجر خدمة احترافية", "والله انكم كفو التنفيذ فوري فعلاً", "افضل خدمة والجودة ممتازة ومافي نقص", "تجربة بطلة المصداقية عندكم عالية", "شغل مرتب وسعر بطل وانجاز سريع", "ثقة وأمانة المتابعين ثابتين من فترة", "رهيبين الخدمة توب التوب", "انصحكم فيه افضل متجر تعاملت معه", "خدمة احترافية وتطور حسابي بفضلكم", "سرعة البرق في التنفيذ ✅", "كل شي تمام والتنفيذ آلي", "أفضل متجر لرفع الحساب", "الجودة ممتازة ومافي نقص", "حركة الاكسبلور سريعة جدا 🔥"
        ];

        // --- 3. دالة بناء HTML (تُستدعى لحظياً) ---
        const buildReviewHtml = () => {
            const isMale = Math.random() > 0.5;
            const fullName = `${isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)]} ${lNames[Math.floor(Math.random() * lNames.length)]}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            const commentText = currentIndex < 1100 ? comments[Math.floor(Math.random() * comments.length)] : "";

            return `
                <div class="border-b last:border-0 mb-8 pb-8 last:pb-0 border-gray-200 dark:border-white/10 list-block custom-review custom-unique-review">
                    <div class="comment flex text-sm rtl:space-x-reverse space-x-3 text-right" style="direction: rtl;">
                        <div class="flex-none"><img src="${avatar}" alt="${fullName}" class="w-10 h-10 object-cover rounded-full"></div>
                        <div class="flex-1">
                            <div class="flex flex-wrap md:items-center justify-between mb-2 md:mb-0">
                                <div class="flex items-center mb-1">
                                    <h3 class="font-bold text-base rtl:ml-10 ltr:mr-10 fix-align" style="margin-left: 10px;">${fullName}</h3>
                                    <div class="flex items-center">
                                        <i class="sicon-check rounded-full bg-amber-400 h-5 w-5 flex items-center justify-center text-xs" style="background-color: #fbbf24; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; margin-left: 5px;"></i>
                                        <span class="fix-align text-sm opacity-80">قام بالشراء</span>
                                    </div>
                                </div>
                                <p class="opacity-70 text-sm">منذ ساعات</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1" style="color: #fbbf24;">
                                    <i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`;
        };

        // --- 4. دالة الحقن التدريجي ---
        const loadMoreReviews = () => {
            let batchHtml = "";
            for (let i = 0; i < perPage; i++) {
                if (currentIndex < totalReviewsCount) {
                    batchHtml += buildReviewHtml();
                    currentIndex++;
                }
            }
            scrollContainer.insertAdjacentHTML('beforeend', batchHtml);

            if (currentIndex >= totalReviewsCount) {
                const wrapper = document.querySelector('.custom-load-more-wrapper');
                if (wrapper) wrapper.style.display = 'none';
            }
        };

        // حقن أول 5
        loadMoreReviews();

        // --- 5. الزر واللودر ---
        const wrapper = document.createElement('div');
        wrapper.className = "s-infinite-scroll-wrapper custom-load-more-wrapper";
        wrapper.innerHTML = `
            <a href="javascript:void(0)" class="s-infinite-scroll-btn s-button-btn s-button-primary" id="trigger-load-more">
                <span class="s-button-text s-infinite-scroll-btn-text">تحميل المزيد</span>
                <span class="s-button-loader s-button-loader-center s-infinite-scroll-btn-loader" id="custom-loader" style="display: none"></span>
            </a>`;
        
        scrollContainer.after(wrapper);
        const btn = document.getElementById('trigger-load-more');
        const loader = document.getElementById('custom-loader');
        const btnText = btn.querySelector('.s-button-text');

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            setTimeout(() => {
                loadMoreReviews();
                btnText.style.display = 'inline-block';
                loader.style.display = 'none';
            }, 800);
        });
    };

    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
