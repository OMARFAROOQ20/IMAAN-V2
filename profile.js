// ==========================
// Default User Data
// ==========================

if (!localStorage.getItem("userName")) {

    localStorage.setItem("userName", "Guest User");
    localStorage.setItem("userEmail", "guest@imaan.app");
    localStorage.setItem("userCountry", "India");

}

if (!localStorage.getItem("tasbihCount")) {

    localStorage.setItem("tasbihCount", 0);

}

if (!localStorage.getItem("quranCount")) {

    localStorage.setItem("quranCount", 0);

}

if (!localStorage.getItem("duaCount")) {

    localStorage.setItem("duaCount", 0);

}

if (!localStorage.getItem("streakCount")) {

    localStorage.setItem("streakCount", 0);

}


// ==========================
// Load Profile
// ==========================

document.getElementById("userName").innerHTML =
localStorage.getItem("userName");

document.getElementById("userEmail").innerHTML =
localStorage.getItem("userEmail");

const country = localStorage.getItem("userCountry");

document.getElementById("userCountry").innerHTML =
"📍 " + (country ? country : "India");

document.getElementById("tasbihCount").innerHTML =
localStorage.getItem("tasbihCount");

document.getElementById("quranCount").innerHTML =
localStorage.getItem("quranCount") + " Surahs";

document.getElementById("duaCount").innerHTML =
localStorage.getItem("duaCount");

document.getElementById("streakCount").innerHTML =
localStorage.getItem("streakCount") + " Days";


// ==========================
// Settings Buttons
// ==========================

const buttons = document.querySelectorAll(".setting-btn");

buttons[0].onclick = () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

    }else{

        localStorage.setItem("theme","dark");

    }

};

buttons[1].onclick = () => {

    alert("🔔 Prayer Notifications coming soon.");

};

buttons[3].onclick = () => {

    if (navigator.share) {

        navigator.share({

            title: "IMAAN App",

            text: "Download the IMAAN Islamic App."

        });

    } else {

        alert("Sharing is not supported on this device.");

    }

};

buttons[4].onclick = () => {

    alert("IMAAN V2\n\nYour Personal Islamic Companion.");

};

buttons[5].onclick = () => {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.clear();

        window.location.href = "../index.html";

    }

};
// ======================
// Change Profile Picture
// ======================

const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

document.getElementById("changePhoto").onclick = () => {

imageUpload.click();

};

imageUpload.onchange = function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

profileImage.src = e.target.result;

localStorage.setItem(
"profilePhoto",
e.target.result
);

}

reader.readAsDataURL(file);

}

};

// Load Saved Photo

const savedPhoto =
localStorage.getItem("profilePhoto");

if(savedPhoto){

profileImage.src = savedPhoto;

}


// ======================
// Edit Profile
// ======================

document.getElementById("editProfile").onclick=()=>{

modal.style.display="flex";

document.getElementById("editName").value=
localStorage.getItem("userName");

document.getElementById("editEmail").value=
localStorage.getItem("userEmail");

document.getElementById("editCountry").value=
localStorage.getItem("userCountry");

};

document.getElementById("closeModal").onclick=()=>{

modal.style.display="none";

};

document.getElementById("saveProfile").onclick=()=>{

localStorage.setItem(
"userName",
document.getElementById("editName").value
);

localStorage.setItem(
"userEmail",
document.getElementById("editEmail").value
);

localStorage.setItem(
"userCountry",
document.getElementById("editCountry").value
);

location.reload();

};
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    document.body.classList.add("light-mode");

}