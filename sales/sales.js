const API = "http://localhost:8080";
const token = localStorage.getItem("token");

let sales = [];

// 🔐 LOGIN CHECK (NO REDIRECT LOOP)
if (!token) {
    alert("Login first");
    // REMOVE redirect to avoid going back
}


// LOAD SALES
async function loadSales() {
    try {

        const res = await fetch(API + "/sales", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();
        sales = data.data || [];

        displaySales(sales);

    } catch (err) {
        console.log(err);
    }
}


// DISPLAY SALES
function displaySales(list) {
    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    list.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.customer}</td>
                <td class="${item.status}">${item.status}</td>
                <td>₹${item.amount}</td>
                <td>
                    <button onclick="deleteSale('${item._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}


// ADD SALE
async function addSale() {

    const customer = document.getElementById("customer").value;
    const amount = document.getElementById("amount").value;
    const status = document.getElementById("status").value;

    if (!customer || !amount) {
        alert("Fill all fields");
        return;
    }

    try {

        const res = await fetch(API + "/sales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ customer, amount, status })
        });

        const data = await res.json();

        alert("Sale added successfully ✅");

        closeForm();
        loadSales();   // reload table only (NO PAGE REDIRECT)

    } catch (err) {
        console.log(err);
        alert("Error adding sale");
    }
}


// DELETE SALE
async function deleteSale(id) {

    if (!confirm("Delete?")) return;

    try {

        await fetch(API + "/sales/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        alert("Deleted ✅");

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


// LOGOUT
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
}


// INIT
loadSales();
