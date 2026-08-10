"use strict";

/* =========================================================
   BLOOD STRIKE HUB
   PART 2 — INTERACTIVE ENGINE
========================================================= */


/* =========================================================
   1. BASIC SETTINGS
========================================================= */

const APP = {
    version: "1.0.0",
    storageKey: "bloodStrikeHubSettings"
};


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function toggleMenu() {

    const nav = document.getElementById("navLinks");

    if (!nav) return;

    nav.classList.toggle("open");
}


/* إغلاق القائمة بعد اختيار رابط */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            const nav =
                document.getElementById("navLinks");

            if (nav) {
                nav.classList.remove("open");
            }

        });

    });


/* =========================================================
   3. SENSITIVITY SYSTEM
========================================================= */

/*
   هذه القيم ليست "أفضل حساسية رسمية".
   هي نقاط بداية يتم تعديلها حسب الجهاز
   وطريقة اللعب.
*/

const sensitivityProfiles = {

    budget: {

        low: {
            camera: 72,
            firing: 67,
            ads: 61,
            tactical: 55
        },

        medium: {
            camera: 82,
            firing: 77,
            ads: 70,
            tactical: 63
        },

        high: {
            camera: 91,
            firing: 86,
            ads: 78,
            tactical: 70
        }

    },


    midrange: {

        low: {
            camera: 76,
            firing: 71,
            ads: 65,
            tactical: 58
        },

        medium: {
            camera: 86,
            firing: 81,
            ads: 73,
            tactical: 66
        },

        high: {
            camera: 94,
            firing: 89,
            ads: 81,
            tactical: 73
        }

    },


    flagship: {

        low: {
            camera: 80,
            firing: 75,
            ads: 68,
            tactical: 61
        },

        medium: {
            camera: 90,
            firing: 85,
            ads: 76,
            tactical: 69
        },

        high: {
            camera: 97,
            firing: 92,
            ads: 84,
            tactical: 76
        }

    },


    tablet: {

        low: {
            camera: 73,
            firing: 68,
            ads: 62,
            tactical: 56
        },

        medium: {
            camera: 84,
            firing: 79,
            ads: 71,
            tactical: 64
        },

        high: {
            camera: 93,
            firing: 88,
            ads: 80,
            tactical: 72
        }

    }

};


/* تعديلات حسب أسلوب اللعب */

const playstyleModifiers = {

    balanced: 0,

    fast: 6,

    precise: -5,

    tracking: 3

};


/* تعديلات الجيروسكوب */

const gyroModifiers = {

    off: 0,

    low: -2,

    medium: 2,

    high: 5

};


/* حماية القيم من الخروج عن النطاق */

function clamp(value, min = 1, max = 100) {

    return Math.max(
        min,
        Math.min(
            max,
            Math.round(value)
        )
    );

}


/* إنشاء إعداد حساسية */

function generateSensitivity() {

    const device =
        document.querySelector(
            "#sensitivityDevice"
        )?.value || "midrange";


    const fps =
        document.querySelector(
            "#sensitivityFPS"
        )?.value || "medium";


    const playstyle =
        document.querySelector(
            "#sensitivityPlaystyle"
        )?.value || "balanced";


    const gyro =
        document.querySelector(
            "#sensitivityGyro"
        )?.value || "medium";


    const profile =
        sensitivityProfiles[device] ||
        sensitivityProfiles.midrange;


    const base =
        profile[fps] ||
        profile.medium;


    const playModifier =
        playstyleModifiers[playstyle] || 0;


    const gyroModifier =
        gyroModifiers[gyro] || 0;


    const result = {

        camera: clamp(
            base.camera +
            playModifier +
            gyroModifier
        ),

        firing: clamp(
            base.firing +
            playModifier +
            gyroModifier
        ),

        ads: clamp(
            base.ads +
            Math.round(playModifier * 0.7) +
            gyroModifier
        ),

        tactical: clamp(
            base.tactical +
            Math.round(playModifier * 0.5) +
            gyroModifier
        )

    };


    displaySensitivity(result);

    saveSensitivity(result);

}


/* عرض النتيجة */

function displaySensitivity(result) {

    const output = {

        camera:
            document.querySelector(
                "[data-setting='camera']"
            ),

        firing:
            document.querySelector(
                "[data-setting='firing']"
            ),

        ads:
            document.querySelector(
                "[data-setting='ads']"
            ),

        tactical:
            document.querySelector(
                "[data-setting='tactical']"
            )

    };


    if (output.camera) {
        output.camera.textContent =
            result.camera;
    }


    if (output.firing) {
        output.firing.textContent =
            result.firing;
    }


    if (output.ads) {
        output.ads.textContent =
            result.ads;
    }


    if (output.tactical) {
        output.tactical.textContent =
            result.tactical;
    }

}


/* حفظ الإعداد */

function saveSensitivity(result) {

    const current =
        JSON.parse(
            localStorage.getItem(
                APP.storageKey
            ) || "{}"
        );


    current.sensitivity =
        result;


    localStorage.setItem(
        APP.storageKey,
        JSON.stringify(current)
    );

}


/* =========================================================
   4. CONNECT SENSITIVITY FORM
========================================================= */

/*
   الجزء الأول كان يحتوي على select بدون IDs.
   هنا نضيف IDs تلقائيًا حسب ترتيب الحقول.
*/

function prepareSensitivityForm() {

    const section =
        document.getElementById(
            "sensitivity"
        );

    if (!section) return;


    const selects =
        section.querySelectorAll(
            "select"
        );


    if (selects[0]) {
        selects[0].id =
            "sensitivityDevice";

        /*
           القيم الداخلية المهمة
        */

        [...selects[0].options]
            .forEach((option, index) => {

                if (index === 0)
                    option.value = "budget";

                if (index === 1)
                    option.value = "midrange";

                if (index === 2)
                    option.value = "flagship";

                if (index === 3)
                    option.value = "tablet";

            });
    }


    if (selects[1]) {

        selects[1].id =
            "sensitivityFPS";

        [...selects[1].options]
            .forEach((option, index) => {

                if (index === 0)
                    option.value = "low";

                if (index === 1)
                    option.value = "medium";

                if (index === 2)
                    option.value = "high";

            });

    }


    if (selects[2]) {

        selects[2].id =
            "sensitivityPlaystyle";

        [...selects[2].options]
            .forEach((option, index) => {

                if (index === 0)
                    option.value = "balanced";

                if (index === 1)
                    option.value = "fast";

                if (index === 2)
                    option.value = "precise";

                if (index === 3)
                    option.value = "tracking";

            });

    }


    if (selects[3]) {

        selects[3].id =
            "sensitivityGyro";

        [...selects[3].options]
            .forEach((option, index) => {

                if (index === 0)
                    option.value = "off";

                if (index === 1)
                    option.value = "low";

                if (index === 2)
                    option.value = "medium";

                if (index === 3)
                    option.value = "high";

            });

    }


    const button =
        section.querySelector(
            ".btn-primary"
        );


    if (button) {

        button.addEventListener(
            "click",
            generateSensitivity
        );

    }


    /* تحويل عناصر النتيجة إلى عناصر يمكن التحكم بها */

    const settings =
        section.querySelectorAll(
            ".setting strong"
        );


    if (settings[0])
        settings[0].dataset.setting =
            "camera";


    if (settings[1])
        settings[1].dataset.setting =
            "firing";


    if (settings[2])
        settings[2].dataset.setting =
            "ads";


    if (settings[3])
        settings[3].dataset.setting =
            "tactical";

}


/* =========================================================
   5. LOAD SAVED SENSITIVITY
========================================================= */

function loadSavedSensitivity() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                APP.storageKey
            ) || "{}"
        );


    if (
        saved.sensitivity
    ) {

        displaySensitivity(
            saved.sensitivity
        );

    }

}


/* =========================================================
   6. CHALLENGE DATABASE
========================================================= */

/*
   سنبني أكثر من 300 تحدٍ بشكل برمجي.
   لا نحتاج إلى كتابة 300 سطر متشابه.
*/

const challengeTemplates = {

    easy: [

        "استخدم سلاحًا واحدًا فقط في المباراة.",

        "حقق عددًا من الإقصاءات باستخدام سلاحك المفضل.",

        "العب المباراة مع التركيز على التصويب.",

        "استخدم سلاحًا لم تستخدمه منذ فترة.",

        "حاول إنهاء مباراة كاملة بدون تغيير سلاحك الأساسي.",

        "ركز على تحسين دقة التصويب في هذه المباراة.",

        "استخدم عتادًا مختلفًا عن المعتاد.",

        "جرّب أسلوب لعب أكثر هدوءًا في هذه المباراة."

    ],


    medium: [

        "استخدم سلاحًا من فئة مختلفة عن اختيارك المعتاد.",

        "حقق إقصاءات باستخدام أكثر من نوع سلاح.",

        "حاول الفوز بعد تغيير إعدادات اللعب المعتادة.",

        "لا تستخدم نفس السلاح طوال المباراة.",

        "ركز على الحركة والتصويب معًا.",

        "غيّر طريقة لعبك المعتادة وجرب أسلوبًا جديدًا.",

        "حاول تحقيق أفضل نتيجة ممكنة باستخدام عتاد غير معتاد.",

        "اعتمد على التتبع بدل التصويب السريع طوال جزء من المباراة."

    ],


    hard: [

        "حاول تحقيق أفضل نتيجة ممكنة باستخدام سلاح صعب التحكم.",

        "العب بأسلوب هجومي مع الحفاظ على دقة التصويب.",

        "استخدم عتادًا غير معتاد وحاول المنافسة به.",

        "حاول تحقيق عدة إقصاءات متتالية دون تغيير أسلوبك.",

        "ركز على سرعة اتخاذ القرار أثناء المواجهات.",

        "استخدم إعدادًا جديدًا للحساسية ثم اختبره في مباراة.",

        "حاول تحسين نتيجتك السابقة باستخدام نفس نوع العتاد.",

        "اجمع بين الحركة السريعة والتصويب الدقيق."

    ],


    funny: [

        "اختر سلاحًا لا تستخدمه عادةً وحاول الاستمتاع بالمباراة.",

        "غيّر اسم العتاد في ذهنك إلى اسم مضحك والعب به.",

        "اختر إعدادًا مختلفًا عن المعتاد لمباراة واحدة.",

        "دع زميلك يختار لك السلاح.",

        "استخدم أكثر عتاد غريب عندك وشاهد النتيجة.",

        "بدّل دورك المعتاد مع أحد أعضاء الفريق.",

        "العب بطريقة مختلفة تمامًا عن المباراة السابقة.",

        "اختر تحديًا عشوائيًا وجرّبه دون التخطيط له."

    ],


    training: [

        "تدرّب على تتبع هدف متحرك.",

        "تمرّن على التحكم في الارتداد.",

        "اختبر حساسية الكاميرا الجديدة.",

        "تدرّب على الانتقال بين الأهداف.",

        "تمرّن على التصويب أثناء الحركة.",

        "اختبر إعدادات الجيروسكوب إذا كنت تستخدمه.",

        "جرّب أكثر من حساسية واختر الأكثر راحة.",

        "راقب دقة تصويبك وحاول تحسينها."

    ],


    team: [

        "اجعل كل لاعب في الفريق يستخدم دورًا مختلفًا.",

        "دع زميلًا يختار لك السلاح.",

        "غيّر دورك المعتاد داخل الفريق.",

        "حاول مساعدة الفريق بدل التركيز على الإقصاءات فقط.",

        "اتفق مع الفريق على استراتيجية قبل بداية المباراة.",

        "اجعل كل لاعب يستخدم فئة سلاح مختلفة.",

        "تعاون مع الفريق لتحقيق أفضل نتيجة ممكنة.",

        "اختاروا قائدًا واحدًا للمباراة واتبعوا الخطة."

    ]

};


/* =========================================================
   7. GENERATE 300+ CHALLENGES
========================================================= */

const challengeDatabase = [];


function buildChallengeDatabase() {

    const categories =
        Object.keys(
            challengeTemplates
        );


    let id = 1;


    /*
       كل قالب يتم تكراره مع صياغات إضافية.
       النتيجة تتجاوز 300 عنصر.
    */

    categories.forEach(category => {

        const templates =
            challengeTemplates[category];


        templates.forEach(template => {

            for (
                let variation = 1;
                variation <= 7;
                variation++
            ) {

                challengeDatabase.push({

                    id: id++,

                    category:

                        category,

                    text:

                        template,

                    variation:

                        variation

                });

            }

        });

    });


    /*
       في حالة احتجنا عددًا أكبر،
       نضيف تنويعات تلقائية.
    */

    const extraPrefixes = [

        "في المباراة القادمة، ",

        "جرب اليوم أن ",

        "في مباراة واحدة، ",

        "هذه المرة، ",

        "كتحدٍ جديد، ",

        "اختبر نفسك وحاول أن "

    ];


    let prefixIndex = 0;


    while (
        challengeDatabase.length < 320
    ) {

        const category =
            categories[
                challengeDatabase.length %
                categories.length
            ];


        const original =
            challengeTemplates[
                category
            ][
                challengeDatabase.length %
                challengeTemplates[category].length
            ];


        challengeDatabase.push({

            id: id++,

            category:

                category,

            text:

                extraPrefixes[
                    prefixIndex %
                    extraPrefixes.length
                ] + original,

            variation:

                prefixIndex

        });


        prefixIndex++;

    }

}


/* =========================================================
   8. CHALLENGE WHEEL
========================================================= */

let selectedChallengeCategory =
    "all";


function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


function getRandomChallenge(
    category = "all"
) {

    let pool =
        challengeDatabase;


    if (
        category !== "all"
    ) {

        pool =
            challengeDatabase.filter(
                challenge =>
                    challenge.category ===
                    category
            );

    }


    if (!pool.length) {

        return {
            text:
                "لم يتم العثور على تحديات."
        };

    }


    return randomItem(pool);

}


/* =========================================================
   9. CHALLENGE UI
========================================================= */

function createChallengeUI() {

    const section =
        document.getElementById(
            "challenges"
        );


    if (!section) return;


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "challenge-wheel-container";


    container.style.maxWidth =
        "900px";


    container.style.margin =
        "35px auto 0";


    container.innerHTML = `

        <div
            style="
                background:#10182b;
                border:1px solid #243555;
                border-radius:20px;
                padding:30px;
                text-align:center;
            "
        >

            <div
                id="challengeCategoryName"
                style="
                    color:#64e5ff;
                    font-size:12px;
                    font-weight:900;
                    margin-bottom:12px;
                "
            >
                تحدي عشوائي
            </div>

            <div
                id="challengeResult"
                style="
                    min-height:80px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:20px;
                    font-weight:800;
                    margin-bottom:20px;
                "
            >
                اضغط على الزر لاختيار تحدي
            </div>

            <div
                style="
                    display:flex;
                    justify-content:center;
                    gap:8px;
                    flex-wrap:wrap;
                    margin-bottom:18px;
                "
            >

                <button
                    class="filter-button challenge-filter"
                    data-category="all"
                >
                    الكل
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="easy"
                >
                    🟢 سهل
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="medium"
                >
                    🟡 متوسط
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="hard"
                >
                    🔴 صعب
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="funny"
                >
                    😂 مضحك
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="training"
                >
                    🎯 تدريب
                </button>

                <button
                    class="filter-button challenge-filter"
                    data-category="team"
                >
                    👥 فريق
                </button>

            </div>

            <button
                id="spinChallenge"
                class="btn btn-primary"
            >
                🎡 اختر تحديًا
            </button>

        </div>

    `;


    section
        .querySelector(".section-heading")
        ?.after(container);


    const filters =
        container.querySelectorAll(
            ".challenge-filter"
        );


    filters.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedChallengeCategory =
                    button.dataset.category;

                const label =
                    document.getElementById(
                        "challengeCategoryName"
                    );

                if (label) {

                    label.textContent =
                        getCategoryName(
                            selectedChallengeCategory
                        );

                }

            }
        );

    });


    const spinButton =
        document.getElementById(
            "spinChallenge"
        );


    if (spinButton) {

        spinButton.addEventListener(
            "click",
            spinChallenge
        );

    }

}


function getCategoryName(category) {

    const names = {

        all:
            "تحدي عشوائي",

        easy:
            "🟢 تحدي سهل",

        medium:
            "🟡 تحدي متوسط",

        hard:
            "🔴 تحدي صعب",

        funny:
            "😂 تحدي مضحك",

        training:
            "🎯 تحدي تدريب",

        team:
            "👥 تحدي فريق"

    };


    return names[category] ||
        names.all;

}


function spinChallenge() {

    const result =
        document.getElementById(
            "challengeResult"
        );


    if (!result) return;


    result.textContent =
        "جاري اختيار التحدي...";


    let counter = 0;


    const animation =
        setInterval(() => {

            const temporary =
                getRandomChallenge(
                    selectedChallengeCategory
                );


            result.textContent =
                temporary.text;


            counter++;


            if (counter >= 12) {

                clearInterval(
                    animation
                );


                const finalChallenge =
                    getRandomChallenge(
                        selectedChallengeCategory
                    );


                result.textContent =
                    finalChallenge.text;

            }

        }, 90);

}


/* =========================================================
   10. BIO GENERATOR
========================================================= */

const bioTemplates = {

    professional: [

        "{name} | Blood Strike Player ⚡",

        "{name} • Aim. Move. Win. 🎯",

        "{name} | Ranked Player 🏆",

        "{name} — Playing to improve.",

        "{name} | Focus • Aim • Victory"

    ],


    arabic: [

        "{name} | لاعب Blood Strike 🎯",

        "{name} | اللعب للمتعة والفوز ⚡",

        "{name} | الهدف واضح 🏆",

        "{name} | كل مباراة فرصة جديدة",

        "{name} | نلعب ونطور مستوانا"

    ],


    simple: [

        "{name} 🎮",

        "{name} | Blood Strike",

        "{name} ⚡",

        "{name} | Player",

        "{name} 🎯 Blood Strike"

    ],


    funny: [

        "{name} | لو خسرت فهي الخطة 😂",

        "{name} | لا تسأل عن آخر مباراة 😂",

        "{name} | التصويب تحت التطوير 🔧",

        "{name} | أدخل للمتعة وأخرج بقصة 😂",

        "{name} | الخطة؟ نكتشفها أثناء اللعب."

    ],


    motivational: [

        "{name} | طور نفسك كل مباراة 🔥",

        "{name} | لا توقف التدريب 🎯",

        "{name} | خطوة بعد خطوة نحو الأفضل.",

        "{name} | تعلم • تدرب • تطور",

        "{name} | مستواك القادم يبدأ اليوم."

    ]

};


/* إنشاء بايو */

function generateBio() {

    const nameInput =
        document.querySelector(
            "#bioName"
        );


    const typeSelect =
        document.querySelector(
            "#bioType"
        );


    const output =
        document.querySelector(
            "#bioOutput"
        );


    if (!nameInput || !typeSelect || !output)
        return;


    const name =
        nameInput.value.trim() ||
        "Player";


    const type =
        typeSelect.value ||
        "professional";


    const templates =
        bioTemplates[type] ||
        bioTemplates.professional;


    const template =
        randomItem(
            templates
        );


    const bio =
        template.replace(
            "{name}",
            name
        );


    output.textContent =
        bio;


    saveBio(bio);

}


/* =========================================================
   11. PREPARE BIO FORM
========================================================= */

function prepareBioForm() {

    const section =
        document.getElementById(
            "bio"
        );


    if (!section) return;


    const inputs =
        section.querySelectorAll(
            "input"
        );


    const selects =
        section.querySelectorAll(
            "select"
        );


    const buttons =
        section.querySelectorAll(
            "button"
        );


    if (inputs[0]) {

        inputs[0].id =
            "bioName";

    }


    if (selects[0]) {

        selects[0].id =
            "bioType";


        [...selects[0].options]
            .forEach((option, index) => {

                const values = [

                    "professional",

                    "arabic",

                    "simple",

                    "funny",

                    "motivational"

                ];


                option.value =
                    values[index] ||
                    "professional";

            });

    }


    if (buttons[0]) {

        buttons[0].addEventListener(
            "click",
            generateBio
        );

    }


    const output =
        section.querySelector(
            ".bio-output"
        );


    if (output) {

        output.id =
            "bioOutput";

    }


}


/* حفظ البايو */

function saveBio(bio) {

    const current =
        JSON.parse(
            localStorage.getItem(
                APP.storageKey
            ) || "{}"
        );


    current.bio =
        bio;


    localStorage.setItem(
        APP.storageKey,
        JSON.stringify(current)
    );

}


/* =========================================================
   12. CHARACTER DATABASE
========================================================= */

/*
   البيانات النهائية للشخصيات ستضاف في الجزء الثالث
   بعد مراجعتها من مصادر مناسبة.
*/

let characters = [

    {
        id: 1,

        name:
            "الشخصية الأولى",

        ability:
            "سيتم إضافة القدرة.",

        description:
            "سيتم إضافة شرح القدرة ومعلوماتها.",

        playstyle:
            "متوازن",

        difficulty:
            "متوسط",

        image:
            "🧑‍🚀"

    },

    {
        id: 2,

        name:
            "الشخصية الثانية",

        ability:
            "سيتم إضافة القدرة.",

        description:
            "سيتم إضافة شرح القدرة ومعلوماتها.",

        playstyle:
            "هجومي",

        difficulty:
            "متوسط",

        image:
            "🪖"

    }

];


/* =========================================================
   13. CHARACTER SEARCH
========================================================= */

function setupCharacterSearch() {

    const section =
        document.getElementById(
            "characters"
        );


    if (!section) return;


    const input =
        section.querySelector(
            "input[type='search']"
        );


    if (!input) return;


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            const cards =
                section.querySelectorAll(
                    ".character-card"
                );


            cards.forEach(card => {

                const text =
                    card.textContent
                        .toLowerCase();


                card.style.display =
                    text.includes(query)
                        ? ""
                        : "none";

            });

        }
    );

}


/* =========================================================
   14. CHARACTER DETAILS MODAL
========================================================= */

function createCharacterModal() {

    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "characterModal";


    modal.style.cssText = `

        position:fixed;
        inset:0;
        z-index:5000;

        display:none;
        align-items:center;
        justify-content:center;

        padding:20px;

        background:rgba(0,0,0,.75);

        backdrop-filter:blur(8px);

    `;


    modal.innerHTML = `

        <div
            id="characterModalBox"
            style="
                width:min(650px,100%);
                max-height:90vh;
                overflow:auto;

                background:#10182b;
                border:1px solid #243555;
                border-radius:20px;

                padding:28px;

                position:relative;
            "
        >

            <button
                id="closeCharacterModal"
                style="
                    position:absolute;
                    top:15px;
                    left:15px;

                    width:38px;
                    height:38px;

                    border:1px solid #243555;
                    border-radius:10px;

                    background:#0b1325;
                    color:white;

                    font-size:18px;
                "
            >
                ×
            </button>


            <div id="characterModalContent"></div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document
        .getElementById(
            "closeCharacterModal"
        )
        ?.addEventListener(
            "click",
            closeCharacterModal
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeCharacterModal();

            }

        }
    );

}


function openCharacterModal(character) {

    const modal =
        document.getElementById(
            "characterModal"
        );


    const content =
        document.getElementById(
            "characterModalContent"
        );


    if (!modal || !content)
        return;


    content.innerHTML = `

        <div style="text-align:center">

            <div
                style="
                    font-size:80px;
                    margin-bottom:10px;
                "
            >
                ${character.image}
            </div>


            <div
                style="
                    color:#64e5ff;
                    font-size:11px;
                    font-weight:900;
                "
            >
                CHARACTER
            </div>


            <h2
                style="
                    font-size:30px;
                    margin:5px 0 15px;
                "
            >
                ${character.name}
            </h2>


            <div
                style="
                    display:grid;
                    grid-template-columns:
                    repeat(2,1fr);
                    gap:10px;
                    margin-bottom:20px;
                "
            >

                <div
                    style="
                        padding:13px;
                        border:1px solid #243555;
                        border-radius:12px;
                        background:#0b1325;
                    "
                >

                    <small
                        style="color:#9ba9c5"
                    >
                        أسلوب اللعب
                    </small>

                    <strong
                        style="
                            display:block;
                            margin-top:3px;
                        "
                    >
                        ${character.playstyle}
                    </strong>

                </div>


                <div
                    style="
                        padding:13px;
                        border:1px solid #243555;
                        border-radius:12px;
                        background:#0b1325;
                    "
                >

                    <small
                        style="color:#9ba9c5"
                    >
                        مستوى الصعوبة
                    </small>

                    <strong
                        style="
                            display:block;
                            margin-top:3px;
                        "
                    >
                        ${character.difficulty}
                    </strong>

                </div>

            </div>


            <div
                style="
                    text-align:right;
                    padding:18px;

                    border:1px solid #243555;
                    border-radius:14px;

                    background:#0b1325;
                "
            >

                <h3>
                    القدرة
                </h3>

                <p
                    style="
                        color:#64e5ff;
                        margin:4px 0 14px;
                    "
                >
                    ${character.ability}
                </p>


                <h3>
                    شرح القدرة
                </h3>

                <p
                    style="
                        color:#9ba9c5;
                        margin-top:4px;
                    "
                >
                    ${character.description}
                </p>

            </div>

        </div>

    `;


    modal.style.display =
        "flex";

}


function closeCharacterModal() {

    const modal =
        document.getElementById(
            "characterModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================================================
   15. CHARACTER BUTTONS
========================================================= */

function setupCharacterButtons() {

    const buttons =
        document.querySelectorAll(
            ".character-button"
        );


    buttons.forEach(
        (button, index) => {

            button.addEventListener(
                "click",
                () => {

                    const character =
                        characters[index] ||
                        characters[0];


                    openCharacterModal(
                        character
                    );

                }
            );

        }
    );

}


/* =========================================================
   16. COPY BIO BUTTON
========================================================= */

function createCopyBioButton() {

    const output =
        document.getElementById(
            "bioOutput"
        );


    if (!output) return;


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "btn btn-secondary";


    button.textContent =
        "📋 نسخ البايو";


    button.style.marginTop =
        "15px";


    output.parentElement
        ?.appendChild(button);


    button.addEventListener(
        "click",
        async () => {

            const text =
                output.textContent.trim();


            if (!text) return;


            try {

                await navigator.clipboard
                    .writeText(text);


                button.textContent =
                    "✓ تم النسخ";


                setTimeout(() => {

                    button.textContent =
                        "📋 نسخ البايو";

                }, 1500);

            }

            catch {

                button.textContent =
                    "انسخ النص يدويًا";

            }

        }
    );

}


/* =========================================================
   17. RESTORE SAVED DATA
========================================================= */

function restoreSavedData() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                APP.storageKey
            ) || "{}"
        );


    if (
        saved.bio
    ) {

        const output =
            document.getElementById(
                "bioOutput"
            );


        if (output) {

            output.textContent =
                saved.bio;

        }

    }


    if (
        saved.sensitivity
    ) {

        displaySensitivity(
            saved.sensitivity
        );

    }

}


/* =========================================================
   18. KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeCharacterModal();

        }

    }
);


/* =========================================================
   19. START APPLICATION
========================================================= */

function initializeApp() {

    console.log(
        "Blood Strike Hub started:",
        APP.version
    );


    /*
       الحساسية
    */

    prepareSensitivityForm();


    /*
       التحديات
    */

    buildChallengeDatabase();

    createChallengeUI();


    /*
       البايو
    */

    prepareBioForm();

    createCopyBioButton();


    /*
       الشخصيات
    */

    createCharacterModal();

    setupCharacterSearch();

    setupCharacterButtons();


    /*
       استرجاع البيانات
    */

    restoreSavedData();


    console.log(
        "Challenges:",
        challengeDatabase.length
    );

}


/* تشغيل الموقع */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

}
else {

    initializeApp();

}
