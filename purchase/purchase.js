const API = "http://localhost:8080";
let purchases = [];


// LOAD PURCHASES
async function loadPurchases() {
    try {
        const res = await fetch(API + "/purchase");
        const data = await res.json();

        console.log("Purchases:", data);

        purchases = data.data || [];
        displayPurchases(purchases);

    } catch (err) {
        console.log("Error loading purchases:", err);
    }
}


// DISPLAY PURCHASES
function displayPurchases(list) {
    const table = document.getElementById("purchaseTable");
    table.innerHTML = "";

    list.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${new Date(item.date).toDateString()}</td>
                <td>${item.product?.name || item.product}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>${item.supplier?.name || item.supplier}</td>
                <td>
                    <button onclick="deletePurchase('${item._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ADD PURCHASE
async function addPurchase() {

    const data = {
        product: document.getElementById("product").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        supplier: document.getElementById("supplier").value
    };

    console.log("Sending purchase:", data);

    try {

        const res = await fetch(API + "/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Added purchase:", result);

        closeForm();
        await loadPurchases();  

    } catch (err) {
        console.log("Error adding purchase:", err);
    }
}


// DELETE PURCHASE
async function deletePurchase(id) {

    if (!confirm("Delete this purchase?")) return;

    try {

        await fetch(API + "/purchase/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        await loadPurchases();

    } catch (err) {
        console.log("Delete error:", err);
    }
}


// SEARCH
function searchPurchase() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = purchases.filter(p => {
        const name = (p.product?.name || "").toLowerCase();
        return name.includes(value);
    });

    displayPurchases(filtered);
}


// MODAL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}


// INIT
loadPurchases();