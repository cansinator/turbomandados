$(document).ready(function () {
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            userValidation();
        } else {
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

    function userValidation() {
        FB.api('/me', function (response) {
            let data = {
                'UX': '',
                'PX': '',
                'FB': response.id,
                'NFB': response.name
            };
            consumeServicio('POST', data, CONSULTAUSUARIO, llenaUsuario);
        });
    }
});
var usr = new Usuarios();

async function validaUsuario(ux, px) {
    let data = {
        'UX': ux,
        'PX': px
    };
    consumeServicio('POST', data, CONSULTAUSUARIO, llenaUsuario);
}

function statusChangeCallback(response) {

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

function llenaUsuario(usrjson) {
    localStorage.setItem("usuario", JSON.stringify(usrjson));
    window.location.replace("tiendas.html");
}

