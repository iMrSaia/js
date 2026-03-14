(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. دالة توليد الوقت المنوع (ساعات، أيام، أسابيع، أشهر) ---
        const getDynamicTime = () => {
            const timeOptions = [
                "منذ ساعة", "منذ ساعتين", "منذ 5 ساعات", "منذ 10 ساعات",
                "منذ يوم", "منذ يومين", "منذ 4 أيام", "منذ 6 أيام",
                "منذ أسبوع", "منذ أسبوعين", "منذ 3 أسابيع",
                "منذ شهر", "منذ شهرين", "منذ 3 أشهر"
            ];
            // اختيار وقت عشوائي من القائمة
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '210');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(210 تقييم)";
        }

        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = "210 تعليق";

        // --- 3. البيانات (الأسماء والتعليقات) ---
        const comments = [
            "أسرع وأروع خدمة 🌷", "مرره جبار وصلني المتابعين ❣️", "منتج كويس وزياده حلوه", "حبيت رائعين جدًا", "سريعين والله", "المتابعين ماينقصو اشكركم", "افضل متجر والله عميلهم مميز", "الصراحه سعر مقابل جودة", "تنفيذ سرييع ويتجاوبو معاك", "وصلو المتابعين سريع", "افضل متجر للامانه", "انصحكم فيه والله وعن تجربة", "رهيبين الحساب طار متابعينه 🚀", "مصداقية وسرعة الله يبارك لكم", "ثالث مرة أطلب 😍", "المتابعين حقيقيين ولا فيه نقص", "شكراً سايا ستور على الاحترافية", "افضل متجر لزيادة المتابعين", "الخدمة ناررر 🔥", "أنصح فيه وبقوة جودة وسعر", "والله ما قصرتوا بيض الله وجيهكم", "جودة المتابعين ممتازة جداً", "تعامل راقي وسرعة في الإنجاز", "سرني التعامل معكم ومو آخر مرة", "شي فاخر من الآخر 👍", "دعم فني متجاوب وسريع", "كل شي مرتب وسريع", "تطور حسابي بشكل ملحوظ شكراً", "شغل نظيف ومرتب", "كنت متردد بس التجربة اثبتت قوتكم", "سرعة البرق في التنفيذ ⚡", "المصداقية عنوانكم", "الله يرزقكم من واسع فضله", "ممتاز جداً انصح الجميع", "خدمة متميزة وسعر منافس", "تجاوب سريع وعمل احترافي", "تستاهلون عشر نجوم مو بس خمسة", "افضل تجربة شراء خدمات", "متابعين ثابتين وبدون نقص", "دقة في المواعيد وسرعة", "ما توقعت السرعة هذي صراحة", "شكراً لكم من القلب", "مبدعين ومتميزين دائماً", "راقيين في التعامل جداً", "توب التوب ماشاء الله", "الله يوفقكم خدمة بطلة", "انجاز سريع وشغل احترافي", "المتجر المفضل عندي من اليوم", "متجر ثقة وبدون خوف", "جبارين وربي 🔥"
        ];

        const mFirst = ["خالد", "عبدالله", "فهد", "سلطان", "فيصل", "محمد", "سعد", "ماجد", "بدر", "تركي", "منصور", "نايف", "سلمان", "راكان", "مشعل", "طلال", "بندر", "نواف", "ثامر", "زياد", "عبدالرحمن", "سعود", "وليد", "ياسر", "حماد"];
        const fFirst = ["نورة", "سارة", "أمل", "مرام", "هيفاء", "ريم", "العنود", "ليلى", "نجلاء", "غادة", "رهف", "هند", "شروق", "نوف", "مشاعل", "أريج", "لطيفة", "موضي", "دلال", "منى", "خلود", "منيرة", "الجوهرة", "عبير", "أسماء"];
        const lNames = ["العتيبي", "القحطاني", "الزهراني", "الغامدي", "الحربي", "الشمري", "الدوسري", "المطيري", "الرشيدي", "السبيعي", "الشهري", "عسيري", "المالكي", "العنزي", "الرويلي", "الشهراني", "التميمي", "البقمي", "السهلي", "الخالدي", "الفضلي", "المرهون", "الحازمي", "القرني", "اليامي", "الثبيتي", "السلمي", "الجحدلي", "الصعيدي", "النفيعي", "الصلبي", "الشراري", "البلوي", "العمري", "الأسمري", "الاحمري", "الصبحي", "الذبياني", "اللحياني", "الحويطي", "الشرقي", "المري", "الهاجري", "السعدي", "المحيا", "العرفي", "الجهني", "البارقي", "الزامل", "العمودي"];

        let reviewPool = [];
        for (let i = 0; i < 210; i++) {
            reviewPool.push(i < 160 ? comments[i % comments.length] : "");
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
                                    <i class="sicon-star2 inline-block text-amber-400"></i><i class="sicon-star2 inline-block text-amber-400"></i><i class="sicon-star2 inline-block text-amber-400"></i><i class="sicon-star2 inline-block text-amber-400"></i><i class="sicon-star2 inline-block text-amber-400"></i>
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
