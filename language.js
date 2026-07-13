// =========================
// IMAAN Translation System
// =========================

// Default Language
if (!localStorage.getItem("language")) {
    localStorage.setItem("language", "en");
}

// Current Language
const currentLanguage = localStorage.getItem("language");

// Translate Page
document.addEventListener("DOMContentLoaded", () => {

    const lang = translations[currentLanguage];

    document.querySelectorAll("[data-lang]").forEach(element => {

        const key = element.dataset.lang;

        if (lang[key]) {
            element.innerHTML = lang[key];
        }

    });

    // Arabic RTL
    if (currentLanguage === "ar") {

        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";

    } else {

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";

    }

});

// Change Language
function changeLanguage(lang){

    localStorage.setItem("language", lang);

    location.reload();

}