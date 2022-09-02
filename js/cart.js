document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("profile").innerHTML += `<a class="nav-link" href="my-profile.html"> ${localStorage.getItem('usuario')} </a>`;
});