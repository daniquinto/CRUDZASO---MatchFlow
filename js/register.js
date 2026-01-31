import { registerUser } from "./auth.js";

const cards = document.querySelectorAll(".role-card");
const roleInput = document.getElementById("role");
const form = document.getElementById("register-form");
const errorMsg = document.getElementById("errorMsg");

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
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (!role) {
        errorMsg.textContent = "Please select a role";
        return;
    }

    try {
        await registerUser(role, name, email, password, confirm);
        window.location.href = "login.html";
    } catch (err) {
        errorMsg.textContent = err.message;
    }
});
