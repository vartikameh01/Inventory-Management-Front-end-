const API = "https://inventory-management-2-t0u8.onrender.com";
const token = localStorage.getItem("token");

let sales = [];


// LOAD SALES
async function loadSales() {
    try {
        const res = await fetch(API + "/sales");
        const data = await res.json();

        sales = data.data || [];
        displaySales(sales);

    } catch (err) {
        console.log("Error:", err);
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
                <td>${item.product?.name || item.product}</td>
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

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    if (!product || !quantity || !price) {
        alert("Fill all fields");
        return;
    }

    try {

        await fetch(API + "/sale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ product, quantity, price })
        });

        alert("Sale Added");

        closeForm();
        loadSales();

    } catch (err) {
        console.log(err);
    }
}


// DELETE SALE
async function deleteSale(id) {

    if (!confirm("Delete this sale?")) return;

    try {

        await fetch(API + "/sales/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        alert("Deleted ");

        loadSales();

    } catch (err) {
        console.log(err);
    }
}


// MODAL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}


// 🔥 MAKE BUTTONS WORK
window.openForm = openForm;
window.closeForm = closeForm;
window.addSale = addSale;
window.deleteSale = deleteSale;


// INIT
loadSales();
