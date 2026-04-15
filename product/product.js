const API = "https://inventory-management-2-t0u8.onrender.com/";
alert("JS Loaded");
let products = [];


// LOAD PRODUCTS
async function loadProducts() {
    try {
        const res = await fetch(API + "/getproduct");
        const data = await res.json();

        console.log("Products:", data);

        products = data.data || [];
        displayProducts(products);

    } catch (err) {
        console.log("Error loading products:", err);
    }
}


// DISPLAY PRODUCTS
function displayProducts(list) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    list.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category || "-"}</td>
                <td>₹${p.price || 0}</td>
                <td>${p.quantity}</td>
                <td>${p.supplier || "-"}</td>
                <td>${p.description || "-"}</td>
                <td>
                    <button onclick="deleteProduct('${p._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ADD PRODUCT
async function addProduct() {
    alert("clicked")

    const data = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        supplier: document.getElementById("supplier").value,
        description: document.getElementById("description").value
    };

    if (!data.name) {
        alert("Product name is required");
        return;
    }

    try {

        const res = await fetch(API + "/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Added:", result);

        closeForm();
        loadProducts();

    } catch (err) {
        console.log("Error adding product:", err);
    }
}


// DELETE PRODUCT
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    try {

        await fetch(API + "/product/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        loadProducts();

    } catch (err) {
        console.log("Delete error:", err);
    }
}


// SEARCH
async function  searchProduct() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = await products.filter(p =>
        p.name.toLowerCase().includes(value) ||
        (p.category || "").toLowerCase().includes(value)
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


// INIT
loadProducts();
