(function() {
    'use strict';

    const injectReviews = () => {
        const scrollContainer = document.querySelector('salla-infinite-scroll');
        
        // منع التكرار: الحماية من حقن الكود أو الزر أكثر من مرة
        if (!scrollContainer || document.getElementById('trigger-load-more') || document.querySelector('.custom-unique-review')) return;

        // شرط إضافي من الكود الثاني: التحقق من السعر
        const priceElement = document.querySelector('.total-price');
        if (!priceElement || !priceElement.innerText.includes("299")) return;

        // --- إعدادات العرض التدريجي ---
        const totalReviewsCount = 584; // العدد الإجمالي من الكود الثاني
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
        if (footerTitle) footerTitle.innerText = `150 تعليق`; // الرقم المحدد في الكود الثاني

        // --- 2. البيانات (نصوصك الأصلية وقوائم الأسماء) ---
        const comments = [
            "حقيقي مافي ارخص من كذا يبيعون البرنامج كامل بذا الرخص اهنيكم 🙏💙", "الفكرة قوييييية👌", "انصحكم فيه بقوة والله", "حرفيًا التقييمات الآن تشرف 🙏", "سعر ممتاز والنتائج كانت سريعه برنامج يدوم معاك على طول🤣👍", "صراحة ريحتوني كثير، انصح فيه❤️", "شغل مرتب واحترافية عالية، يعطيكم العافية.", "ممتاز مجرد ماتشتري ينزلك الملف على طول", "البرنامج جبار والله ومهتمين بكل التفاصيل 💪", "ممتاز والله انصحكم بقوة وجدا سريعين", "الفكرة ممتازة وفكت ازمة كثيرة ومتحمس للتحديثات 👍", "منتج جباار اهنيكم والله", "أفضل أداة لرفع تقييمات قوقل ماب جربتها، فعالة جداً", "وفرتوا علي مبالغ خيالية كنت أدفعها لشركات التسويق", "التحميل فوري والملف وصلني بعد الدفع بثواني، أبطال", "يا جماعة البرنامج سهل جداً وأي أحد يقدر يستخدمه", "أهنيكم على هالاختراع، فكيتوا أزمة أصحاب المحلات", "سعر الأداة مقابل مفعولها يعتبر مجاني والله", "النتائج سريعة جداً والتقييمات ثابتة، شكراً جزيلاً", "أداة ذكية وتغنيك عن الكل، الله يبارك لكم", "شرح البرنامج واضح والتعامل مع الأداة سلس جداً", "كنت متردد بس بعد التجربة الأداة تسوى ذهب", "أسرع برنامج لزيادة التقييمات في قوقل ماب بدون منازع", "والله العظيم الأداة جبارة وفرقت معي كثير في النشاط", "أطلق برنامج لرفع مبيعات المحل عن طريق التقييمات", "البرنامج دايم وما يوقف، أفضل استثمار سويته", "شكراً على التحديثات المستمرة للأداة، متجر ثقة", "التقييمات الحين توب التوب بفضل الله ثم هالبرنامج", "فكرة الأداة عبقرية وتختصر وقت وجهد كبير", "البرنامج نزل لي فوراً وبدأت أستخدمه، سهل جداً", "ماشاء الله الأداة دقيقة وتجيب نتائج فورية", "أفضل أداة قوقل ماب في السوق، سعر ومفعول", "ريحتوني من عناء البحث، الأداة هذي هي الحل", "شغل احترافي والبرنامج متعوب عليه فعلاً", "أنصح كل صاحب بزنس يشتري هالبرنامج وبقوة", "سعر رخيص جداً على برنامج بهالقوة ماشاء الله", "التقييمات بدأت تظهر في حسابي فوراً بعد استخدامه", "أداة متكاملة وخدمة عملاء يشكرون على التجاوب", "البرنامج غير لي وضع المحل تماماً، شكراً لكم", "ما توقعت البرنامج بهالسهولة، ضغطة زر والكل يقيم", "فعلاً منتج جبار ويستاهل كل ريال", "أداة قوقل ماب هذي كنز لكل تاجر", "النتائج مبهرة والتقييمات حقيقية وجميلة", "البرنامج يدوم معك، مو زي الخدمات اللي تنقطع", "تجربة رائعة والبرنامج شغال بدون أي مشاكل", "شكراً على الأداة الرهيبة، سهلت علي الكثير", "كل شي واضح من لحظة الشراء لين تشغيل البرنامج", "أفضل استثمار لزيادة موثوقية المحل في قوقل", "الأداة هذي خلت محلي في الصدارة، شكراً لكم", "يا لبى قلوبكم على هالبرنامج، فعلاً فكة أزمة", "شغل ذمة وضمير والبرنامج ولا غلطة", "أنصح بالأداة هذي لكل أحد يبي يرفع تقييماته بسرعة", "التحميل كان سريع جداً والبرنامج اشتغل معي فوراً", "سعر البرنامج يابلاش مقابل النتائج اللي شفتها", "أهنيكم على هالفكرة، فعلاً أداة ذكية جداً", "التقييمات الحين تشرف وترفع الراس بفضلكم", "البرنامج جبار وتفاصيله دقيقة وسهل الاستخدام", "أفضل متجر يبيع أدوات قوقل ماب، ثقة وسرعة", "الله يوفقكم، البرنامج ساعدني كثير في التسويق", "كنت أدفع مبالغ شهرية، الحين بضغطة زر أسوي كل شي", "أداة عملية جداً وتغني عن برامج كثير معقدة", "شكراً على المصداقية، البرنامج وصلني كامل ومكمل", "أنصح بالبرنامج وبقوة لكل أصحاب الأنشطة التجارية", "البرنامج بطل والنتائج شفتها في أول يوم استخدام", "فعلاً ريحتوني، كنت شايل هم التقييمات والحين انحلت", "البرنامج يستاهل 10 نجوم، أهنيكم على الإبداع", "أداة قوية جداً وسعرها منافس للجميع", "ما كملت دقيقة إلا والملف عندي، سرعة خرافية", "البرنامج شغال زي الحلاوة والتقييمات تزيد يومياً", "شكراً على تعاملكم الراقي وعلى هالمنتج الجبار", "الأداة هذي هي اللي كنت أدور عليها من زمان", "وفرتوا علي جهد وتعب، الله يوفقكم ويبارك لكم", "البرنامج احترافي جداً والنتائج مضمونة 100%", "ماشاء الله، تنفيذ فوري للأداة بعد الشراء مباشرة", "أفضل أداة لرفع الموثوقية في قوقل ماب", "شكراً على البرنامج الرهيب، فعلاً فرق معي كثير", "كل شي تمام والبرنامج شغال على أكمل وجه", "أنصح الجميع بالأداة هذي، سعرها يابلاش", "التقييمات تزيد بشكل طبيعي وجميل، شكراً لكم", "البرنامج سهل جداً حتى اللي ما يفهم بالتقنية يقدر له", "أداة جبارة وتستحق الاقتناء لكل صاحب محل", "الله يسعدكم، البرنامج فادني في زيادة الزبائن", "البرنامج وصلني فوري بعد الدفع، ثقة وسرعة", "أداة عبقرية وسعرها في متناول الجميع", "شكراً على الأمانة، البرنامج شغال وممتاز", "أفضل متجر لبيع أدوات الأتمتة وقوقل ماب", "البرنامج رهيب والتحديثات اللي تجي عليه توب", "فكرة الأداة قوية جداً وتناسب كل أنواع المحلات", "النتائج سريعة والبرنامج مستقر جداً", "ألف شكر على هالمنتج الجبار، فعلاً فكيتوا أزمة", "البرنامج يغنيك عن دفع مبالغ لشركات الدعاية", "الأداة خرافية وسهلة الاستخدام جداً", "الله يبارك لكم، البرنامج شغال 10/10", "شكراً على السرعة والمصداقية، البرنامج بطل", "أداة قوقل ماب هذي ضرورية لكل محل يبي ينجح", "البرنامج وصلني بلمح البصر، شكراً لكم", "فعلاً أفضل أداة تعاملت معها، نتائجها حقيقية", "البرنامج جبار وأهنيكم على الاهتمام بالتفاصيل", "أنصح الكل يشتري البرنامج قبل ما يغلى سعره", "الأداة سهلة جداً والنتائج مبهرة ماشاء الله", "الله يسعدكم، ريحتوني من هم التقييمات الضعيفة", "البرنامج شغال تمام والتقييمات بدأت تنهال علي", "شكراً على التعامل الطيب والأداة الخرافية", "البرنامج ممتاز جداً وأنصح به كل صاحب عمل", "أداة قوقل ماب هذي هي السر لنجاح أي محل"
        ];

        const mFirst = ["خالد", "عبدالله", "فهد", "سلطان", "فيصل", "محمد", "سعد", "ماجد", "بدر", "تركي", "منصور", "نايف", "سلمان", "راكان", "مشعل", "طلال", "بندر", "نواف", "ثامر", "زياد", "عبدالرحمن", "سعود", "وليد", "ياسر", "حماد"];
        const fFirst = ["نورة", "سارة", "أمل", "مرام", "هيفاء", "ريم", "العنود", "ليلى", "نجلاء", "غادة", "رهف", "هند", "شروق", "نوف", "مشاعل", "أريج", "لطيفة", "موضي", "دلال", "منى", "خلود", "منيرة", "الجوهرة", "عبير", "أسماء"];
        const lNames = ["العتيبي", "القحطاني", "الزهراني", "الغامدي", "الحربي", "الشمري", "الدوسري", "المطيري", "الرشيدي", "السبيعي", "الشهري", "عسيري", "المالكي", "العنزي", "الرويلي", "الشهراني", "التميمي", "البقمي", "السهلي", "الخالدي", "الفضلي", "المرهون", "الحازمي", "القرني", "اليامي", "الثبيتي", "السلمي", "الجحدلي", "الصعيدي", "النفيعي", "الصلبي", "الشراري", "البلوي", "العمري", "الأسمري", "الاحمري", "الصبحي", "الذبياني", "اللحياني", "الحويطي", "الشرقي", "المري", "الهاجري", "السعدي", "المحيا", "العرفي", "الجهني", "البارقي", "الزامل", "العمودي"];

        const getDynamicTime = () => {
            const timeOptions = ["منذ يوم", "منذ يومين", "منذ أسبوع", "منذ أسبوعين", "منذ شهر"];
            return timeOptions[Math.floor(Math.random() * timeOptions.length)];
        };

        // --- 3. تجهيز مصفوفة التقييمات ---
        let reviewPool = [];
        for (let i = 0; i < totalReviewsCount; i++) {
            // توزيع التعليقات على إجمالي عدد التقييمات
            reviewPool.push(i < 150 ? comments[i % comments.length] : "");
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
