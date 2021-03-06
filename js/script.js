// Initialize the Firebase app by passing in the messagingSenderId
var config = {
  messagingSenderId: "540033749727"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

navigator.serviceWorker.register('https://cansinator.github.io/turbomandados/firebase-messaging-sw.js')
  .then(registration => {
    messaging.useServiceWorker(registration)

    messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {

              let data = {
                'TOKEN': currentToken,
                'ESTATUS': 1,
                'PERFIL': 3
              };
              consumeServicio('POST', data, TOKEN, okrequest);

              console.log('Token: ' + currentToken);
              sendTokenToServer(currentToken);
            } else {
              console.log('No Instance ID token available. Request permission to generate one.');
              setTokenSentToServer(false);
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            setTokenSentToServer(false);
          });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });

  });

// Request for permission


// Handle incoming messages
messaging.onMessage(function (payload) {
  console.log("Notification received: ", payload);
  toastr["info"](payload.notification.body, payload.notification.title);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
  messaging.getToken()
    .then(function (refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent 
      // to the app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
    })
    .catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
});

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
      'unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function okrequest(resp) {
  return resp;
}