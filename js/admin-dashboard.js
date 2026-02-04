const currentSession = JSON.parse(localStorage.getItem("session"));

const companyId = currentSession.userId

if (!currentSession) {
    window.location.href = "../../index.html";
}

if (currentSession.role === "user") {
    window.location.href = "../user/candidate-dashboard.html"
}

const logoutBtn = document.getElementById("logout-btn")
const createJobOfferBtn = document.getElementById("create-job-offer")

logoutBtn.addEventListener("click", () => {
    clearSession()
    window.location.href = "../../index.html"
})

createJobOfferBtn.addEventListener("click", () => {
    window.location.href = "company-job-offers.html"
})

document.addEventListener("DOMContentLoaded", () => {
    loadOffers();
    loadMatches();
    loadReservations();
    loadHired();
    loadRecentMatches();
});

function loadOffers() {
    fetch("http://localhost:3000/jobOffers")
        .then(response => response.json())
        .then(jobOffers => {
            let count = 0;

            jobOffers.forEach(offer => {
                if (offer.companyId === companyId && offer.status === "open") {
                    count++;
                }
            });

            document.getElementById("offers-cont").textContent = count;
        });
}

function loadMatches() {
    fetch("http://localhost:3000/matches")
        .then(response => response.json())
        .then(matches => {
            let count = 0;

            matches.forEach(match => {
                if (match.companyId === companyId) {
                    count++;
                }
            });

            document.getElementById("matches-cont").textContent = count;
        });
}

function loadReservations() {
    fetch("http://localhost:3000/reservations")
        .then(response => response.json())
        .then(reservations => {
            let count = 0;

            reservations.forEach(reservation => {
                if (
                    reservation.companyId === companyId &&
                    reservation.active === true
                ) {
                    count++;
                }
            });

            document.getElementById("reserved-cont").textContent = count;
        });
}

function loadHired() {
    fetch("http://localhost:3000/matches")
        .then(response => response.json())
        .then(matches => {
            let count = 0;

            matches.forEach(match => {
                if (
                    match.companyId === companyId &&
                    match.status === "hired"
                ) {
                    count++;
                }
            });

            document.getElementById("hired-cont").textContent = count;
        });
}


function loadRecentMatches() {
    fetch(`http://localhost:3000/matches`)
        .then(response => response.json())
        .then(matches => {
            const card = document.querySelector("#recent-matches");
            card.innerHTML = "";

            matches.forEach(match => {
                const div = document.createElement("div");
                div.className = "p-6 flex justify-between items-center";

                div.innerHTML = `
                    <div>
                        <p class="font-medium text-deep">Candidate ${match.candidateId}</p>
                        <p class="text-sm text-deep">${match.createdAt}</p>
                    </div>
                    <span class="text-xs bg-gray-100 px-3 py-1 rounded-full">
                        ${match.status}
                    </span>
                `;

                card.appendChild(div);
            });
        });
}

function clearSession() {
    localStorage.removeItem("session");
}


