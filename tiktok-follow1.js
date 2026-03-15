(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        // التأكد من وجود الحاوية وعدم تكرار الحقن
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. الإعدادات ---
        const totalReviewsCount = 1232;
        const perPage = 5; 
        let currentIndex = 0;

        // تحديث العدادات العلوية فوراً
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', totalReviewsCount.toString());
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = `(${totalReviewsCount} تقييم)`;
        }
        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = `${totalReviewsCount} تعليق`;

        // --- 2. البيانات (الأسماء والقوائم) ---
        const mFirst = ["خالد", "عبدالله", "فهد", "سلطان", "فيصل", "محمد", "سعد", "ماجد", "بدر", "تركي", "سلمان", "راكان", "مشعل", "طلال", "بندر", "نواف", "ثامر", "زياد", "سعود", "وليد", "ياسر", "أحمد", "إبراهيم", "يوسف", "علي", "عمر", "صالح", "عبدالعزيز", "مشاري", "متعب", "باسل", "راشد", "فارس", "سامي", "رائد", "منير", "عصام", "وائل", "لؤي", "بسام", "نايف", "حماد", "منصور", "سطام", "خليل", "ناصر", "ياسين", "طه", "ساهر", "جمال"];
        const fFirst = ["نورة", "سارة", "أمل", "مرام", "هيفاء", "ريم", "العنود", "ليلى", "نجلاء", "غادة", "رهف", "هند", "شروق", "نوف", "مشاعل", "أريج", "لطيفة", "موضي", "دلال", "منى", "خلود", "منيرة", "عبير", "أسماء", "فاطمة", "مريم", "عائشة", "تهاني", "نجود", "جواهر", "بدور", "شوق", "حصة", "سحر", "أحلام", "بشاير", "نادية", "مها", "رنا", "ليان", "جود", "تولين", "ديمة", "ريتاج", "كيان", "غنى", "وسن", "ليال", "جنى", "لينا"];
        const lNames = ["العتيبي", "القحطاني", "الزهراني", "الغامدي", "الحربي", "الشمري", "الدوسري", "المطيري", "الرشيدي", "السبيعي", "الشهري", "عسيري", "المالكي", "العنزي", "الرويلي", "الشهراني", "التميمي", "البقمي", "السهلي", "الخالدي", "الفضلي", "المرهون", "الحازمي", "القرني", "اليامي", "الثبيتي", "السلمي", "الجحدلي", "الصعيدي", "النفيعي", "الصلبي", "الشراري", "البلوي", "العمري", "الأسمري", "الاحمري", "الصبحي", "الذبياني", "اللحياني", "الحويطي", "الشرقي", "المري", "الهاجري", "السعدي", "المحيا", "العرفي", "الجهني", "البارقي", "الزامل", "العمودي", "النجار", "الحداد", "الصالح", "الفوزان", "الراشد", "السيف", "الجمعة", "الموسى", "الناصر", "السديري", "الزايد"];

        // دالة توليد HTML لتقييم واحد (تُستدعى عند الحاجة فقط)
        const createSingleReview = () => {
            const isMale = Math.random() > 0.5;
            const firstName = isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)];
            const lastName = lNames[Math.floor(Math.random() * lNames.length)];
            const fullName = `${firstName} ${lastName}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            
            const starts = ["ما شاء الله", "أطلق متجر", "والله انكم كفو", "افضل خدمة", "تجربة بطلة", "شغل مرتب", "ثقة وأمانة", "رهيبين", "انصحكم فيه", "خدمة احترافية"];
            const middles = ["المتابعين وصلوا سريع", "التنفيذ فوري فعلاً", "الجودة ممتازة ومافي نقص", "المصداقية عندكم عالية", "سعر بطل وانجاز سريع", "المتابعين ثابتين من فترة", "الخدمة توب التوب", "افضل متجر تعاملت معه", "تطور حسابي بفضلكم", "الضمان حقيقي"];
            const ends = ["🔥", "🚀", "❤️", "👍", "✅", "💯", "✨", ""];
            const commentText = `${starts[Math.floor(Math.random() * starts.length)]} ${middles[Math.floor(Math.random() * middles.length)]} ${ends[Math.floor(Math.random() * ends.length)]}`;
            const time = ["منذ ساعة", "منذ 3 ساعات", "منذ يوم", "منذ يومين", "منذ أسبوع"][Math.floor(Math.random() * 5)];

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
                                <p class="opacity-70 text-sm">${time}</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1" style="color: #fbbf24;">
                                    <i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i><i class="sicon-star2 inline-block"></i>
                                </div>
                            </div>
                            <div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>
                        </div>
                    </div>
                </div>`;
        };

        // --- 3. دالة الحقن (تولد 5 فقط في كل استدعاء) ---
        const renderNextBatch = () => {
            let htmlBuffer = "";
            for (let i = 0; i < perPage; i++) {
                if (currentIndex < totalReviewsCount) {
                    htmlBuffer += createSingleReview();
                    currentIndex++;
                }
            }
            scrollContainer.insertAdjacentHTML('beforeend', htmlBuffer);

            // إخفاء الزر عند الوصول للحد الأقصى
            if (currentIndex >= totalReviewsCount) {
                const wrapper = document.querySelector('.custom-load-more-wrapper');
                if (wrapper) wrapper.style.display = 'none';
            }
        };

        // حقن أول دفعة (5) عند تحميل الصفحة
        renderNextBatch();

        // --- 4. إضافة زر "تحميل المزيد" ---
        const btnWrapper = document.createElement('div');
        btnWrapper.className = "s-infinite-scroll-wrapper custom-load-more-wrapper";
        btnWrapper.innerHTML = `
            <a href="javascript:void(0)" class="s-infinite-scroll-btn s-button-btn s-button-primary" id="trigger-load-more">
                <span class="s-button-text s-infinite-scroll-btn-text">تحميل المزيد</span>
                <span class="s-button-loader s-button-loader-center s-infinite-scroll-btn-loader" id="custom-loader" style="display: none"></span>
            </a>`;
        
        scrollContainer.after(btnWrapper);

        const btn = document.getElementById('trigger-load-more');
        const loader = document.getElementById('custom-loader');
        const btnText = btn.querySelector('.s-button-text');

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';

            // محاكاة وقت التحميل ليعطي انطباعاً بالواقعية
            setTimeout(() => {
                renderNextBatch();
                btnText.style.display = 'inline-block';
                loader.style.display = 'none';
            }, 600);
        });
    };

    // تشغيل السكربت
    if (document.readyState === 'complete') {
        injectReviews();
    } else {
        window.addEventListener('load', injectReviews);
    }

    // مراقبة الصفحة في حال كانت "سلة" تغير المحتوى ديناميكياً
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
