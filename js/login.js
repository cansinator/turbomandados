$(document).ready(function(){
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
});
var usr = new Usuarios();

async function validaUsuario(ux, px){
    let data = {
        'UX': ux,
        'PX': px
    };
    consumeServicio('POST', data, CONSULTAUSUARIO, llenaUsuario);
}


function llenaUsuario(usrjson){
    localStorage.setItem("usuario", JSON.stringify(usrjson));
    window.location.replace("tiendas.html");
}

