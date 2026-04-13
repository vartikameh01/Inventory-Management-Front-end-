let users = [
{name:"John Doe", email:"john@example.com", role:"admin", status:"active"},
{name:"Jane Smith", email:"jane@example.com", role:"manager", status:"active"},
{name:"Bob Wilson", email:"bob@example.com", role:"staff", status:"active"},
{name:"Alice Lee", email:"alice@example.com", role:"staff", status:"inactive"},
{name:"Charlie Brown", email:"charlie@example.com", role:"manager", status:"active"}
];

const tableBody = document.getElementById("tableBody");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");

function getInitials(name){
return name.split(" ").map(n=>n[0]).join("").toUpperCase();
}

function render(data){
tableBody.innerHTML = "";

data.forEach(u=>{
tableBody.innerHTML += `
<tr>
<td>
<div class="user">
<div class="avatar" style="background:#2563eb;">
${getInitials(u.name)}
</div>
${u.name}
</div>
</td>
<td>${u.email}</td>
<td><span class="badge ${u.role}">${u.role}</span></td>
<td><span class="badge ${u.status}">${u.status}</span></td>
</tr>
`;
});
}

function filter(){
let role = roleFilter.value;
let status = statusFilter.value;
let search = searchInput.value.toLowerCase();

let filtered = users.filter(u =>
(role==="all" || u.role===role) &&
(status==="all" || u.status===status) &&
(u.name.toLowerCase().includes(search) ||
u.email.toLowerCase().includes(search))
);

render(filtered);
}

function openModal(){
document.getElementById("modal").style.display="flex";
}

function addUser(){
let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let role = document.getElementById("role").value;
let status = document.getElementById("status").value;

users.push({name,email,role,status});
document.getElementById("modal").style.display="none";
render(users);
}

roleFilter.onchange = filter;
statusFilter.onchange = filter;
searchInput.oninput = filter;

render(users);