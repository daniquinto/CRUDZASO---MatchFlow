import { loginUser } from "./auth.js";

const form = document.getElementById("login-form");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMsg.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorMsg.textContent = "Please enter your email and password.";
    return;
  }

  try {
    const user = await loginUser(email, password);

    localStorage.setItem("session", JSON.stringify(user));

    if (user.userType === "company") {
      window.location.href = "/pages/company/dashboard.html";
    } else {
      window.location.href = "/pages/user/candidate-dashboard.html";
    }
  } catch (err) {
    errorMsg.textContent = err?.message || "Login failed. Please try again.";
  }
});
