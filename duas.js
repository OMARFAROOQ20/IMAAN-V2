/* ===========================
   IMAAN V2 - Daily Duas
=========================== */

// Search Box
const searchInput = document.getElementById("searchInput");

// Display Elements
const duaTitle = document.getElementById("duaTitle");
const duaArabic = document.getElementById("duaArabic");
const duaEnglish = document.getElementById("duaEnglish");

// Dua Database
const duas = {

morning:{
title:"Morning Dua",
arabic:"اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
english:"O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection."
},

evening:{
title:"Evening Dua",
arabic:"اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
english:"O Allah, by You we enter the evening, by You we enter the morning, by You we live, by You we die, and to You is the final return."
},

food:{
title:"Before Eating",
arabic:"بِسْمِ اللَّهِ",
english:"In the name of Allah."
},

sleep:{
title:"Before Sleeping",
arabic:"اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
english:"O Allah, in Your Name I die and I live."
},

travel:{
title:"Travel Dua",
arabic:"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
english:"Glory is to Him Who has subjected this to us, and we could never have it by our efforts."
},

parents:{
title:"Parents Dua",
arabic:"رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
english:"My Lord, have mercy upon them as they brought me up when I was small."
},

masjid:{
title:"Entering Mosque",
arabic:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
english:"O Allah, open for me the doors of Your mercy."
},

illness:{
title:"Dua for Illness",
arabic:"اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي",
english:"O Allah, Lord of mankind, remove the suffering and grant healing. You are the Healer."
},

rizq:{
title:"Dua for Rizq",
arabic:"اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
english:"O Allah, suffice me with what You have made lawful instead of what You have forbidden, and make me independent by Your bounty."
}

};

// Show Dua
function showDua(name){

const dua = duas[name];

duaTitle.innerHTML = dua.title;

duaArabic.innerHTML = dua.arabic;

duaEnglish.innerHTML = dua.english;

}

// Search Function
searchInput.addEventListener("keyup",function(){

const text = this.value.toLowerCase();

const cards = document.querySelectorAll(".dua-card");

cards.forEach(card=>{

const title = card.innerText.toLowerCase();

if(title.includes(text)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});