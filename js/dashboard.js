// function getCurrentCompanyId() {
//     const session = JSON.parse(sessionStorage.getItem("companySession"));
//     if (!session) {
//         window.location.href = "index.html"
//     };

//     return fetch("http://localhost:3000/companies")
//         .then(res => res.json())
//         .then(companies => {
//             let id = 0;

//             companies.forEach(company => {
//                 if (company.name === session.name) {
//                     id = company.id;
//                 }
//             });

//             return id;
//         });
// }
// const currentCompanyId =  getCurrentCompanyId()

const currentCompanyId = 1;

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
                if (offer.companyId === currentCompanyId && offer.status === "open") {
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
                if (match.companyId === currentCompanyId) {
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
                    reservation.companyId === currentCompanyId &&
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
                    match.companyId === currentCompanyId &&
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
            const container = document.querySelector(".divide-y");
            container.innerHTML = "";

            matches.forEach(match => {
                const div = document.createElement("div");
                div.className = "p-6 flex justify-between items-center";

                div.innerHTML = `
                    <div>
                        <p class="font-medium text-deep">Candidate #${match.candidateId}</p>
                        <p class="text-sm text-deep">Status: ${match.status}</p>
                    </div>
                    <span class="text-xs bg-gray-100 px-3 py-1 rounded-full">
                        ${match.status}
                    </span>
                `;

                container.appendChild(div);
            });
        });
}
