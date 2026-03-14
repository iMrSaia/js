(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        if (!scrollContainer || document.querySelector('.custom-unique-review')) return;

        // --- 1. دالة توليد الوقت المنوع ---
        const getDynamicTime = () => {
            const timeOptions = [
                "منذ ساعة", "منذ 3 ساعات", "منذ 12 ساعة", "منذ يوم", 
                "منذ يومين", "منذ 5 أيام", "منذ أسبوع", "منذ شهر"
            ];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 2. تحديث العدادات (114 تقييم) ---
        const sallaRating = document.querySelector('salla-rating-stars');
        if (sallaRating) {
            sallaRating.setAttribute('reviews', '114');
            const reviewSpan = sallaRating.querySelector('.s-rating-stars-reviews');
            if (reviewSpan) reviewSpan.innerText = "(114 تقييم)";
        }

        const footerTitle = document.querySelector('h2.text-lg.font-bold.opacity-70.mb-8');
        if (footerTitle) footerTitle.innerText = "114 تعليق";

        // --- 3. البيانات الجديدة (90 تعليق مخصص للايكات) ---
        const comments = [
            "اللايكات وصلت بسرعة البرق ⚡", "جودة الحسابات ممتازة صراحة", "أفضل متجر لايكات بلا منازع", "سعر بطل وتنفيذ فوري", "اللايكات حقيقية ورفعت التفاعل", "شكراً سايا ستور على السرعة", "تجاوب سريع جداً ما شاء الله", "مو أول مرة أطلب ولا رح تكون الأخيرة", "لايكات ثابتة ولا نقصت أبداً", "خدمة تبيض الوجه وسعر مناسب",
            "انصحكم فيه للي يبي حسابه يطلع اكسبلور", "سرعة تنفيذ لا توصف"، "اللايكات وصلت في أقل من دقيقة", "جودة رهيبة ومصداقية عالية", "شغل احترافي ومرتب", "الله يبارك لكم في رزقكم خدمة بطلة", "اللايكات زادت هيبة المنشور", "دعم فني متعاون وسريع", "كل شي تمام والعدد وصل كامل وزيادة", "أفضل تجربة شراء لايكات انستا",
            "سريع جداً وأنصح الكل فيه", "اللايكات وصلت بلمح البصر", "جودة عالية وثبات ممتاز", "المتجر المفضل عندي دائماً", "شكراً على المصداقية والتعامل الراقي", "اللايكات ساعدتني كثير في التفاعل", "تنفيذ آلي وسريع جداً", "ما قصرتوا بيض الله وجيهكم", "جودة الحسابات تفتح النفس", "مبدعين دائماً في خدماتكم",
            "الخدمة 10 من 10 بدون مبالغة", "سرعة الرد والطلب خيالية", "اللايكات وصلتني كاملة وفي وقت قياسي", "ولا غلطة الله يوفقكم", "خدمة متميزة جداً ومضمونة", "أنصح وبقوة لزيادة التفاعل", "فرق كبير في الحساب بعد اللايكات", "أطلق متجر خدمات سوشيال ميديا", "ثقة وأمانة وسرعة تنفيذ", "يستاهلون كل ريال والله",
            "اللايكات جودتها فوق الممتاز", "أسرع تنفيذ شفته بحياتي", "كل شي واضح وسهل في المتجر", "متابعة الطلب سريعة جداً", "شكراً لكم من القلب", "اللايكات ثابتة من أيام ما نقصت", "شغل ذمة وضمير", "مستوى عالي من الاحترافية", "الله يوفقكم متجر بطل", "اللايكات حقيقية ومنوعة",
            "سرعة في كل شي ما شاء الله", "تستاهلون التقييم الكامل", "تجربة رائعة ورح اكررها", "افضل سعر مقابل أفضل جودة", "اللايكات خلت المنشور ينتشر", "دقة ومواعيد وسرعة", "أنصح بالتعامل معهم وبشدة", "الخدمة فاقت توقعاتي", "شكراً سايا ستور على الاحترافية", "المصداقية هي أهم شي وهم قدها",
            "اللايكات وصلت فوراً بعد الدفع", "جودة الحسابات ممتازة جداً", "ما شاء الله سرعة خرافية", "أهنيكم على هذا المتجر", "خدمة سريعة وموثوقة 100%", "اللايكات ثابتة ولا فيها نقص", "تعامل راقي وسرعة إنجاز", "أفضل اختيار لزيادة اللايكات", "اللايكات وصلت وزيادة شوي هدايا", "متجر أسطوري وخدمة جبارة",
            "بإذن الله بكون عميل دائم", "السرعة عندهم مو طبيعية", "المصداقية عنوانكم دائماً", "شغل نظيف ومرتب", "اللايكات وصلت في ثواني", "شكراً على التعامل الممتاز", "جودة ولا أروع وسعر مناسب", "اللايكات خلت الحساب يتفاعل", "الله يسعدكم مثل ما اسعدتوني", "أطلق خدمة لايكات جربتها",
            "اللايكات وصلتني كاملة شكراً", "تنفيذ سريع جداً وأسعار بطلة", "انجاز سريع وشغل احترافي", "المتجر رقم 1 في قلبي", "ثقة وبدون خوف اطلب وانت مطمن", "جبارين وربي 🔥", "تعامل يشكرون عليه", "بإذن الله رح اطلب ثاني", "مستوى عالي من الجودة", "السرعة هي ميزتكم"
        ];

        // أسماء جديدة ومختلفة تماماً (مزيج من أسماء كلاسيكية وحديثة)
        const mFirst = ["سلطان", "مشاري", "عزام", "نواف", "طلال", "بدر", "تركي", "باسل", "أيمن", "قصي", "هاني", "جمال", "رائد", "ساهر", "سامي", "وضاح"];
        const fFirst = ["ليان", "جود", "ريناد", "تولين", "غيداء", "نجود", "شوق", "لمى", "رهف", "دانية", "يارا", "لين", "هتون", "عبير", "مها", "رنا"];
        const lNames = ["المالكي", "الشهري", "الغزواني", "الأحمري", "الفيفي", "العسيري", "القرني", "اليامي", "الشهراني", "البارقي", "الزهراني", "الغامدي", "الهذلي", "العتيبي", "الثبيتي"];

        // تجهيز التوزيع (90 نص + 24 نجوم = 114 إجمالي)
        let reviewPool = [];
        for (let i = 0; i < 114; i++) {
            reviewPool.push(i < 90 ? comments[i % comments.length] : "");
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
