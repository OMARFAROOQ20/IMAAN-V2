// Google Login

document.getElementById("googleLogin").onclick = async function () {

    try {

        const result = await window.signInWithPopup(
            window.auth,
            window.provider
        );

        localStorage.setItem(
            "userName",
            result.user.displayName
        );

        window.location = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

};


// Send OTP

let confirmationResult;

document.getElementById("sendOTP").onclick = async function () {

    const phone = document.getElementById("phoneNumber").value;

    window.recaptcha = new window.RecaptchaVerifier(
        window.auth,
        "recaptcha-container",
        {}
    );

    confirmationResult =
        await window.signInWithPhoneNumber(
            window.auth,
            phone,
            window.recaptcha
        );

    alert("OTP Sent");

};


// Verify OTP

document.getElementById("verifyOTP").onclick = async function () {

    const otp = document.getElementById("otp").value;

    try {

        const result = await confirmationResult.confirm(otp);

        localStorage.setItem(
            "userName",
            result.user.phoneNumber
        );

        window.location = "dashboard.html";

    }

    catch (e) {

        alert("Invalid OTP");

    }

};