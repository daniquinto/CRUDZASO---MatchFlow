import * as cru from "./storage.js";

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export async function registerUser(role, name, email, password, confirm) {
  if (!role) {
    throw new Error("Please select a role");
  }

  if (password !== confirm) {
    throw new Error("Passwords do not match");
  }

  const safeEmail = normalizeEmail(email);

  const existing = await cru.getUsersByEmail(safeEmail);
  const emailTaken = existing.length > 0;

  if (emailTaken) {
    throw new Error("Email already registered");
  }

  if (role === "company") {
    const user = await cru.createUser({
      role: "company",
      name: String(name || "").trim(),
      email: safeEmail,
      password
    });

    return await cru.createCompany({
      userId: user.id,
      industry: "",
      size: "",
      location: "",
      description: ""
    });
  }

  if (role === "candidate") {
    const user = await cru.createUser({
      role: "candidate",
      name: String(name || "").trim(),
      email: safeEmail,
      password
    });

    return await cru.createCandidate({
      userId: user.id,
      title: "",
      skills: [],
      openToWork: true,
      location: "",
      experienceYears: 0
    });
  }

  throw new Error("Invalid role");
}

export async function loginUser(email, password) {
  const safeEmail = normalizeEmail(email);

  const user = await cru.getUserByEmailAndPassword(safeEmail, password);
  if (!user) throw new Error("Invalid email or password");

  if (user.role === "company") {
    const profile = await cru.getCompanyByUserId(user.id);
    return { ...user, ...(profile || {}), userType: "company" };
  }

  if (user.role === "candidate") {
    const profile = await cru.getCandidateByUserId(user.id);
    return { ...user, ...(profile || {}), userType: "candidate" };
  }

  throw new Error("Invalid role");
}
