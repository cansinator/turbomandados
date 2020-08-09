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

function statusChangeCallback(response){
    
/* {
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
} */
}

function llenaUsuario(usrjson){
    localStorage.setItem("usuario", JSON.stringify(usrjson));
    window.location.replace("tiendas.html");
}

