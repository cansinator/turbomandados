function consumeServicio(metodo, data, servicio, funcion) {
  $.ajax({
    url: servicio,
    type: metodo,
    dataType: 'JSON',
    data: data,
    success: async function (result) {
      funcion(result)
    },
    error: function (e) {
      console.log(e.responseText);
    }
  });
}

function sumaCarrito(carrito) {
  var $total = document.querySelector('#total');
  var $lblCartCount = document.querySelector('#lblCartCount');
  var stageCarrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = [];
  if (stageCarrito != null) {
    total = 0;
    for (let item of stageCarrito) {
      carrito.push(item[0]['PRODUCTO']);
      total = total + parseFloat(item[0]['PRECIO']);
    }

    $lblCartCount.textContent = carrito.length;
    let totalDosDecimales = total.toFixed(2);
    $total.textContent = '$' + totalDosDecimales;
    return carrito;
  }
}

$('#cerrarSession').click(function () {
  FB.logout(function (response) {
    localStorage.clear();
    window.location.href = "index.html"
  });
});

function creaCarritoXML(carrito, usuario) {
  let prd = '';
  let cliente = '';
  let xmlContenedor = '<CONTENEDOR>';
  let xmlContenedorCierre = '</CONTENEDOR>';
  let xmlItem1 = '<ITEMS1>';
  let xmlItem1ierre = '</ITEMS1>';
  let xmlItem2 = '<ITEMS2>';
  let xmlItem2ierre = '</ITEMS2>';
  let xmlValue = '<VALUE ';
  let xmlValueCierre = ' />';

  cliente = xmlItem1 + xmlValue + 'TIENDA="' + usuario.TIENDA
    + '" LONGITUD="'
    + usuario.LONGITUD
    + '" LATITUD="'
    + usuario.LATITUD
    + '" PERSONA="'
    + usuario.PERSONA
    + '" CALLE="'
    + usuario.CALLE
    + '" REFERENCIA="'
    + usuario.REFERENCIAS
    + '" NOMBRE="'
    + usuario.NOMBRE
    + '" APELLIDOS="'
    + usuario.APELLIDOS
    + '" CELULAR="'
    + usuario.TELEFONO
    + '"' + xmlValueCierre + xmlItem1ierre;

  for (let c of carrito) {
    prd += xmlValue + 'PRODUCTO="' + c[0].PRODUCTO + '" CANTIDAD="' + c[0].CANTIDAD + '"' + xmlValueCierre;
  }

  prd = xmlItem2 + prd + xmlItem2ierre;

  return xmlContenedor + cliente + prd + xmlContenedorCierre;
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    console.log(response);
  } else {
    localStorage.clear();
    window.location.href = "index.html"
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}


window.fbAsyncInit = function () {
  FB.init({
    appId: APIFBID,
    cookie: true,
    xfbml: true,
    version: VERSION
  });


  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};