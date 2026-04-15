const API = "http://localhost:8080";
const token = localStorage.getItem("token");


// LOAD PROFILE DATA
async function loadProfile(){
    try{

        const res = await fetch(API + "/user/profile", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();
        const user = data.data;

        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone || "";

    }catch(err){
        console.log("Load profile error:", err);
    }
}


// SAVE PROFILE
async function saveProfile(){

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    try{

        const res = await fetch(API + "/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        await res.json();
        alert("Profile Updated");

    }catch(err){
        console.log("Save profile error:", err);
    }
}


// UPDATE PASSWORD
async function updatePassword(){

    const currentPassword = document.getElementById("currentPass").value;
    const newPassword = document.getElementById("newPass").value;
    const confirmPassword = document.getElementById("confirmPass").value;

    if(newPassword !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    try{

        const res = await fetch(API + "/user/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await res.json();
        alert(data.message || "Password Updated");

    }catch(err){
        console.log("Password error:", err);
    }
}


// SAVE NOTIFICATIONS
async function saveNotifications(){

    const data = {
        emailNotifications: document.getElementById("emailNotify").checked,
        pushNotifications: document.getElementById("pushNotify").checked,
        lowStockAlerts: document.getElementById("stockAlert").checked
    };

    try{

        await fetch(API + "/user/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        alert("Preferences Saved");

    }catch(err){
        console.log("Notification error:", err);
    }
}


// GENERAL SETTINGS
async function saveGeneral(){

    const data = {
        language: document.getElementById("language").value,
        currency: document.getElementById("currency").value,
        darkMode: document.getElementById("darkMode").checked
    };

    // UI change
    if(data.darkMode){
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    try{

        await fetch(API + "/user/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        alert("Settings Saved");

    }catch(err){
        console.log("General settings error:", err);
    }
}


// INIT
loadProfile();


window.saveProfile = saveProfile;
window.updatePassword = updatePassword;
window.saveNotifications = saveNotifications;
window.saveGeneral = saveGeneral;
