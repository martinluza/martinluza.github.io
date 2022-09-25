let currentProductInfoArray = [];
let currentProductCommentsArray = [];

function setProductID(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductInfoList(){

    document.getElementById("p-name").innerHTML += `<h2 class ="text-left">${currentProductInfoArray.name}</h2> `;

    document.getElementById("p-info").innerHTML += `
    
    <p class="font-weight-bold"><b>Precio</b></p>
    <p class="font-weight-normal">$${currentProductInfoArray.cost} ${currentProductInfoArray.currency}</p>
    <p class="font-weight-bold"><b>Descripción</b></p>
    <p class="font-weight-normal">${currentProductInfoArray.description}</p>
    <p class="font-weight-bold"><b>Categoría</b></p>
    <p class="font-weight-normal">${currentProductInfoArray.category}</p>
    <p class="font-weight-bold"><b>Imágenes ilustrativas</b></p>
    `;
    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductInfoArray.images.length; i++){
        let image = currentProductInfoArray.images[i];

        htmlContentToAppend += `
        <div class="col-sm-3">
            <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
            </div>
        </div>`

    }

    document.getElementById("relatedPics").innerHTML = htmlContentToAppend;
}

function showProductCommentsList(){

    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentProductCommentsArray.length; i++){
        let comment = currentProductCommentsArray[i];
        let htmlRating = "";

        for(let i = 0; i<5; i++) {
            if (i < comment.score) {
                htmlRating += `<span class="fa fa-star checked"></span>`;
            } else {
                htmlRating += `<span class="fa fa-star"></span>`;
            }
        }

        htmlContentToAppend += `
        <div class="list-group-item">
            <p class="lead"><b>${comment.user}</b> - ${comment.dateTime} - `+ htmlRating + `</p>
            <p class="lead">${comment.description}</p>
        </div>
        `
    }
    
    document.getElementById("comments-container").innerHTML = htmlContentToAppend;
}

function showRelatedProducts(){

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductInfoArray.relatedProducts.length; i++){
        let product = currentProductInfoArray.relatedProducts[i];

        htmlContentToAppend += `
        <div class="col-sm-3">
            <div onclick="setProductID(${product.id})" class="card">
                <img class="card-img-top" src="${product.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                </div>
            </div>
        </div>`

    }

    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfoArray = resultObj.data;
            showProductInfoList();
            showRelatedProducts();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductCommentsArray = resultObj.data;
            showProductCommentsList();
        }
    });
    
});