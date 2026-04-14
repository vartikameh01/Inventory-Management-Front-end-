const API = "http://localhost:8080";


async function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
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

            alert("Login successful");

            // Redirect
            window.location.href = "dashboard.html";

        } else {
            alert(data.message || "Invalid credentials");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}