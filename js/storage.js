const API = "http://localhost:3000"


export async function getCompanies() {
    try {
        const res = await fetch(`${API}/companies`);
        return await res.json();
    } catch (e){
        console.log(e)
        return e
    }
}
export async function getCandidates() {
    try {
        const res = await fetch(`${API}/candidates`);
        return await res.json();
    } catch (e){
        console.log(e)
        return e
    }
}
export async function createCompany(user) {
    const res = await fetch(`${API}/companies`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    return await res.json();
}
export async function createCandidate(user) {
    const res = await fetch(`${API}/candidates`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    return await res.json();
}

