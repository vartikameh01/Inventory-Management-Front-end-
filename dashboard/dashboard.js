// CHECK LOGIN
const token = localStorage.getItem("token");

if(!token){
    window.location.href = "../login/login.html";
}


// WELCOME NAME
const userName = localStorage.getItem("userName") || "User";
document.getElementById("welcome").innerText = "Welcome back, " + userName;


// ANIMATION FUNCTION
function animateValue(id, start, end, duration) {

    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    let obj = document.getElementById(id);

    let timer = setInterval(function () {
        current += increment;
        obj.innerText = formatNumber(current);

        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


// FORMAT NUMBER
function formatNumber(num) {
    return num.toLocaleString();
}


// LOAD DATA (STATIC FOR NOW)
function loadDashboard() {

    const data = {
        products: 1234,
        sales: 45200,
        stock: 15,
        revenue: 128500
    };

    animateValue("products", 0, data.products, 1000);
    animateValue("sales", 0, data.sales, 1200);
    animateValue("stock", 0, data.stock, 800);
    animateValue("revenue", 0, data.revenue, 1500);
}


// AUTO UPDATE (OPTIONAL)
function autoUpdate(){
    setInterval(loadDashboard, 10000);
}


// LOGOUT
function logout(){
    localStorage.clear();
    window.location.href = "../login/login.html";
}


// INIT
loadDashboard();
autoUpdate();
