"use strict";

//HTML ELEMENT
const text = document.getElementById("Text");
const namnEl = document.getElementById("NamnId");
const emailEl = document.getElementById("EmailId");
const adressEl = document.getElementById("AdressId");
const fraktEl = document.getElementById("fraktId");
const checkEl = document.getElementById("CheckId"); 
const getidEl = document.getElementById("getOrderID");

//Fetch
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>Read(data))

            //Funktioner 

            function getID(item) {
                console.log("getID körs...");
                console.log(item);
                getidEl.value = item;
                getidEl.innerHTML = item;
            }


            function createCustomer() {
                let customerName = namnEl.value; // Här hämtar vi värderna från våra element i html.
                let customerEmail = emailEl.value; 
                let customerAdress = adressEl.value;
                let customerFrakt = fraktEl.value;
                let ItemID = getidEl.value; 

                if (!customerName || !customerEmail || !customerAdress || !customerFrakt || ItemID == "") {
                    console.log("Fyll i alla fält!")
                    return;
                }

                if(!ItemID) {
                    console.log("Du måste välja en produkt!");
                    alert("Din order lades inte till eftersom du inte valt någon produkt!");
                    return;
                } else {
                   
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
                            "integerValue" : ItemID
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
                alert("Tack för din beställning! 😁");
               }
             }

    

            function Read(output) {
                console.log(output)

                for(let i = 0; i < output.length; i++) { //Här med hjälp av en forloop så loopar vi ut infon ur fakestore api. 
                    text.innerHTML += `              <tr>
                    <td>${output[i].category}</td>
                    <td>${output[i].title}</td>
                    <td>${output[i].price}$</td>
                    <td>${output[i].description}</td>
                    <td>${output[i].rating.rate}/5⭐ Recensioner-${output[i].rating.count}</td>
                    <td>${output[i].id}</td>
                    <td><img src="${output[i].image}"/></td>
                  </tr>
                    <a href="#">
                    <button type="button" class="btn btn-info" id="item" onclick="getID (${output[i].id})" > 
                    Köp
                    </button>
                    </a>
                    
                    
                    
                    
                    
                    `
                }
            }
           

            //Eventlyssnare
            checkEl.addEventListener("click", createCustomer);