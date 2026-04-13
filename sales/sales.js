const API = "http://localhost:8080";
let sales = [];

// LOAD SALES
function loadSales() {
    fetch(API + "/sales")
    .then(res => res.json())
    .then(data => {
        sales = data.data || [];
        displaySales(sales);
    });
}

// DISPLAY SALES
function displaySales(list) {
    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    list.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>#INV-${item._id.slice(-4)}</td>
                <td>${new Date(item.date).toDateString()}</td>
                <td>${item.product?.name || "Product"}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="deleteSale('${item._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ADD SALE
function addSale() {
    const data = {
        product: document.getElementById("product").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value
    };

    fetch(API + "/sales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        closeForm();
        loadSales();
    });
}

// DELETE SALE
function deleteSale(id) {
    fetch(API + "/sales/" + id, {
        method: "DELETE"
    })
    .then(() => loadSales());
}

// MODAL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}

// INIT
loadSales();