$(document).ready(function () {
    let data = {
        'TIENDA': -1
    };
    consumeServicio('POST', data, CONSULTATIENDA, llenaTiendas);
    configuraInfoTemplate();
});

function configuraInfoTemplate() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    $('#nombre').text('Bienvenido: ' + usuario.NOMBRE);
}

function llenaTiendas(tiendas) {
    let $items = document.querySelector('#items');
    let tiendaSeleccionada = [];

    var carrito = [];

    carrito = sumaCarrito(carrito);
    if (carrito == null)
        carrito = [];
    // Funciones
    function renderItems(tiendas) {
        for (let info of tiendas) {

            let miNodo = document.createElement('div');
            miNodo.classList.add('col-4', 'product-block');

            let a = document.createElement('a');
            a.setAttribute('marcador', info.TIENDA);
            a.addEventListener('click', seleccionarTienda);

            let imagen = document.createElement('img');
            imagen.classList.add('img-fluid', 'img-portfolio', 'img-hover', 'mb-3');
            imagen.setAttribute('src', info.IMAGENTIENDA);
            imagen.setAttribute('alt', info.NOMBRETIENDA);

            let caption = document.createElement('div');
            caption.classList.add('caption');

            let h3 = document.createElement('h3');

            let aNombre = document.createElement('a');
            aNombre.setAttribute('marcador', info.TIENDA);
            aNombre.textContent = info.NOMBRETIENDA;
            aNombre.addEventListener('click', seleccionarTienda);

            h3.appendChild(aNombre);
            caption.appendChild(h3);

            a.appendChild(imagen);
            miNodo.appendChild(a);
            miNodo.appendChild(caption);
            $items.appendChild(miNodo);
        }
    }


    function seleccionarTienda() {
        localStorage.setItem("tienda", this.getAttribute('marcador'));
        window.location.replace("productos.html");
    }
    renderItems(tiendas);
}