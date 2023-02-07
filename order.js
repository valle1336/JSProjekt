"use strict";

//HTML ELEMENT 
const namnEl = document.getElementById("NamnId");
const emailEl = document.getElementById("EmailId");
const adressEl = document.getElementById("AdressId");
const orderIdEl = document.getElementById("getOrderID");
const fraktEl = document.getElementById("fraktId");
const textEl = document.getElementById("TextId");

//Fetch Order API
fetch('https://firestore.googleapis.com/v1/projects/orders-4ee1e/databases/(default)/documents/Ordrar') //Fetchar vårat api med ordrar (firebase)
.then(res=>res.json())
.then(data=>printOrders(data));



//Funktioner
function deleteCustomer(customerName) {
    console.log(customerName);
    console.log("deleteCustomer körs...")

    fetch("https://firestore.googleapis.com/v1/" + customerName, {
        method: 'DELETE'
        
    })
    setTimeout(location.reload(), 3000);
}

function updateData(update) {
    console.log(update);
    orderIdEl.value = update;
    namnEl.value = 
    emailEl.value = 
    adressEl.value =
    fraktEl
}

updateData();

function clearFormData() {
    namnEl.value = "";
    emailEl.value = "";
    adressEl.value = "";
    orderIdEl.value = "";
    fraktEl.value = "";
    }


function editData() {
    var formData = getFormData();

    fetch("https://firestore.googleapis.com/v1/projects/orders-4ee1e/databases/(default)/documents/Ordrar", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((Response)=>{
        clearFormData();
    })
}

function printOrders(data) {
    console.log("printOrders körs..."); //Här printar vi att metoden körs.
    console.log(data);
    let customerOrders = data.documents; //Skapar en varibel av documenten i våran json databas

    for(let customer of customerOrders) {
        textEl.innerHTML += 
        `<h1>Produkt ID: ${customer.fields.OrderId.integerValue}</h1>
        <p> Namn: ${customer.fields.Name.stringValue} </p>
        <p> Email: ${customer.fields.Email.stringValue} </p>
        <p> Adress: ${customer.fields.Adress.stringValue} </p>
        <p> Frakt: ${customer.fields.Frakt.stringValue} </p>
        <button onclick="deleteCustomer('${customer.name}')">Ta bort order </button>
        <button onclick="editDataCall('${customer.name}')" id="update">Ändra order </button>






        `
    }
}

