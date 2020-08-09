$(document).ready(function () {
    configuraInfoTemplate();
    llenaProductos();
    $('#checkPendiente').click();
});


function llenaProductos() {
    let carrito = [];

    carrito = sumaCarrito(carrito);
}

function configuraInfoTemplate() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    $('#nombre').text(usuario.NOMBRE);
}
function cargaCompras(compras) {

    if (compras != null && compras.length > 0) {
        let rows = '';
        $('#bPedidos').text('');
        for (let c of compras) {
            rows += '<tr>'
            rows += '<td><i class="fa fa-shopping-bag" style="margin: 3px;" aria-hidden="true"></i>' + c.NOMBRETIENDA + '<p><strong><i class="fa fa-calendar" style="margin: 3px;" aria-hidden="true"></i>' + c.FECHA + '</strong></p>'
            rows += '</td>'
            rows += '<td><i class="fa fa-lightbulb-o" style="margin: 3px;" aria-hidden="true"></i>' + c.ESTATUS + '<p><strong><i class="fa fa-usd" style="margin: 3px;" aria-hidden="true"></i>' + c.TOTAL + '</strong></p>'
            rows += '</td>'
            rows += '<td><a style="color: blue;" id="' + c.CARRITO + '" onclick="buscaCarrito(this);"><i class="fa fa-eye" style="margin: 3px;" aria-hidden="true"></i>Detalle<p><strong><i class="fa fa-shopping-cart" style="margin: 3px;"  aria-hidden="true"></i></strong></p>'
            rows += '</a></td>'
            rows += '</tr>'
        }
        $('#bPedidos').append(rows);
        $('#tPedidos').show();
        $('#alertaPedidos').hide();
    } else {
        $('#alertaPedidos').show();
        $('#tPedidos').hide();
    }
}

function buscaCarrito(idCarrito) {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    let data = {
        'PERSONA': usuario.PERSONA,
        'CARRITO': idCarrito.id,
        'ESTATUS': -1
    };
    consumeServicio('POST', data, CONSULTACOMPRAS, detalleCarrito);
}

function detalleCarrito(car) {
    $('#detallePedido').show();
    $('#tPedidos').hide();
    $('#nombreTienda').text(car.NOMBRETIENDA);
    $('#direccionTienda').text(car.DIRECCION);
    cargaDatosDeEntrega(car);
    llenaMapa(car.LONGITUDENTREGA, car.LATITUDENTREGA);
    let data = {
        'CARRITO': car.CARRITO
    };
    consumeServicio('POST', data, CONSULTAPRODUCTOSCARRITO, detalleProductos);
}


function cargaDatosDeEntrega(car) {
    let html = '';
    let check = localStorage.getItem('check');
    $('#datosEntrega').text('');
    html += '<h2 class="page-header">Datos de Entrega</h2>'
    html += '<p><strong>Nombre: </strong>' + car.NOMBRE + ' ' + car.APELLIDO + '</p>';
    html += '<p><strong>Dirección: </strong>' + car.CALLE + '</p>';
    html += '<p><strong>Referencias: </strong>' + car.REFERENCIA + '</p>';
    html += '<p><strong>Celular: </strong>' + car.CELULAR + '</p>';
    if(check == '0'){
        html += '<p><strong>Fecha de Solicitud: </strong>' + car.FECHA + '</p>';
    }
    if(check == '1'){
        html += '<p><strong>Fecha de Solicitud: </strong>' + car.FECHA + '</p>';
        html += '<p><strong>Fecha de Apartado: </strong>' + car.FECHAAPARTADO + '</p>';
    }
    if(check == '2'){
        html += '<p><strong>Fecha de Solicitud: </strong>' + car.FECHA + '</p>';
        html += '<p><strong>Fecha de Apartado: </strong>' + car.FECHAAPARTADO + '</p>';
        html += '<p><strong>Fecha de Entrega: </strong>' + car.FECHAENTREGA + '</p>';
    }
    $('#datosEntrega').append(html);
}

function detalleProductos(prd) {

    let html = '';
    let precioTotal = 0;
    $('#divDetalle').text('');
    for (let p of prd) {
        html += '<ul class="list-group">';
        html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
        html += '<strong>' + p.CANTIDAD + 'X</strong>' + p.DESCRIPCION
        html += '<span class="badge badge-primary badge-pill"><i class="fa fa-usd" style="margin: 3px;" aria-hidden="true"></i>' + p.PRECIOGRUPO + '</span>';
        html += '</li>';
        html += '</ul>';
        precioTotal = parseFloat(precioTotal) + parseFloat(p.PRECIOGRUPO);
    }

    html += '<ul class="list-group">';
    html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
    html += '<strong>TOTAL:</strong>'
    html += '<span class="badge badge-primary badge-pill"><i class="fa fa-usd" style="margin: 3px;" aria-hidden="true"></i>' + precioTotal.toFixed(2) + '</span>';
    html += '</li>';
    html += '</ul>';

    $('#divDetalle').append(html);
}

function llenaMapa(longitud, latitud) {
    map = new google.maps.Map(document.getElementById('mapCanvasDetalle'), {
        zoom: 17,
        center: new google.maps.LatLng(longitud, latitud),
        mapTypeId: 'roadmap'
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(longitud, latitud),
        map: map
      });

      var infoWindow = new google.maps.InfoWindow(), marker, i;
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infoWindow.open(map, marker);
        }
      })(marker, i));
}

$('#checkPendiente').click(function () {
    let data = {
        'PERSONA': -1,
        'CARRITO': -1,
        'ESTATUS': 0
    };
    localStorage.setItem('check', '0');
    consumeServicio('POST', data, CONSULTACOMPRAS, cargaCompras);
    $('#detallePedido').hide();

    $("#checkPendiente").prop("checked", true);
    $("#checkEnEntrega").prop("checked", false);
    $("#checkEntregado").prop("checked", false);
});

$('#checkEnEntrega').click(function () {
    let usuarioId = JSON.parse(localStorage.getItem('usuario'));
    let data = {
        'PERSONA': usuarioId.PERSONA,
        'CARRITO': -1,
        'ESTATUS': 1
    };
    localStorage.setItem('check', '1');
    consumeServicio('POST', data, CONSULTACOMPRAS, cargaCompras);
    $('#detallePedido').hide();

    $("#checkPendiente").prop("checked", false);
    $("#checkEnEntrega").prop("checked", true);
    $("#checkEntregado").prop("checked", false);
});

$('#checkEntregado').click(function () {
    let usuarioId = JSON.parse(localStorage.getItem('usuario'));
    let data = {
        'PERSONA': usuarioId.PERSONA,
        'CARRITO': -1,
        'ESTATUS': 2
    };
    localStorage.setItem('check', '2');
    consumeServicio('POST', data, CONSULTACOMPRAS, cargaCompras);
    $('#detallePedido').hide();

    $("#checkPendiente").prop("checked", false);
    $("#checkEnEntrega").prop("checked", false);
    $("#checkEntregado").prop("checked", true);
});

function enEntrega(idCarrito) {
    $('#checkEnEntrega').click();
}

function entregado(idCarrito) {
    $('#checkEntregado').click();
}