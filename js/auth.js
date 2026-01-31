import * as cru from "./storage.js";

export async function registerUser(role, name, email, password, confirm) {
    if(!role) {
        throw new Error("please select a role");
    };
    if(password != confirm){
        throw new Error("passwords do not match");
    };
    
    if (role === "company"){
        const companies = await cru.getCompanies();
        const exists = companies.find(c => c.email === email);
        if (exists) throw new Error("Company email already registered");
        const newCompany = {
            role: "company",
            name,
            email,
            password,
            industry: "",
            size: "",
            location: "",
            description: "",
        };
        return await cru.createCompany(newCompany);
    }
    if (role === "candidate"){
        const candidates = await cru.getCandidates();
        const exists = candidates.find(c => c.email === email);
        if (exists) throw new Error("Company email already registered");
        const newCandidate = {
            role: "candidate",
            name,
            email,
            password,
            title: "",
            skills: [],
            openToWork: true,
            location: "",
            experienceYears: 0
        };
        return await cru.createCandidate(newCandidate);
    }
    throw new Error("Invalid role");
}

//login User
import { getCompanies, getCandidates } from "./storage.js";

export async function loginUser(email, password) {
    const companies = await getCompanies();
    const candidates = await getCandidates();

    const company = companies.find(
        c => c.email === email && c.password === password
    );

    if (company) {
        return { ...company, userType: "company" };
    }

    const candidate = candidates.find(
        c => c.email === email && c.password === password
    );

    if (candidate) {
        return { ...candidate, userType: "candidate" };
    }

    throw new Error("Invalid email or password");
}

