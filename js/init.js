const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem('catID')+".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+localStorage.getItem('productID')+".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"+localStorage.getItem('productID')+".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

 if (localStorage.getItem('usuario') == null) {
    window.location.replace("login.html");
 } else {
  document.getElementById("profile").innerHTML += `
    <a class="nav-link dropdown-toggle" href="my-profile.html" id="prof" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem('usuario')}
    </a>
    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a id ="closeSession" class="dropdown-item" href="login.html">Cerrar sesión</a></li>
    </ul>
   `;
 }

 document.addEventListener("DOMContentLoaded", function(e){
    
  let boton = document.getElementById('closeSession');

  boton.addEventListener('click', function(evento){
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombre');
    localStorage.removeItem('nombre2');
    localStorage.removeItem('apellido');
    localStorage.removeItem('apellido2');
    localStorage.removeItem('tel');
  })

});

