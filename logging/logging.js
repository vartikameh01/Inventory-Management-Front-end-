const API = "http://localhost:8080";


// AUTO CHECK (already logged in)
function checkLogin() {
    const token = localStorage.getItem("token");

    if (token) {
        window.location.href = "dashboard.html";
    }
}


// LOGIN FUNCTION
async function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showMessage("Please fill all fields", "error");
        return;
    }

    try {

        const res = await fetch(API + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.data && data.data.token) {

            // Save token
            localStorage.setItem("token", data.data.token);

            showMessage("Login successful", "success");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {
            showMessage(data.message || "Invalid credentials", "error");
        }

    } catch (err) {
        console.log(err);
        showMessage("Server error", "error");
    }
}


// MESSAGE FUNCTION (Better UI)
function showMessage(msg, type) {

    let oldMsg = document.getElementById("msg");
    if (oldMsg) oldMsg.remove();

    const div = document.createElement("div");
    div.id = "msg";
    div.innerText = msg;

    div.style.padding = "10px";
    div.style.marginTop = "10px";
    div.style.borderRadius = "5px";
    div.style.textAlign = "center";

    if (type === "success") {
        div.style.background = "#4CAF50";
        div.style.color = "white";
    } else {
        div.style.background = "#f44336";
        div.style.color = "white";
    }

    document.querySelector(".card").appendChild(div);
}


// ENTER KEY SUPPORT 🔥
function handleEnter(event) {
    if (event.key === "Enter") {
        loginUser();
    }
}


// INIT
checkLogin();

// attach enter event
document.getElementById("password").addEventListener("keypress", handleEnter);
