(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. دالة توليد الوقت المنوع ---
        const getDynamicTime = () => {
            const timeOptions = [
                "منذ ساعة", "منذ ساعتين", "منذ 8 ساعات", "منذ يوم", 
                "منذ يومين", "منذ 5 أيام", "منذ أسبوع", "منذ أسبوعين", 
                "منذ شهر", "منذ شهرين"
            ];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات (88 تقييم) ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '88');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(88 تقييم)";
        }

        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = "88 تعليق";

        // --- 3. البيانات الجديدة (60 تعليق مخصص للمشاهدات) ---
        const comments = [
            "المشاهدات وصلت في ثواني"، "ثبات مو طبيعي ما نقصت ولا مشاهدة", "انصحكم فيه لرفع الاكسبلور", "سرعة البرق ما شاء الله", "جودة المشاهدات توب"، "افضل متجر للمشاهدات"، "فرق معي التفاعل بعد المشاهدات", "ثقة وسرعة وأمانة", "مو آخر تعامل بإذن الله", "المشاهدات حقيقية وتبيض الوجه",
            "رهيبين وسريعين جداً", "أطلق خدمة مشاهدات جربتها", "السعر يابلاش والخدمة نار", "شكراً سايا ستور على المصداقية", "المشاهدات ثابتة 100%", "تنفذ الطلب بلمح البصر", "دعم فني بطل وسريع", "كل شي تمام والعدد وصل كامل", "رفع لي الريلز اكسبلور فوراً", "ممتازين ومبدعين كالعادة",
            "خدمة احترافية جداً", "ولا غلطة الله يبارك لكم", "انصح وبقوة للي يبي تفاعل", "جودة وسعر وسرعة خرافية", "المشاهدات ما تنقص أبداً", "تجربة ممتازة وراح اكررها", "افضل متجر خدمات في السعودية", "سرعة الرد والتنفيذ مذهلة", "المشاهدات خلت حسابي ينفجر", "بيض الله وجيهكم",
            "ما توقعت السرعة هذي صراحة", "خدمة ترفع الراس كفو", "المصداقية عنوانكم دائماً", "المشاهدات وصلت وزيادة شوي", "شغل مرتب ونظيف", "تستاهلون التقييم الكامل", "سريعين في الانجاز والله", "المشاهدات ثابتة من اسبوع", "افضل استثمار للحساب", "الخدمة 10 من 10",
            "الله يسعدكم المشاهدات وصلت", "سرعة خيالية ما كملت دقيقة", "جودة عالية جداً انصحكم", "فرق كبير في المشاهدات واللايكات", "أهنيكم على هالمستوى", "كل شي واضح وسهل", "المشاهدات حقيقية وتفاعل بطل", "شكراً على التعامل الراقي", "مبدعين دائماً وابداً", "المتجر رقم واحد عندي",
            "سرعة تنفيذ لا توصف"، "خدمة مميزة جداً ومضمونة"، "المشاهدات ساعدتني في الانتشار", "الله يوفقكم ويرزقكم", "انصح الكل يتعامل معهم", "شغل ذمة وضمير", "المشاهدات جودتها ممتازة", "سريع جداً في الدفع والتنفيذ", "تطور حسابي بفضلكم", "افضل تجربة شراء مشاهدات"
        ];

        // أسماء مختلفة (تركيز على أسماء خليجية ومنوعة)
        const mFirst = ["يوسف", "علي", "أحمد", "إبراهيم", "حسين", "عمر", "زايد", "حمد", "سيف", "راشد", "فارس", "حسن", "عادل", "صالح", "مبارك", "فهد"];
        const fFirst = ["فاطمة", "شيخة", "مريم", "عائشة", "شما", "هناء", "العنود", "هيا", "موضي", "نورة", "سحر", "أحلام", "منى", "حصة", "نجود", "بشاير"];
        const lNames = ["المري", "الهاجري", "السعدي", "الرشيدي", "البلوشي", "الزدجالي", "التميمي", "الخالدي", "الشمري", "الدوسري", "المالكي", "الحارثي", "الفيفي", "العمري", "الأسمري"];

        // تجهيز التوزيع (60 نص + 28 نجوم = 88 إجمالي)
        let reviewPool = [];
        for (let i = 0; i < 88; i++) {
            reviewPool.push(i < 60 ? comments[i % comments.length] : "");
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
