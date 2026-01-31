export function requireAuth(requiredRole = null) {
    const session = JSON.parse(localStorage.getItem("session"));

    if (!session) {
        window.location.href = "/pages/login.html";
        return;
    }

    if (requiredRole && session.userType !== requiredRole) {
        
        if (session.userType === "company") {
        window.location.href = "...";
        } else {
        window.location.href = "...";
        }
    }
}
