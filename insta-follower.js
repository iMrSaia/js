(function() {
    'use strict';

    const injectReviews = () => {
        // 1. التحقق من وجود حاوية التقييمات ومنع التكرار
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // 2. تحديث عدادات التقييم العلوية
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '210');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(210 تقييم)";
        }

        const countSpan = document.querySelector('h2.text-lg span');
        if (countSpan) countSpan.innerText = "210";

        // 3. مخزون البيانات (نفس التعليقات والأسماء اللي اخترناها)
        const comments = [
            "أسرع وأروع خدمة 🌷", "مرره جبار وصلني المتابعين ❣️", "منتج كويس وزياده حلوه", "حبيت رائعين جدًا", "سريعين والله", "المتابعين ماينقصو اشكركم", "افضل متجر والله عميلهم مميز", "الصراحه سعر مقابل جودة", "تنفيذ سرييع ويتجاوبو معاك", "وصلو المتابعين سريع", "افضل متجر للامانه", "انصحكم فيه والله وعن تجربة", "رهيبين الحساب طار متابعينه 🚀", "مصداقية وسرعة الله يبارك لكم", "ثالث مرة أطلب 😍", "المتابعين حقيقيين ولا فيه نقص", "شكراً سايا ستور على الاحترافية", "افضل متجر لزيادة المتابعين", "الخدمة ناررر 🔥", "أنصح فيه وبقوة جودة وسعر", "والله ما قصرتوا بيض الله وجيهكم", "جودة المتابعين ممتازة جداً", "تعامل راقي وسرعة في الإنجاز", "سرني التعامل معكم ومو آخر مرة", "شي فاخر من الآخر 👍", "دعم فني متجاوب وسريع", "كل شي مرتب وسريع", "تطور حسابي بشكل ملحوظ شكراً", "شغل نظيف ومرتب", "كنت متردد بس التجربة اثبتت قوتكم", "سرعة البرق في التنفيذ ⚡", "المصداقية عنوانكم", "الله يرزقكم من واسع فضله", "ممتاز جداً انصح الجميع", "خدمة متميزة وسعر منافس", "تجاوب سريع وعمل احترافي", "تستاهلون عشر نجوم مو بس خمسة", "افضل تجربة شراء خدمات", "متابعين ثابتين وبدون نقص", "دقة في المواعيد وسرعة", "ما توقعت السرعة هذي صراحة", "شكراً لكم من القلب", "مبدعين ومتميزين دائماً", "راقيين في التعامل جداً", "توب التوب ماشاء الله", "الله يوفقكم خدمة بطلة", "انجاز سريع وشغل احترافي", "المتجر المفضل عندي من اليوم", "متجر ثقة وبدون خوف", "جبارين وربي 🔥"
            // ... يمكنك زيادة التعليقات هنا لتصل لـ 160
        ];

        const mFirst = ["محمد", "فهد", "عبدالله", "خالد", "سلطان", "فيصل", "سعد", "تركي", "بدر", "ماجد", "نايف", "سلمان", "راكان", "مشعل", "طلال", "بندر"];
        const fFirst = ["نورة", "سارة", "ريم", "هيا", "أروى", "العنود", "شوق", "عبير", "لولوة", "دلال", "غادة", "جواهر", "مشاعل", "لينا", "نوف", "رهف"];
        const lNames = ["العتيبي", "القحطاني", "الزهراني", "الغامدي", "الحربي", "الشمري", "الدوسري", "المطيري", "الرشيدي", "السبيعي", "الشهري", "عسيري", "المالكي", "العنزي", "الرويلي", "التميمي", "البقمي", "السهلي", "الخالدي"];
        const times = ["منذ يوم", "منذ يومين", "منذ أسبوع", "منذ شهر"];

        // 4. تجهيز مصفوفة التوزيع (160 نص + 50 نجوم)
        let reviewPool = [];
        for (let i = 0; i < 210; i++) {
            if (i < 160) {
                reviewPool.push(comments[i % comments.length]);
            } else {
                reviewPool.push("");
            }
        }
        reviewPool = reviewPool.sort(() => Math.random() - 0.5); // خلط عشوائي

        // 5. حقن التقييمات في الحاوية
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
                                <p class="opacity-70 text-sm">${times[Math.floor(Math.random() * times.length)]}</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1" style="color: #fbbf24;">
                                    <i class="sicon-star2"></i><i class="sicon-star2"></i><i class="sicon-star2"></i><i class="sicon-star2"></i><i class="sicon-star2"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`;
            scrollContainer.insertAdjacentHTML('beforeend', reviewHtml);
        });
    };

    // التشغيل عند التحميل وعند أي تغيير في الصفحة (لضمان الحقن في الـ Infinite Scroll)
    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
