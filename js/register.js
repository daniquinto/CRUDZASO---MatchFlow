const cards = document.querySelectorAll(".role-card");
const roleInput = document.getElementById("role");
const form = document.getElementById("register-form");
const errorMsg = document.getElementById("errorMsg");

let selectedRole = null;

cards.forEach(card => {
    card.addEventListener("click", () => {
        selectedRole = card.id;
        roleInput.value = selectedRole;

        cards.forEach(c => {
            c.classList.remove("border-blue-500", "ring-2", "ring-blue-500");
            c.classList.add("border-gray-300");
        });

        card.classList.remove("border-gray-300");
        card.classList.add("border-blue-500", "ring-2", "ring-blue-500");

        errorMsg.textContent = "";
    });
});

