$(document).ready(function () {
    var tienda = localStorage.getItem("tienda");
    let data = {
        'TIENDA': tienda,
        'PRODUCTO': -1
    };
    consumeServicio('POST', data, CONSULTAPRODUCTOS, llenaProductos);
    let dataTienda = {
        'TIENDA': tienda
    };
    consumeServicio('POST', dataTienda, CONSULTATIENDA, llenaDatosTienda)
    llenaUsuario();
});

function llenaDatosTienda(tiendas) {
    $('#datoHeader').text(tiendas.NOMBRETIENDA);
    $('#datoHeaderDetalle').text(tiendas.DIRECCION);
}

function llenaUsuario() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    $('#nombre').text('Bienvenido: ' + usuario.NOMBRE);
}

function llenaProductos(productos) {

    let $items = document.querySelector('#items');
    let carrito = [];
    let carritoGlobal = [];
    let total = 0;
    let totalItems = 0;
    let $total = document.querySelector('#total');
    let $lblCartCount = document.querySelector('#lblCartCount');

    carrito = sumaCarrito(carrito);

    if(carrito == null)
        carrito = [];

    // Funciones
    function renderItems() {
        for (let info of productos) {

            let miNodo = document.createElement('div');
            miNodo.classList.add('col-4', 'product-block');

            let a = document.createElement('a');

            let imagen = document.createElement('img');
            imagen.classList.add('img-fluid', 'img-portfolio', 'img-hover', 'mb-3'); 
            imagen.setAttribute('src', info.IMAGEN);

            let caption = document.createElement('div');
            caption.classList.add('caption');

            let h3 = document.createElement('h3');
            h3.classList.add('card-title');
            h3.textContent = info.DESCRIPCION;

            let p = document.createElement('p');
            p.setAttribute('marcador', info.TIENDA);
            p.classList.add('card-text');
            p.textContent = '$' + info.PRECIO;

            let boton = document.createElement('i');
            boton.classList.add('fa', 'fa-plus', 'mr-3', 'addRemove');
            boton.setAttribute('marcador', info.PRODUCTO);
            boton.addEventListener('click', agregarAlCarrito);

            let botonMenos = document.createElement('i');
            botonMenos.classList.add('fa', 'fa-minus', 'mr-3', 'addRemove');
            botonMenos.setAttribute('marcador', info.PRODUCTO);
            botonMenos.addEventListener('click', quitarDelCarrito);


            caption.appendChild(h3);
            caption.appendChild(p);
            caption.appendChild(boton);
            caption.appendChild(botonMenos);

            a.appendChild(imagen);
            miNodo.appendChild(a);
            miNodo.appendChild(caption);
            $items.appendChild(miNodo);
        }
    }

    function agregarAlCarrito() {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function quitarDelCarrito() {
        // Anyadimos el Nodo a nuestro carrito

        const index = carrito.indexOf(this.getAttribute('marcador'));

        if (index > -1) {
            carrito.splice(index, 1);
        }
        renderizarCarrito();
    }


    function renderizarCarrito() {
        carritoGlobal = new Array();
        total = 0;
        for (let item of carrito) {
            let miItem = productos.filter(function (itemBaseDatos) {
                return itemBaseDatos['PRODUCTO'] == item;
            });
            carritoGlobal.push(miItem);
            total = total + parseFloat(miItem[0]['PRECIO']);
        };
        localStorage.setItem("carrito", JSON.stringify(carritoGlobal));
        $lblCartCount.textContent = carrito.length;
        let totalDosDecimales = total.toFixed(2);
        $total.textContent = '$' + totalDosDecimales;
    }

    function borrarItemCarrito() {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }

    // Eventos

    // Inicio
    renderItems();
}