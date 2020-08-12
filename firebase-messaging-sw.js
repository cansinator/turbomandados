importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js')
importScripts('js/sw-utils.js');

var config = {
  messagingSenderId: "540033749727"
};
firebase.initializeApp(config);

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = 'Data Message Title';
  const notificationOptions = {
    body: 'Data Message body',
    icon: 'alarm.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

const CACHE_ESTATICO = 'PWA-cache-estatico-v1';
const CACHE_DINAMICO = 'PWA-cache-dinamico-v1';
const CACHE_INMUTABLE = 'PWA-cache-inmutable-v1';


const APP_SHELL = [
  'carrito.html',
  'compras.html',
  'datosentrega.html',
  'index.html',
  'productos.html',
  'tiendas.html',
  'css/general.css',
  'css/main.css',
  'css/util.css',
  'js/login.js',
  'js/main.js',
  'js/productos.js',
  'js/script.js',
  'js/tienda.js',
  'js/utilidades/constantes.js',
  'js/utilidades/template.js',
  'js/utilidades/util.js',
  'img/img-01.png',
  'img/icons/favicon.ico',
  'img/icons/icon-128x128.png',
  'img/icons/icon-144x144.png',
  'img/icons/icon-152x152.png',
  'img/icons/icon-192x192.png',
  'img/icons/icon-384x384.png',
  'img/icons/icon-512x512.png',
  'img/icons/icon-72x72.png',
  'img/icons/icon-96x96.png',
  'img/tiendas/turbomandados.jpg',
  'js/carrito.js',
  'js/compras.js',
  'js/datosentrega.js',
  'js/firebase-messaging.js',
  'js/firebase.js',
  'js/firebase-app.js'
];

const APP_SHELL_INMUTABLE = [
'fonts/font-awesome-4.7.0/css/font-awesome.css'
   /* 'fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  'fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.eot',
  'fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.svg',
  'fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf',
  'fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff',
  'fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2',
  'fonts/font-awesome-4.7.0/fonts/FontAwesome.otf',
  'fonts/font-awesome-4.7.0/less/animated.less',
  'fonts/font-awesome-4.7.0/less/bordered-pulled.less',
  'fonts/font-awesome-4.7.0/less/core.less',
  'fonts/font-awesome-4.7.0/less/fixed-width.less',
  'fonts/font-awesome-4.7.0/less/font-awesome.less',
  'fonts/font-awesome-4.7.0/less/icons.less',
  'fonts/font-awesome-4.7.0/less/larger.less',
  'fonts/font-awesome-4.7.0/less/list.less',
  'fonts/font-awesome-4.7.0/less/mixins.less',
  'fonts/font-awesome-4.7.0/less/path.less',
  'fonts/font-awesome-4.7.0/less/rotated-flipped.less',
  'fonts/font-awesome-4.7.0/less/screen-reader.less',
  'fonts/font-awesome-4.7.0/less/stacked.less',
  'fonts/font-awesome-4.7.0/less/variables.less',
  'fonts/font-awesome-4.7.0/scss/font-awesome.scss',
   'fonts/font-awesome-4.7.0/scss/_animated.scss',
  'fonts/font-awesome-4.7.0/scss/_bordered-pulled.scss',
  'fonts/font-awesome-4.7.0/scss/_core.scss',
  'fonts/font-awesome-4.7.0/scss/_fixed-width.scss',
  'fonts/font-awesome-4.7.0/scss/_icons.scss',
  'fonts/font-awesome-4.7.0/scss/_larger.scss',
  'fonts/font-awesome-4.7.0/scss/_list.scss',
  'fonts/font-awesome-4.7.0/scss/_mixins.scss',
  'fonts/font-awesome-4.7.0/scss/_path.scss',
  'fonts/font-awesome-4.7.0/scss/_rotated-flipped.scss',
  'fonts/font-awesome-4.7.0/scss/_screen-reader.scss',
  'fonts/font-awesome-4.7.0/scss/_stacked.scss',
  'fonts/font-awesome-4.7.0/scss/_variables.scss', 
  'js/jquery-3.3.1.min.js',
  'js/jquery-ui.min.js',
  'js/jquery.min.js',
  'vendor/animate/animate.css',
  'vendor/bootstrap/css/bootstrap-grid.css',
  'vendor/bootstrap/css/bootstrap-grid.css.map',
  'vendor/bootstrap/css/bootstrap-grid.min.css',
  'vendor/bootstrap/css/bootstrap-grid.min.css.map',
  'vendor/bootstrap/css/bootstrap-reboot.css',
  'vendor/bootstrap/css/bootstrap-reboot.css.map',
  'vendor/bootstrap/css/bootstrap-reboot.min.css',
  'vendor/bootstrap/css/bootstrap-reboot.min.css.map',
  'vendor/bootstrap/css/bootstrap.css',
  'vendor/bootstrap/css/bootstrap.css.map',
  'vendor/bootstrap/css/bootstrap.min.css',
  'vendor/bootstrap/css/bootstrap.min.css.map',
  'vendor/bootstrap/js/bootstrap.js',
  'vendor/bootstrap/js/bootstrap.min.js',
  'vendor/bootstrap/js/popper.js',
  'vendor/bootstrap/js/popper.min.js',
  'vendor/bootstrap/js/tooltip.js',
  'vendor/css-hamburgers/hamburgers.css',
  'vendor/css-hamburgers/hamburgers.min.css',
  'vendor/jquery/jquery-3.2.1.min.js',
  'vendor/select2/select2.css',
  'vendor/select2/select2.js',
  'vendor/select2/select2.min.css',
  'vendor/select2/select2.min.js'*/
];



self.addEventListener('install', e => {


  const cacheStatic = caches.open(CACHE_ESTATICO).then(cache =>
    cache.addAll(APP_SHELL));

  const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache =>
    cache.addAll(APP_SHELL_INMUTABLE));



  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

  const respuesta = caches.keys().then(keys => {

    keys.forEach(key => {

      if (key !== CACHE_ESTATICO && key.includes('static')) {
        return caches.delete(key);
      }

      if (key !== CACHE_DINAMICO && key.includes('dynamic')) {
        return caches.delete(key);
      }

    });

  });

  e.waitUntil(respuesta);

});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});