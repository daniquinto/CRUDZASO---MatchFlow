import { loginUser } from "./auth.js";

const form = document.getElementById("login-form");
const errorMsg = document.getElementById("errorMsg");
const cards = document.querySelectorAll(".role-card");
const roleInput = document.getElementById("role");

cards.forEach(card => {
    card.addEventListener("click", () => {
        roleInput.value = card.id;

        cards.forEach(c => {
        c.classList.remove("border-blue-500", "ring-2", "ring-blue-500");
        c.classList.add("border-gray-300");
        });

        card.classList.remove("border-gray-300");
        card.classList.add("border-blue-500", "ring-2", "ring-blue-500");

        errorMsg.textContent = "";
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = roleInput.value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!role) {
        errorMsg.textContent = "Please select a role";
        return;
    }

    try {
        const user = await loginUser(email, password);

        // VALIDAR que el rol coincida
        if (user.userType !== role) {
        throw new Error(`You are registered as ${user.userType}`);
        }

        // guardar sesión
        localStorage.setItem("session", JSON.stringify(user));

        // redirección por rol
        if (user.userType === "company") {
        window.location.href = "/pages/company/dashboard.html";
        } else {
        window.location.href = "/pages/candidate/dashboard.html";
        }

    } catch (err) {
        errorMsg.textContent = err.message;
    }
});
