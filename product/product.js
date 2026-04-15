const API = "http://localhost:8080"; // change to deployed URL later
const token = localStorage.getItem("token");

let products = [];

// CHECK LOGIN
if (!token) {
    alert("Please login first");
    window.location.href = "index.html";
}


// LOAD PRODUCTS
function loadProducts() {
    fetch(API + "/product", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        products = data.data || [];
        displayProducts(products);
    })
    .catch(err => console.log(err));
}


// DISPLAY PRODUCTS
function displayProducts(list) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    list.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>₹${p.price}</td>
                <td>${p.quantity}</td>
                <td>${p.supplier}</td>
                <td>${p.description}</td>
                <td>
                    <button onclick="deleteProduct('${p._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ADD PRODUCT
function addProduct() {

    const name = document.getElementById("name").value;

    if (!name) {
        alert("Product name is required");
        return;
    }

    const data = {
        name,
        category: document.getElementById("category").value,
        price: Number(document.getElementById("price").value),
        quantity: Number(document.getElementById("quantity").value),
        supplier: document.getElementById("supplier").value,
        description: document.getElementById("description").value
    };

    fetch(API + "/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        closeForm();
        loadProducts();
    })
    .catch(err => console.log(err));
}


// DELETE PRODUCT
function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    fetch(API + "/product/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(() => loadProducts())
    .catch(err => console.log(err));
}


// SEARCH
function searchProduct() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
    );

    displayProducts(filtered);
}


// MODAL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}


// LOGOUT
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}


// INIT
loadProducts();
