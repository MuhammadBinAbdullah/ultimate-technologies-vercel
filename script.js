const form = document.getElementById("registrationForm");
const button = document.getElementById("submitBtn");
const statusMessage = document.getElementById("status");
const successPopup = document.getElementById("successPopup");
const popupOk = document.getElementById("popupOk");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    button.disabled = true;
    button.textContent = "SUBMITTING...";
    statusMessage.className = "";
    statusMessage.style.display = "none";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Registration could not be submitted.");
        }

        form.reset();
        successPopup.classList.add("show");
        popupOk.focus();

    } catch (error) {
        statusMessage.textContent =
            "We couldn't submit your registration. Please try again or check your internet connection.";
        statusMessage.className = "error";

    } finally {
        button.disabled = false;
        button.textContent = "REGISTER FOR FREE →";
    }
});

function closeSuccessPopup() {
    successPopup.classList.remove("show");
}

popupOk.addEventListener("click", closeSuccessPopup);

successPopup.addEventListener("click", function (event) {
    if (event.target === successPopup) closeSuccessPopup();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && successPopup.classList.contains("show")) {
        closeSuccessPopup();
    }
});
