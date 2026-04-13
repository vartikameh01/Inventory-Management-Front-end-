const API = "http://localhost:8080";
let users = [];

// LOAD USERS
function loadUsers() {
    fetch(API + "/users")
    .then(res => res.json())
    .then(data => {
        users = data.data || [];
        displayUsers(users);
    });
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
                <td class="${user.role}">${user.role}</td>
                <td class="active-status">Active</td>
                <td>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ADD USER
function addUser() {
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    fetch(API + "/register", {
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
    });
}

// DELETE USER
function deleteUser(id) {
    fetch(API + "/users/" + id, {
        method: "DELETE"
    })
    .then(() => loadUsers());
}

// SEARCH
function searchUser() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = users.filter(u => u.name.toLowerCase().includes(value));
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