(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        
        // منع التكرار: الحماية من حقن الكود أو الزر أكثر من مرة
        if (!scrollContainer || document.getElementById('trigger-load-more') || document.querySelector('.custom-unique-review')) return;

        // --- إعدادات العرض التدريجي ---
        const totalReviewsCount = 34;
        const perPage = 5; 
        let currentIndex = 0;

        // --- 1. تحديث العدادات ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', totalReviewsCount.toString());
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = `(${totalReviewsCount} تقييم)`;
        }
        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = `${totalReviewsCount} تعليق`;

        // --- 2. البيانات والدوال الذكية (كما وردت في نصك دون تعديل) ---
        const mFirst = ["مقبل", "عكاش", "زيدان", "محيسن", "غنام", "مرزوق", "لافي", "ضويحي", "فلاح", "طراد"];
        const fFirst = ["جوزاء", "هيلة", "مشعة", "وضحى", "قماشة", "نوفا", "سديم", "ترف", "رسيل", "وجد"];
        const lNames = ["الشمري", "الشراري", "العنزي", "الرويلي", "البلوي", "الفضلي", "الظفيري", "المطيري", "السهلي", "السبيعي"];

        const generateSmartComment = () => {
            const starts = ["بكل صراحة", "افضل تجربة", "شغل يشكرون عليه", "سرعة لامتناهية", "متجر متمكن", "تعامل ممتاز", "انصح الجميع", "جودة وسرعة", "ما قصرتوا", "فعلاً ثقة"];
            const middles = ["مشاهدات السناب وصلت بثواني", "التنفيذ كان فوري وسريع", "افضل متجر للمشاهدات", "المشاهدات حقيقية وفورية", "سرعة البرق في مشاهدات السناب", "ضمان جودة وتنفيذ آلي", "الخدمة مميزة وسريعة جدا", "انصح به للي يبي سرعة", "المشاهدات زادت الحساب كثير", "شغل احترافي وسريع"];
            const ends = ["", "", "", "", "", "", "🌟", "", "🚀", ""]; 
            return `${starts[Math.floor(Math.random() * starts.length)]} ${middles[Math.floor(Math.random() * middles.length)]} ${ends[Math.floor(Math.random() * ends.length)]}`;
        };

        const getDynamicTime = () => {
            const timeOptions = ["منذ ساعة", "منذ 5 ساعات", "منذ يوم", "منذ يومين", "منذ أسبوع"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // تجهيز مصفوفة التقييمات (20 نص + 14 نجوم)
        let reviewPool = [];
        for (let i = 0; i < totalReviewsCount; i++) {
            reviewPool.push(i < 20 ? generateSmartComment() : "");
        }
        reviewPool = reviewPool.sort(() => Math.random() - 0.5);

        // تحويل البيانات إلى مصفوفة HTML
        const allReviewsHtml = reviewPool.map((commentText) => {
            const isMale = Math.random() > 0.5;
            const firstName = isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)];
            const lastName = lNames[Math.floor(Math.random() * lNames.length)];
            const fullName = `${firstName} ${lastName}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            
            return `
                <div class="border-b last:border-0 mb-8 pb-8 last:pb-0 border-gray-200 dark:border-white/10 list-block custom-review custom-unique-review">
                    <div class="comment flex text-sm rtl:space-x-reverse space-x-3 text-right" style="direction: rtl;">
                        <div class="flex-none"><img src="${avatar}" alt="${fullName}" class="w-10 h-10 object-cover rounded-full"></div>
                        <div class="flex-1">
                            <div class="flex flex-wrap md:items-center justify-between mb-2 md:mb-0">
                                <div class="flex items-center mb-1">
                                    <h3 class="font-bold text-base rtl:ml-10 ltr:mr-10 fix-align">${fullName}</h3>
                                    <div class="flex">
                                        <i class="sicon-check rounded-full bg-amber-400 h-5 w-5 flex items-center justify-center text-xs" style="background-color: #fbbf24; color: white;"></i>
                                        <span class="fix-align rtl:mr-1 ltr:ml-1 text-sm opacity-80 mt-0.5">قام بالشراء, </span>
                                        <span class="fix-align rtl:mr-1 ltr:ml-1 text-sm opacity-80 mt-0.5">تم التقييم</span>
                                    </div>
                                </div>
                                <p class="opacity-70 text-sm">${getDynamicTime()}</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1">
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`;
        });

        // --- 3. دالة الحقن التدريجي ---
        const loadMoreReviews = () => {
            const nextBatch = allReviewsHtml.slice(currentIndex, currentIndex + perPage);
            nextBatch.forEach(html => scrollContainer.insertAdjacentHTML('beforeend', html));
            currentIndex += perPage;

            if (currentIndex >= allReviewsHtml.length) {
                const wrapper = document.querySelector('.custom-load-more-wrapper');
                if (wrapper) wrapper.style.display = 'none';
            }
        };

        loadMoreReviews();

        // --- 4. إضافة زر "تحميل المزيد" ---
        if (allReviewsHtml.length > perPage) {
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
        }
    };

    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
