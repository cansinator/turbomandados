$(document).ready(function () {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    $('#nombre').text('Bienvenido: ' + usuario.NOMBRE);
    llenaProductos();
});

function llenaProductos() {
    let $items = document.querySelector('#items');
    let carrito = [];
    let carritoGlobal = [];
    let total = 0;
    let totalItems = 0;
    let $total = document.querySelector('#total');
    let $lblCartCount = document.querySelector('#lblCartCount');
    let productos = JSON.parse(localStorage.getItem("carrito"));

    carrito = sumaCarrito(carrito);

    function agrupaProductos(productos) {
        if (productos != null && productos.length > 0) {
            let carritoAgrupado = [];
            let sumaTotal = 0;
            for (let info of productos) {

                let index = carritoAgrupado.map(function (e) { return e[0].PRODUCTO; }).indexOf(info[0].PRODUCTO);

                if (index == -1) {
                    carritoAgrupado.push(info);
                } else {

                    carritoAgrupado.map(function (e) {
                        if (e[0].PRODUCTO == info[0].PRODUCTO) {
                            e[0].PRECIO = parseFloat(info[0].PRECIO) + parseFloat(e[0].PRECIO);;
                        }

                    });
                }
            }
            return carritoAgrupado;
        }return '';
    }

    // Funciones
    function renderItems() {
        let carritoAgrupado = agrupaProductos(productos);
        if (carritoAgrupado != null && carritoAgrupado.length > 0) {
            for (let info of carritoAgrupado) {

                let miNodo = document.createElement('div');
                miNodo.classList.add('col-4', 'product-block');
                miNodo.setAttribute('idProducto', 'prd' + info[0].PRODUCTO);

                let a = document.createElement('a');

                let imagen = document.createElement('img');
                imagen.classList.add('img-fluid', 'img-portfolio', 'img-hover', 'mb-3');
                imagen.setAttribute('src', info[0].IMAGEN);

                let caption = document.createElement('div');
                caption.classList.add('caption');

                let h3 = document.createElement('h3');
                h3.classList.add('card-title');
                h3.textContent = info[0].DESCRIPCION;

                let p = document.createElement('p');
                p.setAttribute('marcador', info[0].TIENDA);
                p.classList.add('card-text');
                p.textContent = 'Total: $' + info[0].PRECIO;

                caption.appendChild(h3);
                caption.appendChild(p);

                a.appendChild(imagen);
                miNodo.appendChild(a);
                miNodo.appendChild(caption);
                $items.appendChild(miNodo);
            }
        } else {
            $('#eliminarCarrito').hide();
            $('#detalleEntrega').hide();
            $('#alertaCarrito').show();
        }
    }

    function agregarAlCarrito() {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))

        carrito = sumaCarrito(carrito);
        // Calculo el total
        //calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function quitarDelCarrito() {

        for (let child of $items.childNodes) {
            if (child.attributes['idproducto'].nodeValue == 'prd' + this.getAttribute('marcador')) {
                child.innerHTML = '';
            }
        }

        //let index = $items.map(function(e) { return e[0].childNodes; }).indexOf(info[0].PRODUCTO);

        const index = this.getAttribute('marcador');


        for (var i = 0; i < carrito.length; i++) {
            if (carrito[i] === index) {
                carrito.splice(i, 1);
                i--;
            }
        }
        // Renderizamos el carrito 
        renderizarCarrito();
        carrito = sumaCarrito(carrito);

    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        //$carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        carritoGlobal = [];

        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = productos.filter(function (itemBaseDatos) {
                return itemBaseDatos['PRODUCTO'] == item;
            });

            carritoGlobal.push(miItem);
            // Cuenta el número de veces que se repite el producto

            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            /*             let miNodo = document.createElement('li');
                        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['DESCRIPCION']} - $${miItem[0]['PRECIO']}`;
            
                        // Boton de borrar
                        let miBoton = document.createElement('button');
                        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                        miBoton.textContent = 'X';
                        miBoton.style.marginLeft = '1rem';
                        miBoton.setAttribute('item', item);
                        miBoton.addEventListener('click', borrarItemCarrito);
                        // Mezclamos nodos
                        miNodo.appendChild(miBoton);
                        $carrito.appendChild(miNodo); */
        });

        carritoGlobal = [];


        var productosUnicos = carrito.filter(function (item, pos) {
            return carrito.indexOf(item) == pos;
        })

        for (let item of productosUnicos) {
            // De cada elemento obtenemos su precio
            let miItem = productos.filter(function (itemBaseDatos) {
                return itemBaseDatos[0]['PRODUCTO'] == item;
            });

            for (let i of miItem) {
                carritoGlobal.push(i);
            }
        };

        localStorage.setItem("carrito", JSON.stringify(carritoGlobal));
        $lblCartCount.textContent = carrito.length;
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

        // Calculamos de nuevo el precio
        calcularTotal();
        renderizarCarrito();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            total = total + parseFloat(item[0]['PRECIO']);
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = '$' + totalDosDecimales;
    }

    function vaciarCarrito() { 
        carrito = [];
        $('#eliminarCarrito').hide();
        $('#detalleEntrega').hide();
        $('#alertaCarrito').show();
        $('#items').remove();
        renderizarCarrito();
        calcularTotal();
    }

    $('#eliminarCarrito').click(function () {
        vaciarCarrito();
    });
    $('#detalleEntrega').click(function () {
        window.location.href = "datosentrega.html"
    });
    renderItems();
}
