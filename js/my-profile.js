mail = document.getElementById("mail");
nombre = document.getElementById("nombre");
nombre2 = document.getElementById("nombre2");
apellido = document.getElementById("apellido");
apellido2 = document.getElementById("apellido2");
tel = document.getElementById("tel");

function showProfile(){

    mail.setAttribute("value", localStorage.getItem('usuario'));
    if (localStorage.getItem('nombre') != null) {
        nombre.setAttribute("value", localStorage.getItem('nombre'));
        nombre2.setAttribute("value", localStorage.getItem('nombre2'));
        apellido.setAttribute("value", localStorage.getItem('apellido'));
        apellido2.setAttribute("value", localStorage.getItem('apellido2'));
        tel.setAttribute("value", localStorage.getItem('tel'));
    }

}

let form = document.querySelector('#formulario');

form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
    localStorage.setItem('nombre', nombre.value); 
    localStorage.setItem('nombre2', nombre2.value); 
    localStorage.setItem('apellido', apellido.value); 
    localStorage.setItem('apellido2', apellido2.value); 
    localStorage.setItem('tel', tel.value); 
    localStorage.setItem('usuario', mail.value); 

});


document.addEventListener("DOMContentLoaded", function(e){
    
    showProfile();
});