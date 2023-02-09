"use strict";

//HTML ELEMENT 
const namnEl = document.getElementById("NamnId");
const emailEl = document.getElementById("EmailId");
const adressEl = document.getElementById("AdressId");
const orderIdEl = document.getElementById("getOrderID");
const fraktEl = document.getElementById("fraktId");
const textEl = document.getElementById("TextId");
const updateButton = document.getElementById("Update");

//Fetch Order API
fetch('https://firestore.googleapis.com/v1/projects/orders-4ee1e/databases/(default)/documents/Ordrar') //Fetchar vårat api med ordrar (firebase)
.then(res=>res.json())
.then(data=>printOrders(data));


//Funktioner
function deleteCustomer(customerName) {
    console.log(customerName);
    console.log("deleteCustomer körs...");


    fetch("https://firestore.googleapis.com/v1/" + customerName, {
        method: 'DELETE',
        
    }) 
    alert("Beställning bort tagen!");
    setTimeout(location.reload(), 2000);
}

// function editData(data) {
//     let namee = namnEl.value;
//     let emaill = emailEl.value;
//     let fraktt = fraktEl.value;
//     let orderIDD = orderIdEl.value;
//     let adresss = adressEl.value;
//     console.log("editData körs...");
//     console.log("Order ID " + data);



//     const body = JSON.stringify(
//         {
//             "fields": {
//                 "Email": {
//                     "stringValue": emaill
//                 },
//                 "Name": {
//                     "stringValue": namee
//                 },
//                 "Frakt": {
//                     "stringValue": fraktt
//                 },
//                 "OrderId": {
//                     "intergerValue": orderIDD
//                 },
//                 "Adress": {
//                     "stringValue": adresss
//                   }
//              }
//          })

//     fetch("https://firestore.googleapis.com/v1/" + data, {
//         method:'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         }, 
//         body: body
//     })    
//      .then(res => res.json())
//      .then(update => updateData(update));
// }

function getData(update) {
    console.log(update);
    fetch("https://firestore.googleapis.com/v1/" + update)
    .then(res => res.json())
    .then(data=>updateData(data))
}

function updateData(data) {
    console.log("updateData körs...");
    console.log(data);
    orderIdEl.value = data.fields.OrderId.integerValue;
    namnEl.value = data.fields.Name.stringValue;
    emailEl.value = data.fields.Email.stringValue;
    adressEl.value = data.fields.Adress.stringValue;
    fraktEl.value = data.fields.Frakt.stringValue;
}

function clickUpdate(updateData) {
    console.log("clickUpdate körs...");
    console.log(updateData);


    // orderIdEl.value = updateData.fields.OrderId.integerValue;
    // namnEl.value = updateData.fields.Name.stringValue;
    // emailEl.value = updateData.fields.Email.stringValue;
    // adressEl.value = updateData.fields.Adress.stringValue;
    // fraktEl.value = updateData.fields.Frakt.stringValue;

    alert("Data uppdaterat!");

    clearFormData();
}

function clearFormData() {
    namnEl.value = "";
    emailEl.value = "";
    adressEl.value = "";
    orderIdEl.value = "";
    fraktEl.value = "";
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
        <button onclick="getData('${customer.name}')" id="update">Ändra order </button>






        `
    }
}

//EVENTLYSSNARE 
updateButton.addEventListener("click", clickUpdate);

