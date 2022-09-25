let currentProductInfoArray = [];
let currentProductCommentsArray = [];

function showProductInfoList(){

    document.getElementById("p-name").innerHTML += `<h2 class ="text-left">${currentProductInfoArray.name}</h2> `;

    document.getElementById("p-info").innerHTML += `
    
    <p class="font-weight-bold">Precio</p>
    <p class="lead">${currentProductInfoArray.cost} ${currentProductInfoArray.currency}</p>
    <p class="font-weight-bold"> Descripción</p>
    <p class="lead">${currentProductInfoArray.description}</p>
    <p class="font-weight-bold"> Categoría </p>
    <p class="lead">${currentProductInfoArray.category}</p>
    <p class="font-weight-bold"> Imágenes ilustrativas </p>
    `;
    let htmlContentToAppend = "";
    let htmlImgs = "";
    let htmlIdimg = "";

        
    
    for(let i = 0; i < currentProductInfoArray.images.length; i++){
        let image = currentProductInfoArray.images[i];

        if (i ==0) {
            htmlImgs += `
            <div class="carousel-item active">
            <img class="d-block w-100" src="${image}">
            </div>
            `
            htmlIdimg += `<li data-target="#carouselProduct" data-slide-to="${i}" class="active"></li>`
        } else {
            htmlImgs += `
            <div class="carousel-item">
            <img class="d-block w-100" src="${image}">
            </div>
            `
            htmlIdimg += `<li data-target="#carouselProduct" data-slide-to="${i}"></li>`
        }

    }
    htmlContentToAppend += `
    <ol class="carousel-indicators" id="carousel-actual">` + htmlIdimg + `</ol>` + 
    `<div class="carousel-inner" id="carousel-container">` + 
    htmlImgs + 
    `</div>
    <a class="carousel-control-prev" href="#carouselProduct" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselProduct" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>`
    document.getElementById("related").innerHTML = htmlContentToAppend;
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

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("profile").innerHTML += `<a class="nav-link" href="my-profile.html"> ${localStorage.getItem('usuario')} </a>`;

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfoArray = resultObj.data;
            showProductInfoList();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductCommentsArray = resultObj.data;
            showProductCommentsList();
        }
    });
    
});