/* ===========================
   IMAAN V2 Tasbih Counter
=========================== */

// HTML Elements
const counter = document.getElementById("counter");
const tapBtn = document.getElementById("tapBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");
const goalSelect = document.getElementById("goalSelect");
const zikrSelect = document.getElementById("zikrSelect");
const zikrName = document.getElementById("zikrName");
const status = document.getElementById("status");

// Load saved data
let count = parseInt(localStorage.getItem("tasbihCount")) || 0;
let goal = parseInt(localStorage.getItem("tasbihGoal")) || 33;
let zikr = localStorage.getItem("tasbihZikr") || "Subhan Allah";

// Apply saved values
goalSelect.value = goal;
zikrSelect.value = zikr;
zikrName.innerHTML = zikr;

// Update screen
updateCounter();

// =============================
// Tap Button
// =============================
tapBtn.addEventListener("click", () => {

    count++;

    // Phone vibration
    if (navigator.vibrate) {
        navigator.vibrate(40);
    }

    updateCounter();

});

// =============================
// Reset Button
// =============================
resetBtn.addEventListener("click", () => {

    if(confirm("Reset Tasbih Counter?")){

        count = 0;

        updateCounter();

    }

});

// =============================
// Goal Change
// =============================
goalSelect.addEventListener("change", () => {

    goal = parseInt(goalSelect.value);

    updateCounter();

});

// =============================
// Dhikr Change
// =============================
zikrSelect.addEventListener("change", () => {

    zikr = zikrSelect.value;

    zikrName.innerHTML = zikr;

    saveData();

});

// =============================
// Update Counter
// =============================
function updateCounter(){

    counter.innerHTML = count;

    progressBar.max = goal;

    progressBar.value = count;

    goalText.innerHTML = count + " / " + goal;

    if(count >= goal){

        status.innerHTML = "🎉 Masha Allah! Goal Completed";

        if(navigator.vibrate){

            navigator.vibrate([200,100,200]);

        }

    }

    else{

        status.innerHTML = "Keep Remembering Allah 🤲";

    }

    saveData();

}

// =============================
// Save Data
// =============================
function saveData(){

    localStorage.setItem("tasbihCount",count);

    localStorage.setItem("tasbihGoal",goal);

    localStorage.setItem("tasbihZikr",zikr);

}