
$(document).ready(function () {

});

function configuraTemplate(nivel) {
    if (validaSesion()) {
        creaHeader(nivel);

    } else {
        window.location.href = "index.html"
    }
}


function creaHeader(nivel) {
    let html = '';

    let menu = '';

    if (nivel == 0) {
        menu += '<li class="nav-item active">';
        menu += '<a class="nav-link" href="compras.html">Compras<span class="sr-only">(current)</span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="tiendas.html">Tiendas<span class="sr-only"></span></a>';
        menu += '</li>';
    }

    if (nivel == 1) {
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="compras.html">Compras<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item active">';
        menu += '<a class="nav-link" href="tiendas.html">Tiendas<span class="sr-only">(current)</span></a>';
        menu += '</li>';
    }

    if (nivel == 2) {
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="compras.html">Compras<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="tiendas.html">Tiendas<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item active">';
        menu += '<a class="nav-link" href="productos.html">Productos<span class="sr-only">(current)</span></a>';
        menu += '</li>';
    }
    if (nivel == 3) {
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="compras.html">Compras<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="tiendas.html">Tiendas<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="productos.html">Productos<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item active">';
        menu += '<a class="nav-link" href="carrito.html">Carrito<span class="sr-only">(current)</span></a>';
        menu += '</li>';
    }

    if (nivel == 4) {
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="compras.html">Compras<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="tiendas.html">Tiendas<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="productos.html">Productos<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item">';
        menu += '<a class="nav-link" href="carrito.html">Carrito<span class="sr-only"></span></a>';
        menu += '</li>';
        menu += '<li class="nav-item active">';
        menu += '<a class="nav-link" href="datosentrega.html">Datos de Entrega<span class="sr-only">(current)</span></a>';
        menu += '</li>';
    }

    html += '        <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">';
    html += '        <a class="navbar-brand" href="#">';
    html += '            <img src="img/tiendas/turbomandados.jpg" width="30" height="30" class="d-inline-block align-top" alt="">';
    html += '            Turbo Mandados';
    html += '        </a>';
    html += '            <a class="navbar-brand" href="carrito.html"><i class="fa fa-shopping-basket fa-2" aria-hidden="true" style="font-size: 24px;"></i>';
    html += '            <span class="badge badge-warning" id="lblCartCount">0</span>';
    html += '            <span class="badge badge-warning" id="total">$0.00</span></a>';
    html += '        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"';
    html += '            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
    html += '            <span class="navbar-toggler-icon"></span>';
    html += '        </button>   ';
    html += '        <div class="collapse navbar-collapse" id="navbarSupportedContent">';
    html += '            <ul class="navbar-nav mr-auto">';
    html += menu;
    html += '            </ul>';
    html += '            <span class="fa fa-user" style="font-size: 24px;" ><a id="nombre" style="font-size: 15px; margin: 4px; font-family: sans-serif"><a/></span>';
    html += '            <form class="form-inline my-2 my-lg-0">';
    html += '                <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search">';
    html += '            </form>';

    html += '            <a class="navbar-brand" id="cerrarSession"><i class="fa fa-power-off fa-2" aria-hidden="true" style="font-size: 24px;"></i></a>';    
    html += '        </div>';
    html += '    </nav>';
    $('#header').html(html);
}

function creaFooter() {
    let html = '';
    html += '   <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">';
    html += '   <ul class="navbar-nav">';
    html += '       <li class="nav-item">';
    html += '           <spa id="datoFooter" class="nav-link"></span>';
    html += '       </li>';
    html += '       <li class="nav-item">';
    html += '           <span id="datoHeader" class="nav-link"></span>';
    html += '       </li>';
    html += '       <li class="nav-item">';
    html += '           <span id="datoHeaderDetalle" class="nav-link" href="#"></span>';
    html += '       </li>';
    html += '   </ul>';
    html += '   </div>';
    $('#footer').html(html);
}

function validaSesion() {
    var usuario = localStorage.getItem("usuario");
    if (usuario != null && usuario != '')
        return true;
    else return false;
}