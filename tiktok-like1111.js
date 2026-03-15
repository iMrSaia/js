(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        // منع التكرار: التأكد من عدم وجود الزر أو التعليقات مسبقاً
        if (!scrollContainer || document.querySelector('.custom-unique-review') || document.getElementById('trigger-load-more')) return;

        // --- الإعدادات ---
        const totalReviewsCount = 872;
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

        // --- 2. البيانات (نفس بياناتك الأصلية) ---
        const mFirst = ["مؤيد", "عادل", "أمين", "هادي", "عارف", "بليغ", "توفيق", "شريف", "صبري", "مراد", "ادريس", "نزار", "هاشم", "بشار", "راضي", "مخلص", "وجدي", "وفيق", "نضال", "صادق", "زهير", "نشوان", "سامر", "فادي", "غيث"];
        const fFirst = ["سمية", "نهى", "وئام", "روان", "ميس", "رشا", "يسرى", "هبة", "صفاء", "وئام", "سحر", "ميرفت", "نسرين", "ولاء", "بسمة", "سماح", "أماني", "تهاني", "نجوى", "فوزية", "سوزان", "ميسون", "نيرمين", "ليلى", "بسمة"];
        const lNames = ["العبيدي", "السقاف", "باعشن", "العمودي", "الجيلاني", "الكاف", "بن لادن", "بخاري", "هوساوي", "المنصوري", "البارقي", "النيادي", "الشامسي", "الفلاسي", "المزروعي", "الحوسني", "الظاهري", "الخياري", "الكعبي", "الراشدي", "المرزوقي", "الهاشمي", "التميمي", "المحمادي", "الكناني"];

        const generateSmartComment = () => {
            const starts = ["بصراحة", "والله", "تجربة", "متجر", "خدمة", "أهنيكم", "ما شاء الله", "أطلق", "ثقة", "يا جماعة"];
            const middles = ["اللايكات وصلت سريعة", "التنفيذ فوري ومضمون", "الجودة توب ومافي نقص", "أفضل متجر لايكات تيك توك", "اللايكات حقيقية وسريعة", "انصحكم فيه بقوة", "سرعة البرق في اللايكات", "ضمان حقيقي ولا نقصت حبة", "الخدمة ناررر والتنفيذ سريع", "كل شي تمام واللايكات فورية"];
            const ends = ["🔥", "👍", "✨", "💯", "✅", "🚀", "🔝", "😎", "👏", ""];
            return `${starts[Math.floor(Math.random() * starts.length)]} ${middles[Math.floor(Math.random() * middles.length)]} ${ends[Math.floor(Math.random() * ends.length)]}`;
        };

        const getDynamicTime = () => {
            const timeOptions = ["منذ ساعة", "منذ 5 ساعات", "منذ يوم", "منذ يومين", "منذ أسبوع", "منذ شهر"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 3. توليد التعليقات بالهيكل الجديد (مطابق للصورة) ---
        let allReviewsHtml = [];
        for (let i = 0; i < totalReviewsCount; i++) {
            const isMale = Math.random() > 0.5;
            const firstName = isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)];
            const lastName = lNames[Math.floor(Math.random() * lNames.length)];
            const fullName = `${firstName} ${lastName}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            const commentText = i < 700 ? generateSmartComment() : "";
            
            const html = `
                <div class="border-b last:border-0 mb-8 pb-8 last:pb-0 border-gray-200 dark:border-white/10 list-block custom-review custom-unique-review">
                    <div class="comment flex text-sm rtl:space-x-reverse space-x-3 text-right" style="direction: rtl;">
                        <div class="flex-none">
                            <img src="${avatar}" alt="${fullName}" class="w-10 h-10 object-cover rounded-full">
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <h3 class="font-bold text-base fix-align">${fullName}</h3>
                                    <p class="opacity-70 text-xs mb-1">${getDynamicTime()}</p>
                                    <div class="comment__rating text-xs mb-1" style="color: #fbbf24;">
                                        <i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <span class="fix-align text-xs opacity-80" style="margin-left: 5px;">قام بالشراء، تم التقييم</span>
                                    <i class="sicon-check rounded-full bg-amber-400 h-5 w-5 flex items-center justify-center text-xs" style="background-color: #fbbf24; color: #fff; width: 18px; height: 18px; display: inline-flex;"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70 mt-2"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`;
            allReviewsHtml.push(html);
        }

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
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const loader = document.getElementById('custom-loader');
                const btnText = btn.querySelector('.s-button-text');
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
