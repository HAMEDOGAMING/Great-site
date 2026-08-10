/* =========================================================
   BLOOD STRIKE HUB
   PART 3 — CHARACTERS + FILTERS + DETAILS
========================================================= */


/* =========================================================
   1. CHARACTER DATA
========================================================= */

/*
   مهم:
   لا نضع قدرات أو أرقامًا غير مؤكدة.
   عند إضافة شخصية جديدة، ضع البيانات التي تم التحقق منها
   في هذا الشكل.
*/

const characterData = [

    {
        id: "character-01",

        name: "شخصية تجريبية 01",

        role: "متوازن",

        difficulty: "متوسط",

        playstyle: [
            "متوازن",
            "دعم الفريق",
            "قتال متوسط المدى"
        ],

        ability: {
            name: "سيتم التحقق من القدرة",

            description:
                "يتم وضع وصف القدرة هنا بعد التأكد من معلومات الشخصية من مصدر موثوق."
        },

        suitableFor: [
            "المبتدئين",
            "اللعب الجماعي",
            "اللاعب المتوازن"
        ],

        tags: [
            "متوازن",
            "فريق"
        ],

        image:
            "assets/characters/character-01.webp"
    },


    {
        id: "character-02",

        name: "شخصية تجريبية 02",

        role: "هجومي",

        difficulty: "متوسط",

        playstyle: [
            "هجومي",
            "اشتباكات سريعة",
            "ضغط على الخصم"
        ],

        ability: {
            name: "سيتم التحقق من القدرة",

            description:
                "يتم وضع وصف القدرة هنا بعد التأكد من المعلومات الرسمية أو المصادر الموثوقة."
        },

        suitableFor: [
            "اللاعب الهجومي",
            "اللعب السريع",
            "المواجهات المباشرة"
        ],

        tags: [
            "هجومي",
            "سريع"
        ],

        image:
            "assets/characters/character-02.webp"
    }

];


/* =========================================================
   2. REPLACE OLD CHARACTER ARRAY
========================================================= */

characters = characterData;


/* =========================================================
   3. CHARACTER STATE
========================================================= */

const characterState = {

    search: "",

    role: "all",

    difficulty: "all",

    playstyle: "all",

    page: 1,

    perPage: 12

};


/* =========================================================
   4. CHARACTER SECTION
========================================================= */

function findCharacterSection() {

    return document.getElementById(
        "characters"
    );

}


/* =========================================================
   5. CHARACTER FILTER UI
========================================================= */

function createCharacterFilters() {

    const section =
        findCharacterSection();


    if (!section)
        return;


    let filters =
        document.getElementById(
            "characterFilters"
        );


    if (filters)
        return;


    filters =
        document.createElement(
            "div"
        );


    filters.id =
        "characterFilters";


    filters.style.cssText = `

        margin:25px 0;

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(180px,1fr));

        gap:10px;

    `;


    filters.innerHTML = `

        <div>

            <label
                style="
                    display:block;
                    margin-bottom:6px;
                    color:#9ba9c5;
                    font-size:13px;
                "
            >
                البحث
            </label>

            <input
                id="characterSearchInput"
                type="search"
                placeholder="ابحث باسم الشخصية..."
                style="
                    width:100%;
                    box-sizing:border-box;
                "
            >

        </div>


        <div>

            <label
                style="
                    display:block;
                    margin-bottom:6px;
                    color:#9ba9c5;
                    font-size:13px;
                "
            >
                الدور
            </label>

            <select
                id="characterRoleFilter"
                style="width:100%;"
            >

                <option value="all">
                    كل الأدوار
                </option>

                <option value="هجومي">
                    هجومي
                </option>

                <option value="متوازن">
                    متوازن
                </option>

                <option value="دعم">
                    دعم
                </option>

            </select>

        </div>


        <div>

            <label
                style="
                    display:block;
                    margin-bottom:6px;
                    color:#9ba9c5;
                    font-size:13px;
                "
            >
                الصعوبة
            </label>

            <select
                id="characterDifficultyFilter"
                style="width:100%;"
            >

                <option value="all">
                    كل المستويات
                </option>

                <option value="سهل">
                    سهل
                </option>

                <option value="متوسط">
                    متوسط
                </option>

                <option value="صعب">
                    صعب
                </option>

            </select>

        </div>


        <div>

            <label
                style="
                    display:block;
                    margin-bottom:6px;
                    color:#9ba9c5;
                    font-size:13px;
                "
            >
                أسلوب اللعب
            </label>

            <select
                id="characterPlaystyleFilter"
                style="width:100%;"
            >

                <option value="all">
                    كل الأساليب
                </option>

                <option value="هجومي">
                    هجومي
                </option>

                <option value="دعم الفريق">
                    دعم الفريق
                </option>

                <option value="قتال متوسط المدى">
                    متوسط المدى
                </option>

                <option value="اشتباكات سريعة">
                    اشتباكات سريعة
                </option>

            </select>

        </div>

    `;


    const heading =
        section.querySelector(
            ".section-heading"
        );


    if (heading) {

        heading.after(filters);

    }
    else {

        section.prepend(filters);

    }


    connectCharacterFilters();

}


/* =========================================================
   6. FILTER EVENTS
========================================================= */

function connectCharacterFilters() {

    const search =
        document.getElementById(
            "characterSearchInput"
        );


    const role =
        document.getElementById(
            "characterRoleFilter"
        );


    const difficulty =
        document.getElementById(
            "characterDifficultyFilter"
        );


    const playstyle =
        document.getElementById(
            "characterPlaystyleFilter"
        );


    if (search) {

        search.addEventListener(
            "input",
            event => {

                characterState.search =
                    event.target.value
                        .trim()
                        .toLowerCase();

                characterState.page = 1;

                renderCharacters();

            }
        );

    }


    if (role) {

        role.addEventListener(
            "change",
            event => {

                characterState.role =
                    event.target.value;

                characterState.page = 1;

                renderCharacters();

            }
        );

    }


    if (difficulty) {

        difficulty.addEventListener(
            "change",
            event => {

                characterState.difficulty =
                    event.target.value;

                characterState.page = 1;

                renderCharacters();

            }
        );

    }


    if (playstyle) {

        playstyle.addEventListener(
            "change",
            event => {

                characterState.playstyle =
                    event.target.value;

                characterState.page = 1;

                renderCharacters();

            }
        );

    }

}


/* =========================================================
   7. FILTER CHARACTERS
========================================================= */

function getFilteredCharacters() {

    return characters.filter(
        character => {

            const matchesSearch =

                !characterState.search ||

                character.name
                    .toLowerCase()
                    .includes(
                        characterState.search
                    );


            const matchesRole =

                characterState.role ===
                "all" ||

                character.role ===
                characterState.role;


            const matchesDifficulty =

                characterState.difficulty ===
                "all" ||

                character.difficulty ===
                characterState.difficulty;


            const matchesPlaystyle =

                characterState.playstyle ===
                "all" ||

                character.playstyle
                    .includes(
                        characterState.playstyle
                    );


            return (
                matchesSearch &&
                matchesRole &&
                matchesDifficulty &&
                matchesPlaystyle
            );

        }
    );

}


/* =========================================================
   8. CHARACTER CARD
========================================================= */

function createCharacterCard(character) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "character-card";


    card.dataset.id =
        character.id;


    card.style.cssText = `

        position:relative;

        background:
            linear-gradient(
                145deg,
                #121d34,
                #0b1325
            );

        border:1px solid #263957;

        border-radius:18px;

        overflow:hidden;

        transition:
            transform .2s ease,
            border-color .2s ease;

    `;


    const tags =
        character.tags
            .map(
                tag => `
                    <span
                        style="
                            display:inline-block;
                            padding:5px 9px;
                            margin:2px;
                            border-radius:8px;
                            background:#17243d;
                            color:#9edff0;
                            font-size:11px;
                        "
                    >
                        ${tag}
                    </span>
                `
            )
            .join("");


    card.innerHTML = `

        <div
            style="
                height:190px;

                display:flex;
                align-items:center;
                justify-content:center;

                background:
                    radial-gradient(
                        circle,
                        rgba(100,229,255,.12),
                        transparent 65%
                    );
            "
        >

            <img
                src="${character.image}"
                alt="${character.name}"
                loading="lazy"

                style="
                    width:100%;
                    height:100%;
                    object-fit:contain;
                "

                onerror="
                    this.style.display='none';
                    this.parentElement
                        .querySelector('.character-placeholder')
                        .style.display='flex';
                "
            >


            <div
                class="character-placeholder"

                style="
                    display:none;

                    position:absolute;

                    width:100%;
                    height:190px;

                    align-items:center;
                    justify-content:center;

                    font-size:60px;
                "
            >
                🎮
            </div>

        </div>


        <div
            style="
                padding:18px;
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:start;
                    gap:10px;
                "
            >

                <div>

                    <h3
                        style="
                            margin:0 0 6px;
                        "
                    >
                        ${character.name}
                    </h3>

                    <span
                        style="
                            color:#64e5ff;
                            font-size:12px;
                            font-weight:800;
                        "
                    >
                        ${character.role}
                    </span>

                </div>


                <span
                    style="
                        white-space:nowrap;

                        padding:5px 8px;

                        border-radius:8px;

                        background:#18243a;

                        color:#c6d0e3;

                        font-size:10px;
                    "
                >
                    ${character.difficulty}
                </span>

            </div>


            <div
                style="
                    margin:12px 0;
                "
            >
                ${tags}
            </div>


            <button
                class="character-details-btn btn btn-primary"
                data-character-id="${character.id}"
                style="
                    width:100%;
                "
            >
                عرض التفاصيل
            </button>

        </div>

    `;


    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-4px)";

            card.style.borderColor =
                "#64e5ff";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0)";

            card.style.borderColor =
                "#263957";

        }
    );


    return card;

}


/* =========================================================
   9. CHARACTER GRID
========================================================= */

function renderCharacters() {

    const section =
        findCharacterSection();


    if (!section)
        return;


    let grid =
        document.getElementById(
            "characterGrid"
        );


    if (!grid) {

        grid =
            document.createElement(
                "div"
            );


        grid.id =
            "characterGrid";


        grid.style.cssText = `

            display:grid;

            grid-template-columns:
            repeat(
                auto-fit,
                minmax(220px,1fr)
            );

            gap:18px;

        `;


        const existingCards =
            section.querySelectorAll(
                ".character-card"
            );


        existingCards.forEach(
            card => card.remove()
        );


        section.appendChild(
            grid
        );

    }


    grid.innerHTML = "";


    const filtered =
        getFilteredCharacters();


    if (!filtered.length) {

        grid.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    padding:40px;
                    text-align:center;
                    border:1px dashed #334768;
                    border-radius:16px;
                    color:#9ba9c5;
                "
            >
                لا توجد شخصيات تطابق البحث الحالي.
            </div>

        `;

        return;

    }


    const start =
        (
            characterState.page - 1
        ) *
        characterState.perPage;


    const end =
        start +
        characterState.perPage;


    filtered
        .slice(start, end)
        .forEach(
            character => {

                grid.appendChild(
                    createCharacterCard(
                        character
                    )
                );

            }
        );


    connectCharacterDetailButtons();

    renderCharacterPagination(
        filtered.length
    );

}


/* =========================================================
   10. CHARACTER DETAILS
========================================================= */

function connectCharacterDetailButtons() {

    document
        .querySelectorAll(
            ".character-details-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset
                            .characterId;


                    const character =
                        characters.find(
                            item =>
                                item.id === id
                        );


                    if (character) {

                        openCharacterDetails(
                            character
                        );

                    }

                }
            );

        });

}


/* =========================================================
   11. DETAILS MODAL
========================================================= */

function openCharacterDetails(
    character
) {

    let modal =
        document.getElementById(
            "characterDetailsModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "characterDetailsModal";


        modal.style.cssText = `

            position:fixed;

            inset:0;

            z-index:9999;

            display:flex;

            align-items:center;

            justify-content:center;

            padding:20px;

            background:
                rgba(0,0,0,.78);

            backdrop-filter:
                blur(8px);

        `;


        document.body.appendChild(
            modal
        );

    }


    modal.innerHTML = `

        <div
            style="
                width:min(700px,100%);

                max-height:90vh;

                overflow:auto;

                background:#0d172b;

                border:1px solid #2a4267;

                border-radius:22px;

                padding:26px;

                position:relative;

                direction:rtl;
            "
        >

            <button
                id="closeCharacterDetails"
                style="
                    position:absolute;

                    left:15px;
                    top:15px;

                    width:40px;
                    height:40px;

                    border:1px solid #314768;

                    border-radius:10px;

                    background:#101d34;

                    color:white;

                    cursor:pointer;

                    font-size:20px;
                "
            >
                ×
            </button>


            <div
                style="
                    text-align:center;
                    padding-top:10px;
                "
            >

                <div
                    style="
                        height:220px;
                        margin-bottom:15px;
                    "
                >

                    <img
                        src="${character.image}"
                        alt="${character.name}"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:contain;
                        "

                        onerror="
                            this.style.display='none';
                            this.parentElement
                                .querySelector('.details-fallback')
                                .style.display='flex';
                        "
                    >

                    <div
                        class="details-fallback"
                        style="
                            display:none;
                            height:100%;
                            align-items:center;
                            justify-content:center;
                            font-size:80px;
                        "
                    >
                        🎮
                    </div>

                </div>


                <div
                    style="
                        color:#64e5ff;
                        font-size:11px;
                        font-weight:900;
                    "
                >
                    BLOOD STRIKE HUB
                </div>


                <h2
                    style="
                        margin:6px 0 20px;
                        font-size:30px;
                    "
                >
                    ${character.name}
                </h2>

            </div>


            <div
                style="
                    display:grid;

                    grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(180px,1fr)
                    );

                    gap:10px;

                    margin-bottom:18px;
                "
            >

                ${detailBox(
                    "الدور",
                    character.role
                )}

                ${detailBox(
                    "الصعوبة",
                    character.difficulty
                )}

                ${detailBox(
                    "أسلوب اللعب",
                    character.playstyle
                        .join(" • ")
                )}

            </div>


            <div
                style="
                    background:#111e35;

                    border:1px solid #273b5c;

                    border-radius:15px;

                    padding:18px;

                    margin-bottom:12px;
                "
            >

                <h3>
                    ⚡ القدرة
                </h3>

                <strong
                    style="
                        color:#64e5ff;
                    "
                >
                    ${character.ability.name}
                </strong>


                <p
                    style="
                        color:#aebbd0;
                        line-height:1.8;
                    "
                >
                    ${character.ability.description}
                </p>

            </div>


            <div
                style="
                    background:#111e35;

                    border:1px solid #273b5c;

                    border-radius:15px;

                    padding:18px;
                "
            >

                <h3>
                    🎯 مناسبة لـ
                </h3>


                <ul
                    style="
                        color:#aebbd0;
                        line-height:2;
                    "
                >

                    ${character.suitableFor
                        .map(
                            item =>
                                `<li>${item}</li>`
                        )
                        .join("")}

                </ul>

            </div>

        </div>

    `;


    modal
        .querySelector(
            "#closeCharacterDetails"
        )
        ?.addEventListener(
            "click",
            closeCharacterDetails
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeCharacterDetails();

            }

        }
    );

}


function detailBox(
    title,
    value
) {

    return `

        <div
            style="
                padding:14px;

                background:#111e35;

                border:1px solid #273b5c;

                border-radius:13px;
            "
        >

            <div
                style="
                    color:#899bb6;
                    font-size:11px;
                    margin-bottom:5px;
                "
            >
                ${title}
            </div>

            <strong>
                ${value}
            </strong>

        </div>

    `;

}


function closeCharacterDetails() {

    const modal =
        document.getElementById(
            "characterDetailsModal"
        );


    if (modal) {

        modal.remove();

    }

}


/* =========================================================
   12. PAGINATION
========================================================= */

function renderCharacterPagination(
    total
) {

    const section =
        findCharacterSection();


    if (!section)
        return;


    let pagination =
        document.getElementById(
            "characterPagination"
        );


    if (!pagination) {

        pagination =
            document.createElement(
                "div"
            );


        pagination.id =
            "characterPagination";


        pagination.style.cssText = `

            display:flex;

            align-items:center;

            justify-content:center;

            gap:10px;

            margin-top:25px;

        `;


        section.appendChild(
            pagination
        );

    }


    pagination.innerHTML =
        "";


    const pages =
        Math.ceil(
            total /
            characterState.perPage
        );


    if (pages <= 1)
        return;


    for (
        let i = 1;
        i <= pages;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            i;


        button.className =
            "filter-button";


        if (
            i ===
            characterState.page
        ) {

            button.style.borderColor =
                "#64e5ff";

            button.style.color =
                "#64e5ff";

        }


        button.addEventListener(
            "click",
            () => {

                characterState.page =
                    i;

                renderCharacters();

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );


        pagination.appendChild(
            button
        );

    }

}


/* =========================================================
   13. CHARACTER DATA HELPERS
========================================================= */

function addCharacter(
    character
) {

    if (
        !character ||
        !character.id ||
        !character.name
    ) {

        console.error(
            "Invalid character data."
        );

        return false;

    }


    const exists =
        characters.some(
            item =>
                item.id ===
                character.id
        );


    if (exists) {

        console.warn(
            "Character already exists:",
            character.id
        );

        return false;

    }


    characters.push(
        character
    );


    renderCharacters();


    return true;

}


/* =========================================================
   14. CHARACTER COUNTER
========================================================= */

function updateCharacterCounter() {

    const counter =
        document.getElementById(
            "characterCount"
        );


    if (!counter)
        return;


    counter.textContent =
        `${characters.length} شخصية`;

}


/* =========================================================
   15. GLOBAL SEARCH SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Ctrl + K
           يفتح بحث الشخصيات.
        */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();


            const search =
                document.getElementById(
                    "characterSearchInput"
                );


            if (search) {

                search.focus();

            }

        }

    }
);


/* =========================================================
   16. RESPONSIVE CHARACTER CSS
========================================================= */

function addCharacterStyles() {

    if (
        document.getElementById(
            "characterDynamicStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "characterDynamicStyles";


    style.textContent = `

        #characterFilters input,
        #characterFilters select {

            min-height:44px;

            padding:
                0 12px;

            border:
                1px solid #293d5e;

            border-radius:
                10px;

            background:
                #0b1325;

            color:
                #ffffff;

            outline:
                none;

        }


        #characterFilters input:focus,
        #characterFilters select:focus {

            border-color:
                #64e5ff;

        }


        .character-card img {

            transition:
                transform .25s ease;

        }


        .character-card:hover img {

            transform:
                scale(1.04);

        }


        @media(max-width:600px) {

            #characterFilters {

                grid-template-columns:
                    1fr !important;

            }


            .character-card {

                border-radius:
                    14px !important;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   17. INITIALIZE PART 3
========================================================= */

function initializePart3() {

    addCharacterStyles();

    createCharacterFilters();

    renderCharacters();

    updateCharacterCounter();

}


/* =========================================================
   18. START PART 3
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePart3
    );

}
else {

    initializePart3();

          }
