const currentSession = JSON.parse(localStorage.getItem("session"));

if (!currentSession) {
    window.location.href = "../../index.html";
}

if (currentSession.role !== "company") {
    window.location.href = "../user/candidate-profile.html";
}

// Buttons & Modal
const cancelEditBtn = document.getElementById("cancel-edit");
const logoutBtn = document.getElementById("logout-btn");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editBtn = document.getElementById("edit-btn");

// Profile Display
const companyName = document.getElementById("company-name");
const companyLocation = document.getElementById("company-place");
const companyDes = document.getElementById("company-description");
const companyIndustry = document.getElementById("company-industry");
const companyEmployeesNum = document.getElementById("company-employees");
const activeJobsList = document.getElementById("active-job-list")

// Edit form inputs
const editName = document.getElementById("edit-name");
const editIndustry = document.getElementById("edit-industry");
const editLocation = document.getElementById("edit-location");
const editEmployees = document.getElementById("edit-employees-number");
const editDescription = document.getElementById("edit-description");

// Initial render
renderProfile();

// Event Listeners
editBtn.addEventListener("click", () => {
    editName.value = currentSession.name || "";
    editIndustry.value = currentSession.industry || "";
    editLocation.value = currentSession.location || "";
    editEmployees.value = currentSession.size || "";
    editDescription.value = currentSession.description || "";

    editModal.className =
        "bg-gray-100 min-h-screen absolute inset-0 bg-black bg-opacity-60";
});

cancelEditBtn.addEventListener("click", () => {
    editModal.className = "hidden";
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "../../index.html";
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const companyUpdates = {
        industry: editIndustry.value.trim() || currentSession.industry,
        location: editLocation.value.trim() || currentSession.location,
        size: editEmployees.value || currentSession.size,
        description: editDescription.value.trim() || currentSession.description
    };

    const userUpdates = {
        name: editName.value.trim() || currentSession.name
    };

    // Update company
    await fetch(`http://localhost:3000/companies/${currentSession.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyUpdates)
    });

    // Update user
    await fetch(`http://localhost:3000/users/${currentSession.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdates)
    });

    // Sync session in memory
    Object.assign(currentSession, companyUpdates, userUpdates);

    // Persist session
    localStorage.setItem("session", JSON.stringify(currentSession));

    // Update UI
    renderProfile();

    editModal.className = "hidden";
});

// Helpers
function renderProfile() {
    companyName.textContent = currentSession.name || "";
    companyIndustry.textContent = currentSession.industry || "Company industry";
    companyLocation.textContent =
        currentSession.location || "Location of the Company";
    companyEmployeesNum.textContent =
        currentSession.size || "Amount of employees";
    companyDes.textContent =
        currentSession.description ||
        "Here you can give a description of your company.";

    renderActiveJobs();
}

async function renderActiveJobs() {
    activeJobsList.innerHTML = "";

    const response = await fetch("http://localhost:3000/jobOffers");
    const jobOffers = await response.json();

    const companyJobs = jobOffers.filter(
        job =>
            job.companyId === Number(currentSession.id) &&
            job.status === "open"
    );

    if (companyJobs.length === 0) {
        activeJobsList.innerHTML =
            "<p class='text-sm text-gray-500'>No active job offers</p>";
        return;
    }

    companyJobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "border rounded-lg p-4 space-y-2";

        card.innerHTML = `
            <p class="text-base font-medium">${job.title}</p>
            <p class="text-sm text-gray-700">${job.description}</p>
            <p class="text-xs text-gray-500">
                ${job.employmentType} - ${job.location}
            </p>
        `;

        activeJobsList.appendChild(card);
    });
}
