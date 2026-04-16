const API = "https://inventory-management-2-t0u8.onrender.com";
let users = [];

// LOAD USERS
async function loadUsers() {
    await fetch(API + "/register")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        users = data.data || [];
        displayUsers(users);
    })
    .catch(err => console.log("Error loading users:", err));
}

// DISPLAY USERS
function displayUsers(list) {
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    list.forEach(user => {
        table.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="active-status">Active</td>
                <td>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ADD USER
async function addUser() {

    // alert("Hi")
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    // Password validation (same as schema)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be strong (8+ chars, A-Z, a-z, number & special char)");
        return;
    }

    const data = { name, email, password };

   await fetch(API + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        closeForm();
        loadUsers();
    })
    .catch(err => console.log("Error adding user:", err));
}

// DELETE USER
function deleteUser(id) {
    if (!confirm("Delete this user?")) return;

    fetch(API + "/users/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(() => loadUsers())
    .catch(err => console.log("Delete error:", err));
}

// SEARCH USER
function searchUser() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );

    displayUsers(filtered);
}

// MODAL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}

// INIT
loadUsers();
