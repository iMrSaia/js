(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. دالة توليد الوقت المنوع ---
        const getDynamicTime = () => {
            const timeOptions = [
                "منذ ساعة", "منذ 4 ساعات", "منذ 10 ساعات", "منذ يوم", "منذ يومين", 
                "منذ 5 أيام", "منذ أسبوع", "منذ أسبوعين", "منذ شهر", "منذ شهرين", "منذ 4 أشهر"
            ];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات (933 تقييم) ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '933');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(933 تقييم)";
        }

        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = "933 تعليق";

        // --- 3. البيانات الضخمة (800 نص متنوع) ---
        const comments = [
            "أفضل متجر مشاهدات تيك توك بلا منازع 🔥", "وصلت المشاهدات فوراً ومافي أي نقص"، "انصحكم فيه وبقوة ضمان وجودة"، "تنفيذ فوري وسرعة خرافية ما شاء الله", "المشاهدات ثابتة والضمان حقيقي"، "سرعة في الانجاز وأفضل سعر في السوق"، "ثقة وأمانة وسرعة تنفيذ"، "المشاهدات ساعدت الفيديو يطلع اكسبلور فوراً", "شكراً سايا ستور على الخدمة البطلة", "جودة المشاهدات توب والتنفيذ بلمح البصر",
            "والله انهم كفو وسريعين جداً"، "المشاهدات ما نقصت حبة واحدة"، "أطلق متجر خدمات تيك توك"، "خدمة ممتازة وسعر جداً بطل"، "انصح الكل يتعامل معهم بدون تردد"، "تطور حسابي كثير بعد هذي الخدمة", "شغل ذمة وضمير وسرعة خيالية", "المشاهدات حقيقية ورفعت التفاعل"، "دعم فني متجاوب وسريع جداً", "تجربة ممتازة وراح اكررها دائماً",
            "سريع جداً في الدفع والتنفيذ"، "المشاهدات وصلت كاملة وزيادة"، "افضل اختيار لزيادة المشاهدات"، "جودة ولا أروع ومصداقية عالية"، "كل شي تمام والخدمة سريعة"، "المشاهدات ثابتة من اسبوعين"، "بيض الله وجيهكم ما قصرتوا", "شغل مرتب واحترافي 100%", "ما توقعت السرعة هذي صراحة", "افضل متجر تعاملت معه في حياتي",
            "الخدمة فاقت توقعاتي والله", "سرعة البرق في ارسال المشاهدات", "المشاهدات وصلت في ثواني"، "انصحكم فيه للي يبي الاكسبلور", "خدمة تفتح النفس وسعر مناسب", "ثبات عالي جداً للمشاهدات", "شكراً على التعامل الراقي والمصداقية", "متجر اسطوري وخدماته جبارة", "المشاهدات ساعدتني في الانتشار", "الله يبارك لكم في رزقكم"
        ];

        // مصفوفة أسماء منوعة كلياً (جديدة ومختلفة عن السابق)
        const mFirst = ["تميم", "مشهور", "باسل", "هيثم", "لؤي", "بسام", "وائل", "غسان", "منيف", "نيروز", "راجح", "مساعد", "جابر", "سامر", "فادي", "شادي"];
        const fFirst = ["لينا", "تالا", "وسن", "ليال", "جنى", "أمل", "خلود", "ريهام", "ديما", "لميس", "رزان", "سلاف", "كندة", "بيان", "ميس", "ندى"];
        const lNames = ["التميمي", "الرشيدي", "البلوي", "الشراري", "الحربي", "الجهني", "الرفاعي", "الأنصاري", "الشريف", "المولد", "التركستاني", "بخاري", "هوساوي", "القرشي", "السلمي"];

        // تجهيز التوزيع الضخم (800 نص + 133 نجوم = 933 إجمالي)
        let reviewPool = [];
        for (let i = 0; i < 933; i++) {
            // توزيع التعليقات الـ 800 بالتكرار على القائمة لتغطية العدد
            reviewPool.push(i < 800 ? comments[i % comments.length] : "");
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
