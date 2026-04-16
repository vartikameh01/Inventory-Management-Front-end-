const API = "https://inventory-management-2-t0u8.onrender.com";

// if already logged in go to dashboard
if(localStorage.getItem("token")){
    window.location.href = "../dashboard/dashboard.html";
}

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

            // Save token and user info
            localStorage.setItem("token", data.data.token);
            if(data.data.user){
                localStorage.setItem("userName", data.data.user.name || "User");
                localStorage.setItem("userRole", data.data.user.role || "staff");
                localStorage.setItem("userEmail", data.data.user.email || "");
            }

            alert("Login successful");

            // Redirect
            window.location.href = "../dashboard/dashboard.html";

        } else {
            alert(data.message || "Invalid credentials");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}
