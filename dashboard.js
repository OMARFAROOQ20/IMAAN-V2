// ============================
// Azan Audio
// ============================

const fajrAzan = new Audio("audio/fajr.mp3");
const normalAzan = new Audio("audio/normal.mp3");

fajrAzan.preload = "auto";
normalAzan.preload = "auto";

let azanPlaying = false;
let lastPrayer = "";
// ==========================================
// Daily Ayahs
// ==========================================

const ayahs = [
"Indeed Allah is with the patient. (2:153)",
"So remember Me; I will remember you. (2:152)",
"Verily, with hardship comes ease. (94:6)",
"Allah does not burden a soul beyond what it can bear. (2:286)",
"Indeed, Allah loves those who trust Him. (3:159)"
];

// ==========================================
// Daily Duas
// ==========================================

const duas = [
{
arabic:"رَّبِّ زِدْنِي عِلْمًا",
english:"My Lord, increase me in knowledge."
},
{
arabic:"رَبِّ اشْرَحْ لِي صَدْرِي",
english:"My Lord, expand my chest."
},
{
arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
english:"Our Lord, grant us good in this world and the Hereafter."
}
];

// ==========================================
// Daily Hadith
// ==========================================

const hadiths = [
"The best among you are those who learn the Quran and teach it. (Bukhari)",
"Actions are judged by intentions. (Bukhari)",
"The strong believer is better and more beloved to Allah. (Muslim)",
"Whoever shows mercy will be shown mercy by Allah. (Tirmidhi)"
];

// ==========================================
// 99 Names
// ==========================================

const names = [
{name:"Ar-Rahman",meaning:"The Most Merciful"},
{name:"Ar-Raheem",meaning:"The Most Compassionate"},
{name:"Al-Malik",meaning:"The King"},
{name:"Al-Quddus",meaning:"The Most Holy"},
{name:"As-Salam",meaning:"The Source of Peace"}
];

// ==========================================
// Islamic Thoughts
// ==========================================

const thoughts = [
"Every prayer is a conversation with Allah.",
"Trust Allah even when you cannot see the way.",
"Patience today brings peace tomorrow.",
"The Quran is the light for every heart.",
"Remember Allah and your heart will find peace."
];
// ==========================================
// Prayer Times API
// ==========================================

let prayerSchedule = [];

async function loadPrayerTimes() {

    try {

        const response = await fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Nellore&country=India&method=2"
        );

        const data = await response.json();

        const t = data.data.timings;

        // ==========================
        // Hijri Date
        // ==========================

        const hijri = data.data.date.hijri;

        document.getElementById("hijriDate").innerHTML =
            `${hijri.day} ${hijri.month.en}, ${hijri.year} AH`;

        // ==========================
        // Daily Ayah
        // ==========================

        document.getElementById("dailyAyah").innerHTML =
            ayahs[new Date().getDate() % ayahs.length];

        // ==========================
        // Daily Dua
        // ==========================

        const dua = duas[new Date().getDate() % duas.length];

        document.getElementById("duaArabic").innerHTML =
            dua.arabic;

        document.getElementById("duaEnglish").innerHTML =
            dua.english;

        // ==========================
        // Daily Hadith
        // ==========================

        document.getElementById("dailyHadith").innerHTML =
            hadiths[new Date().getDate() % hadiths.length];

        // ==========================
        // Name of Allah
        // ==========================

        const allah = names[new Date().getDate() % names.length];

        document.getElementById("allahName").innerHTML =
            allah.name;

        document.getElementById("allahMeaning").innerHTML =
            allah.meaning;

        // ==========================
        // Islamic Thought
        // ==========================

        document.getElementById("dailyThought").innerHTML =
            thoughts[new Date().getDate() % thoughts.length];

        // ==========================
        // Prayer Times
        // ==========================

        document.getElementById("fajr").innerHTML = t.Fajr;
        document.getElementById("dhuhr").innerHTML = t.Dhuhr;
        document.getElementById("asr").innerHTML = t.Asr;
        document.getElementById("maghrib").innerHTML = t.Maghrib;
        document.getElementById("isha").innerHTML = t.Isha;

        prayerSchedule = [

            ["Fajr", t.Fajr],
            ["Dhuhr", t.Dhuhr],
            ["Asr", t.Asr],
            ["Maghrib", t.Maghrib],
            ["Isha", t.Isha]

        ];

        // ==========================
        // Next Prayer
        // ==========================

        const now = new Date();

        let nextName = "Completed";
        let nextTime = "--:--";

        for (const prayer of prayerSchedule) {

            const time = prayer[1].split(":");

            const prayerDate = new Date();

            prayerDate.setHours(
                parseInt(time[0]),
                parseInt(time[1]),
                0,
                0
            );

            if (prayerDate > now) {

                nextName = prayer[0];
                nextTime = prayer[1];
                break;

            }

        }

        document.getElementById("nextPrayer").innerHTML =
            nextName + " - " + nextTime;

        document.getElementById("popupNextPrayer").innerHTML =
            nextName;

        document.getElementById("popupPrayerTime").innerHTML =
            nextTime;

        document.getElementById("popupCountdown").innerHTML =
            "Prepare for the next Salah";

    }

    catch (error) {

        console.log(error);

    }

}

loadPrayerTimes();

// Start checking prayer times
checkPrayerTime();

// Refresh prayer times every 5 minutes
setInterval(loadPrayerTimes,300000);
// ============================
// Play Azan
// ============================
function playAzan(prayerName){

    let audio;

    if(prayerName === "Fajr"){
        audio = fajrAzan;
    }else{
        audio = normalAzan;
    }

    audio.currentTime = 0;

    audio.play().then(()=>{
        console.log("Azan playing");
    }).catch(err=>{
        console.log("Audio blocked", err);
    });

}
// ============================
// Check Prayer Time
// ============================

function checkPrayerTime(){

    setInterval(() => {

        const now = new Date();

        const currentTime =
            now.getHours().toString().padStart(2,"0") + ":" +
            now.getMinutes().toString().padStart(2,"0");

        prayerSchedule.forEach(prayer => {

            if(currentTime === prayer[1] && lastPrayer !== prayer[0]){

                lastPrayer = prayer[0];

                console.log("Auto Azan:", prayer[0]);

playAzan(prayer[0]);

                showPrayerPopup(prayer[0]);

                showPrayerNotification(prayer[0]);

                console.log("Playing Azan for:", prayer[0]);

            }

        });

    },1000);

}
// ============================
// Notification Permission
// ============================

if ("Notification" in window) {
    Notification.requestPermission();
}

// ============================
// Show Notification
// ============================

function showPrayerNotification(prayerName){

    if(Notification.permission === "granted"){

        new Notification("🕌 IMAAN",{
            body: "It's time for " + prayerName + " prayer.",
            icon: "images/logo.png"
        });

    }

}
// ============================
// Prayer Alert Popup
// ============================

const prayerAlert = document.getElementById("prayerAlert");
const alertPrayerName = document.getElementById("alertPrayerName");
const closeAlert = document.getElementById("closeAlert");

function showPrayerPopup(prayerName){

    alertPrayerName.innerHTML = prayerName;

    prayerAlert.style.display = "flex";

}

closeAlert.addEventListener("click", function(){

    prayerAlert.style.display = "none";

});
// ============================
// Notification Bell
// ============================

const bell = document.getElementById("notificationBell");
const popup = document.getElementById("notificationPopup");

if(bell && popup){

    bell.addEventListener("click",function(e){

        e.stopPropagation();

        if(popup.style.display==="block"){
            popup.style.display="none";
        }else{
            popup.style.display="block";
        }

    });

    document.addEventListener("click",function(e){

        if(!popup.contains(e.target) && e.target!==bell){
            popup.style.display="none";
        }

    });

}