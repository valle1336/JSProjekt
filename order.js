"use strict";

//HTML ELEMENT 
const fraktEl = document.getElementById("fraktId");
const bestallEl = document.getElementById("Bestall");
const textEl = document.getElementById("TextId");

//Fetch Order API
fetch('https://firestore.googleapis.com/v1/projects/orders-4ee1e/databases/(default)/documents/Ordrar') //Fetchar vårat api med ordrar (firebase)
.then(res=>res.json())
.then(data=>printOrders(data));


//Funktioner
function printOrders(data) {
    console.log("printOrders körs..."); //Här printar vi att metoden körs.
    console.log(data);
    let customerOrders = data.documents; //Skapar en varibel av documenten i våran json databas

    for(let customer of customerOrders) {
        textEl.innerHTML += 
        `<h1>Här ska id stå</h1>
        <p> Namn: ${customer.fields.Name.stringValue} </p>
        <p> Email: ${customer.fields.Email.stringValue} </p>
        <p> Adress: ${customer.fields.Adress.stringValue} </p>
        <p> Frakt: ${customer.fields.Frakt.stringValue} </p>






        `
    }
}

