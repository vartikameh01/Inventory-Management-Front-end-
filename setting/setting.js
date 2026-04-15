const API = "http://localhost:8080";
const token = localStorage.getItem("token");


//  LOGIN CHECK
if (!token) {
    alert("Please login first");
    window.location.href = "index.html";
}


// LOAD PROFILE
async function loadProfile() {
    try {

        const res = await fetch(API + "/user/profile", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();
        const user = data.data;

        document.getElementById("name").value = user.name || "";
        document.getElementById("email").value = user.email || "";

    } catch (err) {
        console.log(err);
    }
}


// SAVE PROFILE
async function saveProfile() {

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    try {

        await fetch(API + "/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        showMessage("Profile updated", "success");

    } catch (err) {
        showMessage("Error updating profile", "error");
    }
}


// UPDATE PASSWORD
async function updatePassword() {

    const currentPassword = document.getElementById("current").value;
    const newPassword = document.getElementById("newPass").value;
    const confirmPassword = document.getElementById("confirmPass").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        showMessage("Fill all fields", "error");
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage("Passwords do not match", "error");
        return;
    }

    try {

        const res = await fetch(API + "/user/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await res.json();
        showMessage(data.message || "Password updated", "success");

    } catch (err) {
        showMessage("Error updating password", "error");
    }
}


// SAVE NOTIFICATIONS
async function saveNotifications() {

    const data = {
        emailNotifications: document.getElementById("emailNotify").checked,
        lowStockAlerts: document.getElementById("stockNotify").checked
    };

    try {

        await fetch(API + "/user/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        showMessage("Preferences saved", "success");

    } catch (err) {
        showMessage("Error saving preferences", "error");
    }
}


// GENERAL SETTINGS
async function saveGeneral() {

    const darkMode = document.getElementById("darkMode").checked;
    const language = document.getElementById("language").value;

    // UI update
    if (darkMode) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    try {

        await fetch(API + "/user/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ darkMode, language })
        });

        showMessage("Settings saved", "success");

    } catch (err) {
        showMessage("Error saving settings", "error");
    }
}


// LOGOUT
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}


// MESSAGE UI
function showMessage(msg, type) {

    let old = document.getElementById("msg");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "msg";
    div.innerText = msg;

    div.style.padding = "10px";
    div.style.marginTop = "10px";
    div.style.textAlign = "center";

    if (type === "success") {
        div.style.background = "green";
        div.style.color = "white";
    } else {
        div.style.background = "red";
        div.style.color = "white";
    }

    document.querySelector(".main").prepend(div);
}


// INIT
loadProfile();
