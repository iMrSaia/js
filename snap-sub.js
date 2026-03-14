(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. العدادات (29 تقييم) ---
        const totalReviews = 29;
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', totalReviews.toString());
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = `(${totalReviews} تقييم)`;
        }
        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = `${totalReviews} تعليق`;

        // --- 2. أسماء وعوائل جديدة كلياً (لم تُستخدم في أي خدمة سابقة) ---
        const mFirst = ["هاجد", "معيض", "مشاري", "فاروق", "غازي", "سعيد", "صخر", "حميد", "عاصم", "ناجح"];
        const fFirst = ["عنود", "هتون", "مي", "وسن", "غيداء", "نجود", "شوق", "لمى", "رهف", "دانية"];
        const lNames = ["الخالدي", "الرويلي", "السعدي", "الغامدي", "الهذلي", "العتيبي", "الثبيتي", "البارقي", "الصهيبي", "الجهني"];

        // --- 3. دالة توليد تعليق ذكي (مشتركين سناب - بدون تكرار) ---
        const generateSmartComment = () => {
            const starts = ["تجربة مميزة", "خدمة ولا أروع", "بيض الله وجيهكم", "أهنيكم على المصداقية", "متجر جبار", "سريع جداً", "بكل صراحة", "خدمة متميزة", "شغل احترافي", "انصح فيهم"];
            const middles = ["المشتركين عرب وحقيقيين", "تنفيذ مشتركين السناب سريع", "بدون أي نقص يذكر", "أفضل متجر للمشتركين", "وصلوا بلمح البصر", "ضمان حقيقي وسرعة خرافية", "الخدمة توب التوب", "مشتركين عرب وسرعة تنفيذ", "ما كملت دقايق إلا والطلب جاهز", "جودة المشتركين ممتازة"];
            // إيموجيات جديدة (✨، 💎) لم تُستخدم سابقاً ومحدودة جداً
            const ends = ["", "", "", "", "", "", "", "✨", "💎", ""]; 
            
            return `${starts[Math.floor(Math.random() * starts.length)]} ${middles[Math.floor(Math.random() * middles.length)]} ${ends[Math.floor(Math.random() * ends.length)]}`;
        };

        const getDynamicTime = () => {
            const timeOptions = ["منذ ساعة", "منذ 12 ساعة", "منذ يوم", "منذ يومين"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 4. حقن التقييمات (20 نص و 9 نجوم) ---
        let reviewPool = [];
        for (let i = 0; i < totalReviews; i++) {
            reviewPool.push(i < 20 ? generateSmartComment() : "");
        }
        // خلط عشوائي لتوزيع النجوم بين التعليقات
        reviewPool = reviewPool.sort(() => Math.random() - 0.5);

        reviewPool.forEach((commentText) => {
            const isMale = Math.random() > 0.5;
            const firstName = isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)];
            const lastName = lNames[Math.floor(Math.random() * lNames.length)];
            const fullName = `${firstName} ${lastName}`;
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
