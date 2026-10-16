const pages = document.querySelectorAll(".page");

let generatedOTP = "";
let verifiedEmail = "";
let otpVerified = false;

function showPage(pageId) {
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function showMessage(elementId, message, type = "error") {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = "message " + type;
}

// STEP 1: Forgot Password
document.getElementById("forgotForm").addEventListener("submit",
    function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();

        if (!email) {
            showMessage("forgotMessage", "Please enter your email.");
            return;
        }

        verifiedEmail = email;
        otpVerified = false;

        generateOTP();

        document.getElementById("emailDisplay").textContent = email;
        showMessage(
            "forgotMessage",
            "Demo OTP generated successfully.",
            "success"
        );

        showPage("otpPage");
    }
);

// Generate a six-digit demo OTP
function generateOTP() {
    generatedOTP = String(
        Math.floor(100000 + Math.random() * 900000)
    );

    document.getElementById("demoOtp").textContent =
        "Demo OTP: " + generatedOTP +
        " (For testing only. Not sent by email.)";

    document.getElementById("otp").value = "";
    showMessage("otpMessage", "");
}

// STEP 2: Verify OTP
document.getElementById("otp").addEventListener("input",
    function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 6);
    }
);

document.getElementById("otpForm").addEventListener("submit",
    function(event) {
        event.preventDefault();

        const enteredOTP = document.getElementById("otp").value.trim();

        if (enteredOTP.length !== 6) {
            showMessage("otpMessage",
                "Please enter all 6 digits of the OTP.");
            return;
        }

        if (enteredOTP !== generatedOTP) {
            showMessage("otpMessage",
                "Incorrect OTP. Please try again.");
            return;
        }

        otpVerified = true;

        showMessage("otpMessage",
            "OTP verified successfully!", "success");

        document.getElementById("resetForm").reset();
        showPage("resetPage");
    }
);

// Resend OTP
document.getElementById("resendOtp").addEventListener("click",
    function(event) {
        event.preventDefault();

        generateOTP();

        showMessage("otpMessage",
            "A new demo OTP has been generated.", "success");
    }
);

// Change email
document.getElementById("editEmail").addEventListener("click",
    function(event) {
        event.preventDefault();

        showPage("forgotPage");
        showMessage("forgotMessage", "");
    }
);

// STEP 3: Show or hide passwords
document.querySelectorAll(".toggle").forEach(function(button) {
    button.addEventListener("click", function() {
        const input = document.getElementById(
            this.getAttribute("data-target")
        );

        if (input.type === "password") {
            input.type = "text";
            this.textContent = "Hide";
        } else {
            input.type = "password";
            this.textContent = "Show";
        }
    });
});

// STEP 4: Reset Password
document.getElementById("resetForm").addEventListener("submit",
    function(event) {
        event.preventDefault();

        if (!otpVerified) {
            showMessage("resetMessage",
                "Please verify your OTP first.");
            showPage("otpPage");
            return;
        }

        const password =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            showMessage("resetMessage",
                "Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("resetMessage",
                "Passwords do not match. Please try again.");
            return;
        }

        // Demo only: no password is saved to a server.
        otpVerified = false;
        generatedOTP = "";

        showPage("successPage");
    }
);

// Back to login demo
function backToLogin() {
    showMessage("forgotMessage",
        "Connect this button to your rental app login page.",
        "success");

    showPage("forgotPage");
}

document.getElementById("backToLogin").addEventListener("click",
    function(event) {
        event.preventDefault();
        backToLogin();
    }
);

document.getElementById("finishButton").addEventListener("click",
    backToLogin
);