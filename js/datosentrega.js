$(document).ready(function () {
    configuraInfoTemplate();
    llenaProductos();
});


function llenaProductos() {
    let carrito = [];

    carrito = sumaCarrito(carrito);
}

function configuraInfoTemplate() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    $('#nombre').text(usuario.NOMBRE);
}

var longitud;
var latidud;

function initMap() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var position = [crd.latitude, crd.longitude];
        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };

        var latlng = new google.maps.LatLng(crd.latitude, crd.longitude);
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Latitude:" + position[0] + " | Longitude:" + position[1]
        });
        longitud = position[0];
        latidud = position[1];

        google.maps.event.addListener(map, 'click', function (event) {
            var result = [event.latLng.lat(), event.latLng.lng()];
            transition(result);
        });



        var numDeltas = 50;
        var delay = 1;
        var i = 0;
        var deltaLat;
        var deltaLng;

        function transition(result) {
            i = 0;
            deltaLat = (result[0] - position[0]) / numDeltas;
            deltaLng = (result[1] - position[1]) / numDeltas;
            moveMarker();
        }

        function moveMarker() {
            position[0] += deltaLat;
            position[1] += deltaLng;
            var latlng = new google.maps.LatLng(position[0], position[1]);
            marker.setTitle("Latitude:" + position[0] + " | Longitude:" + position[1]);
            longitud = position[0];
            latidud = position[1];

            marker.setPosition(latlng);
            if (i != numDeltas) {
                i++;
                setTimeout(moveMarker, delay);
            }
        }

    }
    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
}

$('#usuarioRegistrado').click(function () {
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    $('#nombreCliente').val(usuario.NOMBRE);
    $('#apellidos').val(usuario.APELLIDOS);
    $('#calle').val(usuario.DIRECCION);
    $('#telefono').val(usuario.TELEFONO);
});

$('#confirmar').click(function () {

    if ($('#nombreCliente').val() != '' && $('#apellidos').val() != '' && $('#calle').val() != '' && $('#telefono').val() != '' && $('#referencias').val() != '') {

        let c = JSON.parse(localStorage.getItem("carrito"));
        var u = JSON.parse(localStorage.getItem("usuario"));
        var t = localStorage.getItem("tienda");
        let carrito = agrupaProductos(c);

        let usuario = new Object();
        usuario.PERSONA = u.PERSONA;
        usuario.TIENDA = t;
        usuario.NOMBRE = $('#nombreCliente').val();
        usuario.APELLIDOS = $('#apellidos').val();
        usuario.CALLE = $('#calle').val();
        usuario.TELEFONO = $('#telefono').val();
        usuario.REFERENCIAS = $('#referencias').val();
        usuario.LONGITUD = longitud;
        usuario.LATITUD = latidud;

        let xmlCarrito = creaCarritoXML(carrito, usuario);

        let data = {
            'XMLCARRITO': xmlCarrito
        };
        consumeServicio('POST', data, CREACARRITOCOMPRA, creaCarrito);
    }else{
        $('#alerta').show();
    }
});

$(".close").click(function () {
    $("#alerta").hide();
});

function creaCarrito(idCarrito) {
    if(idCarrito.CARRITOID > 0){
        localStorage.removeItem("carrito");
        window.location.href = "compras.html"
    }
}

function agrupaProductos(carrito) {
    let carritoAgrupado = [];
    var cantidad = 1;
    for (let info of carrito) {
        let index = carritoAgrupado.map(function (e) { return e[0].PRODUCTO; }).indexOf(info[0].PRODUCTO);

        if (index == -1) {
            info[0].CANTIDAD = 1;
            carritoAgrupado.push(info);
        } else {

            carritoAgrupado.map(function (e) {
                if (e[0].PRODUCTO == info[0].PRODUCTO) {
                    e[0].CANTIDAD = parseInt(e[0].CANTIDAD) + cantidad;
                    e[0].PRECIO = parseFloat(info[0].PRECIO) + parseFloat(e[0].PRECIO);
                }
            });
        }
    }
    return carritoAgrupado;
}