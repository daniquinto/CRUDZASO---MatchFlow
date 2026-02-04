const API = "http://localhost:3000";

let editingId = null;

// Session
const currentSession = JSON.parse(localStorage.getItem("session") || "null");

if (!currentSession) {
  window.location.href = "../../index.html";
}

if (currentSession.role !== "company") {
  window.location.href = "../user/candidate-dashboard.html";
}

const companyIdNum = Number(currentSession.id);

document.addEventListener("DOMContentLoaded", () => {
  const offersList = document.getElementById("offersList");
  const emptyState = document.getElementById("emptyState");
  const searchInput = document.getElementById("searchInput");
  const companyName = document.getElementById("companyName");
  const newOfferBtn = document.getElementById("newOfferBtn");

  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalDeleteBtn = document.getElementById("modalDeleteBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalSaveBtn = document.getElementById("modalSaveBtn");
  const modalError = document.getElementById("modalError");
  const offerForm = document.getElementById("offerForm");

  const fTitle = document.getElementById("fTitle");
  const fDescription = document.getElementById("fDescription");
  const fLocation = document.getElementById("fLocation");
  const fEmploymentType = document.getElementById("fEmploymentType");
  const fStatus = document.getElementById("fStatus");

  if (
    !offersList ||
    !emptyState ||
    !metricOffers ||
    !searchInput ||
    !companyName ||
    !newOfferBtn
  ) {
    console.error("Missing required DOM element(s). Check HTML IDs.");
    return;
  }

  companyName.textContent = currentSession.name || "—";

  let offers = [];

  searchInput.addEventListener("input", renderOffers);
  newOfferBtn.addEventListener("click", onNewOffer);

  closeModalBtn.addEventListener("click", closeModal);
  modalSaveBtn.addEventListener("click", onSaveOffer);

  loadOffers();

  async function loadOffers() {
    try {
      const res = await fetch(`${API}/jobOffers`);

      if (!res.ok) throw new Error(res.status);

      const allOffers = await res.json();

      offers = allOffers.filter(
        (o) => Number(o.companyId) === companyIdNum
      );

      renderOffers();
    } catch (err) {
      console.error("loadOffers failed:", err);
      offersList.innerHTML =
        "<li class='px-6 py-5 text-sm text-gray-500'>Could not load offers.</li>";
      emptyState.classList.add("hidden");
      metricOffers.textContent = "—";
    }
  }

  function renderOffers() {
    const q = (searchInput.value || "").trim().toLowerCase();

    const filtered = offers.filter((o) =>
      String(o.title || "").toLowerCase().includes(q)
    );

    offersList.innerHTML = "";
    metricOffers.textContent = `${filtered.length}`;

    if (filtered.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    filtered.forEach((job) => {
      const li = document.createElement("li");
      li.className = "px-6 py-5";

      const statusClass =
        job.status === "open"
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-700";

      li.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-extrabold text-deep">
              ${escapeHTML(job.title || "Untitled")}
            </h3>

            <p class="mt-1 text-xs text-ink/60">
              ${escapeHTML(job.location || "—")} • ${escapeHTML(
        job.employmentType || "—"
      )}
            </p>

            <p class="mt-2 text-xs text-ink/80">
              ${escapeHTML(job.description || "")}
            </p>

            <span class="inline-block mt-2 rounded-full px-2 py-1 text-[11px] ${statusClass}">
              ${escapeHTML(job.status || "—")}
            </span>
          </div>

          <button
            class="editBtn text-xs font-bold text-sky"
            data-id="${job.id}"
          >
            Edit
          </button>
        </div>
      `;

      offersList.appendChild(li);
    });

    hookEditButtons();
  }

  function hookEditButtons() {
  offersList.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);

      const offer = offers.find(
        (o) => Number(o.id) === id
      );

      if (!offer) return;

      editingId = id;
      modalTitle.textContent = "Edit Job Offer";
      modalDeleteBtn.classList.remove("hidden");

      offerForm.reset();
      setFormFromOffer(offer);
      openModal();
    });
  });
}


  function onNewOffer() {
    editingId = null;
    modalTitle.textContent = "New Job Offer";
    modalDeleteBtn.classList.add("hidden");
    offerForm.reset();

    fStatus.value = "open";
    fEmploymentType.value = "Full-time";

    openModal();
  }

  function openModal() {
    modalOverlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    modalError.classList.add("hidden");
    modalError.textContent = "";
    editingId = null;
  }

  function showError(msg) {
    modalError.textContent = msg;
    modalError.classList.remove("hidden");
  }

  function todayISODate() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function getOfferPayloadFromForm() {
    return {
      companyId: companyIdNum,
      title: fTitle.value.trim(),
      description: fDescription.value.trim(),
      location: fLocation.value.trim(),
      employmentType: fEmploymentType.value,
      status: fStatus.value,
      createdAt: todayISODate(),
    };
  }

  function setFormFromOffer(offer) {
    fTitle.value = offer.title || "";
    fDescription.value = offer.description || "";
    fLocation.value = offer.location || "";
    fEmploymentType.value = offer.employmentType || "";
    fStatus.value = offer.status || "";
  }

  async function onSaveOffer() {
    modalError.classList.add("hidden");
    modalError.textContent = "";

    const payload = getOfferPayloadFromForm();

    if (!payload.title) return showError("Title is required.");
    if (!payload.location) return showError("Location is required.");
    if (!payload.employmentType)
      return showError("Employment Type is required.");
    if (!payload.status) return showError("Status is required.");
    if (!payload.description)
      return showError("Description is required.");

    try {
      const url = editingId
        ? `${API}/jobOffers/${editingId}`
        : `${API}/jobOffers`;

      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.status);
      }

      closeModal();
      await loadOffers();
    } catch (err) {
      console.error(err);
      showError("Could not save offer.");
    }
  }

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
