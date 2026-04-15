const API = "http://localhost:8080"; // change after deploy
const token = localStorage.getItem("token");

let sales = [];


// LOGIN CHECK
if (!token) {
    //alert("Please login first");
    window.location.href = "sales.html";
}


// LOAD SALES
function loadSales() {
    fetch(API + "/sale", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        sales = data.data || [];
        displaySales(sales);
    })
    .catch(err => console.log(err));
}


// DISPLAY SALES
function displaySales(list) {
    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    list.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.customer}</td>
                <td>${s.status}</td>
                <td>₹${s.amount}</td>
            </tr>
        `;
    });
}


// ADD SALE
function addSale() {

    const customer = document.getElementById("customer").value;
    const amount = document.getElementById("amount").value;
    const status = document.getElementById("status").value;

    if (!customer || !amount) {
        alert("Fill all fields");
        return;
    }

    fetch(API + "/sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ customer, amount, status })
    })
    .then(res => res.json())
    .then(data => {
        alert("Sale added");
        closeForm();
        loadSales();
    })
    .catch(err => {
        console.log(err);
        alert("Error adding sale");
    });
}


// MODAL CONTROL
function openForm() {
    document.getElementById("modal").style.display = "block";
}

function closeForm() {
    document.getElementById("modal").style.display = "none";
}


// INIT
loadSales();
