"use strict";

//HTML ELEMENT
const text = document.getElementById("Text");
const namnEl = document.getElementById("NamnId");
const emailEl = document.getElementById("EmailId");
const adressEl = document.getElementById("AdressId");
const fraktEl = document.getElementById("fraktId");
const checkEl = document.getElementById("CheckId"); 

//Fetch
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>Read(data))

            //Funktioner 

            function createCustomer() {
                let customerName = namnEl.value; // Här hämtar vi värderna från våra element i html.
                let customerEmail = emailEl.value; 
                let customerAdress = adressEl.value;
                let customerFrakt = fraktEl.value;

                console.log("Customer name added: " + customerName); // Här loggar vi värderna i konsolen och vi kan då se kundens namn, email, adress och fraktvillkor som dem matade in.
                console.log("Customer email added: " + customerEmail);
                console.log("Customer adress added: " + customerAdress);
                console.log("Customer shipment solution added: " + customerFrakt);

                let body = JSON.stringify({

                    "fields": {
                        "Email": {
                            "stringValue" : customerEmail //Här lägger vi in det kunden matade in i våran databas.
                        },
                        "Name": {
                            "stringValue": customerName
                        },
                        "Adress": {
                            "stringValue": customerAdress
                        },
                        "Frakt" : {
                            "stringValue" : customerFrakt
                    },
                    "OrderId" : {
                        "integerValue" : 1
                    }
                }
            })
        

        fetch("https://firestore.googleapis.com/v1/projects/orders-4ee1e/databases/(default)/documents/Ordrar", {
            method: `POST`, 
            headers: {
                "Content-Type": "application/json"
            },
            body: body
            })
            .then(res => res.json)
            .then(data => console.log(data));
        }

            function Read(output) {
                console.log(output)

                for(let i = 0; i < output.length; i++) { //Här med hjälp av en forloop så loopar vi ut infon ur fakestore api. 
                    text.innerHTML += `<p> ${output[i].category} </p>
                    <img src = ${output[i].image} > 
                    <p> ${output[i].description} </p>
                    <p> ${output[i].price} </p>
                    <a href="shop.html">
                    <button type="button" class="btn btn-info"> 
                    Köp
                    </button>
                    </a>
                    <h2> ${output[i].title} </h2>
                    
                    
                    
                    
                    `
                }
            }

            //Eventlyssnare
            