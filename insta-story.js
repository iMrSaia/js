(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. دالة توليد الوقت المنوع ---
        const getDynamicTime = () => {
            const timeOptions = [
                "منذ ساعة", "منذ 3 ساعات", "منذ 5 ساعات", "منذ 10 ساعات",
                "منذ يوم", "منذ يومين"
            ];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات (13 تقييم) ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '13');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(13 تقييم)";
        }

        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = "13 تعليق";

        // --- 3. البيانات الجديدة (10 تعليقات مخصصة للسرعة والتنفيذ) ---
        const comments = [
            "ما كملت دقيقة إلا والطلب مخلص، سرعة خرافية ⚡",
            "تنفيذ فوري بمعنى الكلمة، أشكركم",
            "أسرع خدمة جربتها في المتجر، دايماً تبيضون الوجه",
            "بمجرد ما دفعت بدأ التنفيذ، مصداقية 100%",
            "شغل سريع ومرتب، الله يبارك لكم",
            "كنت محتاج تنفيذ سريع وما قصرتوا والله",
            "جودة وسرعة لا يعلى عليها، أنصح بالتعامل معهم",
            "افضل متجر من ناحية سرعة الانجاز"،
            "دائماً مبدعين وسريعون في كل شي",
            "خدمة توب التوب والتنفيذ بلمح البصر"
        ];

        // أسماء جديدة ومختلفة تماماً (مزيج حديث)
        const mFirst = ["سيف", "نواف", "عزام", "مشاري", "رائد", "أنس", "زياد", "إياد"];
        const fFirst = ["ليان", "تولين", "ديمة", "ريتاج", "كيان", "غنى", "لينا", "جوري"];
        const lNames = ["المالكي", "الخالدي", "الرويلي", "الرشيدي", "السعدي", "البارقي", "الصهيبي", "الجهني"];

        // تجهيز التوزيع (10 نص + 3 نجوم = 13 إجمالي)
        let reviewPool = [];
        for (let i = 0; i < 13; i++) {
            reviewPool.push(i < 10 ? comments[i % comments.length] : "");
        }
        reviewPool = reviewPool.sort(() => Math.random() - 0.5);

        // --- 4. حقن التقييمات ---
        reviewPool.forEach((commentText) => {
            const isMale = Math.random() > 0.5;
            const fullName = `${isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)]} ${lNames[Math.floor(Math.random() * lNames.length)]}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            
            const reviewHtml = `
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
                </div>`;
            scrollContainer.insertAdjacentHTML('beforeend', reviewHtml);
        });
    };

    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
