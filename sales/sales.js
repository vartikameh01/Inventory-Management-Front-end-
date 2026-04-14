const API = "http://localhost:8080";
alert("js loaded")
let sales = [];


// LOAD SALES
async function loadSales() {
    try {
        const res = await fetch(API + "/sales");
        const data = await res.json();

        console.log("Sales:", data);

        sales = data.data || [];
        displaySales(sales);

    } catch (err) {
        console.log("Error loading sales:", err);
    }
}


// DISPLAY SALES
function displaySales(list) {
    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    list.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>#INV-${item._id.slice(-4)}</td>
                <td>${item.date ? new Date(item.date).toDateString() : "-"}</td>
                <td>${item.product?.name || "Product"}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>
                    <button onclick="deleteSale('${item._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ADD SALE
async function addSale() {
    alert("clicked")

    const data = {
        product: document.getElementById("product").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value
    };

    console.log("Sending sale:", data);

    try {

        const res = await fetch(API + "/sales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Added sale:", result);

        closeForm();
        await loadSales(); 

    } catch (err) {
        console.log("Error adding sale:", err);
    }
}


// DELETE SALE
async function deleteSale(id) {

    if (!confirm("Delete this sale?")) return;

    try {

        await fetch(API + "/sales/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        await loadSales();

    } catch (err) {
        console.log("Delete error:", err);
    }
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