(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        
        // منع التكرار: الحماية من حقن الكود أو الزر أكثر من مرة
        if (!scrollContainer || document.getElementById('trigger-load-more') || document.querySelector('.custom-unique-review')) return;

        // --- إعدادات العرض التدريجي ---
        const totalReviewsCount = 114;
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

        // --- 2. البيانات (التعليقات والأسماء كما وردت في كودك الأخير دون تغيير) ---
        const comments = [
            "اللايكات وصلت بسرعة البرق ⚡", "جودة الحسابات ممتازة صراحة", "أفضل متجر لايكات بلا منازع", "سعر بطل وتنفيذ فوري", "اللايكات حقيقية ورفعت التفاعل", "شكراً سايا ستور على السرعة", "تجاوب سريع جداً ما شاء الله", "مو أول مرة أطلب ولا رح تكون الأخيرة", "لايكات ثابتة ولا نقصت أبداً", "خدمة تبيض الوجه وسعر مناسب",
            "انصحكم فيه للي يبي حسابه يطلع اكسبلور", "سرعة تنفيذ لا توصف", "اللايكات وصلت في أقل من دقيقة", "جودة رهيبة ومصداقية عالية", "شغل احترافي ومرتب", "الله يبارك لكم في رزقكم خدمة بطلة", "اللايكات زادت هيبة المنشور", "دعم فني متعاون وسريع", "كل شي تمام والعدد وصل كامل وزيادة", "أفضل تجربة شراء لايكات انستا",
            "سريع جداً وأنصح الكل فيه", "اللايكات وصلت بلمح البصر", "جودة عالية وثبات ممتاز", "المتجر المفضل عندي دائماً", "شكراً على المصداقية والتعامل الراقي", "اللايكات ساعدتني كثير في التفاعل", "تنفيذ آلي وسريع جداً", "ما قصرتوا بيض الله وجيهكم", "جودة الحسابات تفتح النفس", "مبدعين دائماً في خدماتكم",
            "الخدمة 10 من 10 بدون مبالغة", "سرعة الرد والطلب خيالية", "اللايكات وصلتني كاملة وفي وقت قياسي", "ولا غلطة الله يوفقكم", "خدمة متميزة جداً ومضمونة", "أنصح وبقوة لزيادة التفاعل", "فرق كبير في الحساب بعد اللايكات", "أطلق متجر خدمات سوشيال ميديا", "ثقة وأمانة وسرعة تنفيذ", "يستاهلون كل ريال والله",
            "اللايكات جودتها فوق الممتاز", "أسرع تنفيذ شفته بحياتي", "كل شي واضح وسهل في المتجر", "متابعة الطلب سريعة جداً", "شكراً لكم من القلب", "اللايكات ثابتة من أيام ما نقصت", "شغل ذمة وضمير", "مستوى عالي من الاحترافية", "الله يوفقكم متجر بطل", "اللايكات حقيقية ومنوعة",
            "سرعة في كل شي ما شاء الله", "تستاهلون التقييم الكامل", "تجربة رائعة ورح اكررها", "افضل سعر مقابل أفضل جودة", "اللايكات خلت المنشور ينتشر", "دقة ومواعيد وسرعة", "أنصح بالتعامل معهم وبشدة", "الخدمة فاقت توقعاتي", "شكراً سايا ستور على الاحترافية", "المصداقية هي أهم شي وهم قدها",
            "اللايكات وصلت فوراً بعد الدفع", "جودة الحسابات ممتازة جداً", "ما شاء الله سرعة خرافية", "أهنيكم على هذا المتجر", "خدمة سريعة وموثوقة 100%", "اللايكات ثابتة ولا فيها نقص", "تعامل راقي وسرعة إنجاز", "أفضل اختيار لزيادة اللايكات", "اللايكات وصلت وزيادة شوي هدايا", "متجر أسطوري وخدمة جبارة",
            "بإذن الله بكون عميل دائم", "السرعة عندهم مو طبيعية", "المصداقية عنوانكم دائماً", "شغل نظيف ومرتب", "اللايكات وصلت في ثواني", "شكراً على التعامل الممتاز", "جودة ولا أروع وسعر مناسب", "اللايكات خلت الحساب يتفاعل", "الله يسعدكم مثل ما اسعدتوني", "أطلق خدمة لايكات جربتها",
            "اللايكات وصلتني كاملة شكراً", "تنفيذ سريع جداً وأسعار بطلة", "انجاز سريع وشغل احترافي", "المتجر رقم 1 في قلبي", "ثقة وبدون خوف اطلب وانت مطمن", "جبارين وربي 🔥", "تعامل يشكرون عليه", "بإذن الله رح اطلب ثاني", "مستوى عالي من الجودة", "السرعة هي ميزتكم"
        ];

        const mFirst = ["سلطان", "مشاري", "عزام", "نواف", "طلال", "بدر", "تركي", "باسل", "أيمن", "قصي", "هاني", "جمال", "رائد", "ساهر", "سامي", "وضاح"];
        const fFirst = ["ليان", "جود", "ريناد", "تولين", "غيداء", "نجود", "شوق", "لمى", "رهف", "دانية", "يارا", "لين", "هتون", "عبير", "مها", "رنا"];
        const lNames = ["المالكي", "الشهري", "الغزواني", "الأحمري", "الفيفي", "العسيري", "القرني", "اليامي", "الشهراني", "البارقي", "الزهراني", "الغامدي", "الهذلي", "العتيبي", "الثبيتي"];

        const getDynamicTime = () => {
            const timeOptions = ["منذ ساعة", "منذ 5 ساعات", "منذ يوم", "منذ يومين", "منذ أسبوع", "منذ شهر"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 3. تجهيز مصفوفة التقييمات ---
        let reviewPool = [];
        for (let i = 0; i < totalReviewsCount; i++) {
            reviewPool.push(i < 90 ? comments[i % comments.length] : "");
        }
        reviewPool = reviewPool.sort(() => Math.random() - 0.5);

        const allReviewsHtml = reviewPool.map((commentText) => {
            const isMale = Math.random() > 0.5;
            const firstName = isMale ? mFirst[Math.floor(Math.random() * mFirst.length)] : fFirst[Math.floor(Math.random() * fFirst.length)];
            const lastName = lNames[Math.floor(Math.random() * lNames.length)];
            const fullName = `${firstName} ${lastName}`;
            const avatar = isMale ? "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_male.png" : "https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png";
            
            return `
                <div class="border-b last:border-0 mb-8 pb-8 last:pb-0 border-gray-200 dark:border-white/10 list-block custom-review custom-unique-review">
                    <div class="comment flex text-sm rtl:space-x-reverse space-x-3 text-right" style="direction: rtl;">
                        <div class="flex-none"><img src="${avatar}" alt="${fullName}" class="w-10 h-10 object-cover rounded-full"></div>
                        <div class="flex-1">
                            <div class="flex flex-wrap md:items-center justify-between mb-2 md:mb-0">
                                <div class="flex items-center mb-1">
                                    <h3 class="font-bold text-base rtl:ml-10 ltr:mr-10 fix-align">${fullName}</h3>
                                    <div class="flex">
                                        <i class="sicon-check rounded-full bg-amber-400 h-5 w-5 flex items-center justify-center text-xs" style="background-color: #fbbf24; color: white;"></i>
                                        <span class="fix-align rtl:mr-1 ltr:ml-1 text-sm opacity-80 mt-0.5">قام بالشراء, </span>
                                        <span class="fix-align rtl:mr-1 ltr:ml-1 text-sm opacity-80 mt-0.5">تم التقييم</span>
                                    </div>
                                </div>
                                <p class="opacity-70 text-sm">${getDynamicTime()}</p>
                                <div class="w-full comment__rating text-xs mb-2.5 rtl:space-x-reverse space-x-1">
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                    <i class="sicon-star2 inline-block text-amber-400"></i>
                                </div>
                            </div>
                            ${commentText ? `<div class="prose prose-sm max-w-none opacity-70"><p>${commentText}</p></div>` : ''}
                        </div>
                    </div>
                </div>`;
        });

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
                }, 800);
            });
        }
    };

    window.addEventListener('load', injectReviews);
    const observer = new MutationObserver(injectReviews);
    observer.observe(document.body, { childList: true, subtree: true });
})();
