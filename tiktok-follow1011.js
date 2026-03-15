(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- إعدادات العرض التدريجي ---
        const totalReviewsCount = 920; // العدد المطلوب
        const perPage = 5; 
        let currentIndex = 0;

        // --- 1. دالة توليد الوقت المنوع ---
        const getDynamicTime = () => {
            const timeOptions = ["منذ ساعة", "منذ 3 ساعات", "منذ 12 ساعة", "منذ يوم", "منذ يومين", "منذ أسبوع"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', totalReviewsCount.toString());
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = `(${totalReviewsCount} تقييم)`;
        }
        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = `${totalReviewsCount} تعليق`;

        // --- 3. البيانات والأسماء ---
        const comments = [
            "المتابعين وصلوا بسرعة خرافية ⚡", "جودة الحسابات ممتازة صراحة", "أفضل متجر متابعين بلا منازع", "سعر بطل وتنفيذ فوري", "المتابعين حقيقيين ورفعوا التفاعل", "شكراً سايا ستور على المصداقية", "تجاوب سريع جداً ما شاء الله", "مو أول مرة أطلب ولا رح تكون الأخيرة", "متابعين ثابتين ولا نقصوا أبداً", "خدمة تبيض الوجه وسعر مناسب",
            "انصحكم فيه للي يبي حسابه يطير", "سرعة تنفيذ لا توصف", "الطلب اكتمل في أقل من دقيقة", "جودة رهيبة وثبات عالي", "شغل احترافي ومرتب", "الله يبارك لكم في رزقكم خدمة بطلة", "المتجر المفضل عندي دائماً", "دعم فني متعاون وسريع", "كل شي تمام والعدد وصل كامل وزيادة", "أفضل تجربة شراء متابعين"
        ];

        const mFirst = ["سلطان", "مشاري", "عزام", "نواف", "طلال", "بدر", "تركي", "باسل", "أيمن", "قصي", "هاني", "جمال", "رائد", "ساهر", "سامي", "وضاح"];
        const fFirst = ["ليان", "جود", "ريناد", "تولين", "غيداء", "نجود", "شوق", "لمى", "رهف", "دانية", "يارا", "لين", "هتون", "عبير", "مها", "رنا"];
        const lNames = ["المالكي", "الشهري", "الغزواني", "الأحمري", "الفيفي", "العسيري", "القرني", "اليامي", "الشهراني", "البارقي", "الزهراني", "الغامدي", "الهذلي", "العتيبي", "الثبيتي"];

        // تجهيز المصفوفة (تكرار التعليقات لتغطية العدد)
        let allReviewsHtml = [];
        for (let i = 0; i < totalReviewsCount; i++) {
            const isMale = Math.random() > 0.5;
            const fullName = `${isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)]} ${lNames[Math.floor(Math.random() * lNames.length)]}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            const commentText = i < 850 ? comments[i % comments.length] : ""; // تعليقات لأغلب الحسابات

            allReviewsHtml.push(`
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
                                <p class="opacity-70 text-sm">${getDynamicTime()}</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1" style="color: #fbbf24;">
                                    <i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`);
        }

        // خلط التقييمات عشوائياً
        allReviewsHtml = allReviewsHtml.sort(() => Math.random() - 0.5);

        // --- 4. دالة الحقن التدريجي ---
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

        // --- 5. إضافة زر "تحميل المزيد" ---
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
                }, 700);
            });
        }
    };

    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
