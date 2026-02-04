const API = "http://localhost:3000"
import { normalizeEmail } from "./auth.js";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!res.ok) {
    //useful error message for debugging
    const body = await res.text().catch(() => "");
    throw new Error(`Request failed: ${options.method || "GET"} ${path} (${res.status}) ${body}`);
  }

   const text = await res.text();
  return text ? JSON.parse(text) : null;
}


/**
 * Fetch all users
 */
export async function getUsers() {
  return await request(`/users`);
}


/**
 * fetch users by email using json-server filtering
 */
export async function getUsersByEmail(email) {
  const safeEmail = normalizeEmail(email);
  return await request(`/users?email=${encodeURIComponent(safeEmail)}`);
}


export async function getUserByEmailAndPassword(email, password) {
  const safeEmail = normalizeEmail(email);
  const users = await request(
    `/users?email=${encodeURIComponent(safeEmail)}&password=${encodeURIComponent(password)}`
  );
  return users[0] || null;
}

export async function createUser(user) {
  const payload = {
    ...user,
    email: normalizeEmail(user.email)
  };
  return await request(`/users`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}


/* ──────────────────────────────────────────────────────────────
   PROFILES
   - companies and candidates tables store role-specific fields
   - each profile references the user via userId
   ────────────────────────────────────────────────────────────── */

export async function getCompanies() {
  return await request(`/companies`);
}

export async function getCandidates() {
  return await request(`/candidates`);
}


export async function getCompanyByUserId(userId) {
  const rows = await request(`/companies?userId=${encodeURIComponent(userId)}`);
  return rows[0] || null;
}

export async function getCandidateByUserId(userId) {
  const rows = await request(`/candidates?userId=${encodeURIComponent(userId)}`);
  return rows[0] || null;
}




/**
 * Appends a new company into users[0].companies 
 */

export async function createCompany(companyProfile) {
  return await request(`/companies`, {
    method: "POST",
    body: JSON.stringify(companyProfile)
  });
}


/**
 * Appends a new candidate into users[0].candidates 
 */
export async function createCandidate(candidateProfile) {
  return await request(`/candidates`, {
    method: "POST",
    body: JSON.stringify(candidateProfile)
  });
}