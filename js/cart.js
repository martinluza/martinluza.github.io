const alerta = document.getElementById("alerta");

function showCart(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCartArray.articles.length; i++){
        let article = currentCartArray.articles[i];
        let total = article.unitCost * article.count;

        htmlContentToAppend += `
       
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <img src="${article.image}" alt="img" class="img-thumbnail">
                </div>
                <div class="col">
                    <p class="mb-1">${article.name}</p>
                </div>
                <div class="col">
                    <p class="mb-1">${article.currency} ${article.unitCost}</p>
                </div>
                <div class="col">
                    <p class="mb-1"><input type="text" id="inputCount" class="w-50 text-center" value="${article.count}" required> </p>
                </div>
                <div class="col">
                    <p id="p-total" class="mb-1"><b>${article.currency} ${total}</b></p>
                </div>
            </div>
        </div>
        `

        document.getElementById("cart-container").innerHTML = htmlContentToAppend;
    }

    
}

function calculatePrice(currency, cost, inputCount, shipComission){

    const ptotal = document.getElementById("p-total");
    const productCostText = document.getElementById("productCostText");
    const shipmentText = document.getElementById("shipmentText");
    const totalCostText = document.getElementById("totalCostText");

    count = inputCount.value;
    subtotal = count*cost;
    subtotalUSD = subtotal;
    if(currency === "UYU") {
        subtotalUSD /= 41;
    }
    shipTotal = subtotalUSD*shipComission;
    total = subtotalUSD+shipTotal;
                
    ptotal.innerHTML = `${currency} ${Math.round(subtotal)}`;
    productCostText.innerHTML = `USD ${Math.round(subtotalUSD)}`;
    shipmentText.innerHTML = `USD ${Math.round(shipTotal)}`;
    totalCostText.innerHTML = `USD ${Math.round(total)}`;
}

function showPrice(currency, cost, inputCount){

   
    let shipComission = 0.05;

    inputCount.addEventListener('input',function(e) {
        calculatePrice(currency, cost, inputCount, shipComission); 
    });

    var shipType = document.forms["infoEnvio"].elements["envio"];
    for(var i = 0, max = shipType.length; i < max; i++) {
        
        shipType[i].onclick = function() {
            
            shipChecked = document.querySelector('input[name="envio"]:checked');
            if (shipChecked.value === "express") {
                shipComission = 0.07;
            } else if (shipChecked.value === "premium"){
                shipComission = 0.15;
            } else {
                shipComission = 0.05;
            }

            calculatePrice(currency, cost, inputCount, shipComission);
        };
    }
}

function validaciones() {

    let botonPago = document.getElementById("botonPago");
    let shipText = document.getElementById("shipText");

    if (document.querySelector('input[name="paymentType"]:checked')) {
        botonPago.setAttribute('class', 'is-valid btn btn-link ps-0');
        botonPago.setCustomValidity("");
    } else {
        botonPago.setAttribute('class', 'is-invalid text-danger btn btn-link ps-0');
        botonPago.setCustomValidity(false);
    }

    if (document.querySelector('input[name="envio"]:checked')) {
        shipText.setAttribute('class', 'lead is-valid');
    } else {
        shipText.setAttribute('class', 'lead is-invalid text-danger');
    }

    let counts = document.querySelectorAll('input[id="inputCount"]');

    for (let count of counts) {
        if(count.value > 0) {
            count.setAttribute('class', 'w-50 text-center is-valid');
            count.setCustomValidity("");
        } else {
            count.setAttribute('class', 'w-50 text-center is-invalid text-danger');
            count.setCustomValidity("false");
        }
    }


}

let form = document.querySelector('#formulario');

form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
});


document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCartArray = resultObj.data
            showCart()

            let counts = document.querySelectorAll('input[id="inputCount"]');

            for (let [index, article] of currentCartArray.articles.entries()) {
                let currency = article.currency;
                let cost = article.unitCost;
                showPrice(currency, cost, counts[index]);
            }

            bankNumber = document.getElementById("bankNumber");
            cardNumber = document.getElementById("cardNumber");
            secCode = document.getElementById("secCode");
            expDate = document.getElementById("expDate");
            paymentText = document.getElementById("paymentText");

            var paymentType = document.forms["infoEnvio"].elements["paymentType"];
            paymentType[0].onclick = function() {
                paymentText.innerHTML = `Tarjeta de crédito`;
                bankNumber.setAttribute("disabled", "")
                cardNumber.removeAttribute("disabled");
                secCode.removeAttribute("disabled");
                expDate.removeAttribute("disabled");
            }
            paymentType[1].onclick = function() {
                paymentText.innerHTML = `Transferencia bancaria`;
                cardNumber.setAttribute("disabled", "");
                secCode.setAttribute("disabled", "");
                expDate.setAttribute("disabled", "");
                bankNumber.removeAttribute("disabled")
            }

        }
    });
    

});