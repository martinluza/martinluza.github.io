let boton = document.getElementById('ingBtn');

boton.addEventListener('click', function(evento){
    let usuario = document.getElementById('floatingInput');
    localStorage.setItem('usuario', usuario.value);
})
