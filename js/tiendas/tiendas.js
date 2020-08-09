class Tiendas{
    Tienda(tienda, nombretienda, estatus, direccion, codigopostal, longitud, latidud, imagentienda){
        this.tienda = tienda;
        this.nombretienda = nombretienda;
        this.estatus = estatus;
        this.direccion = direccion;
        this.codigopostal = codigopostal;
        this.longitud = longitud;
        this.latidud = latidud;
        this.imagentienda = imagentienda;
    }

    llenaTienda(data){
        let tiendas = [];

/*         data.forEach(function(tienda){
            tiendas.Tienda(new Tiendas(tienda.TIENDA, tienda.NOMBRETIENDA, tienda.ESTATUS, tienda.DIRECCION, tienda.CODIGOPOSTAL, tienda.LONGITUD, tienda.LATITUD, tienda.IMAGENTIENDA));
        }); */

        

        data.forEach(function (tienda) {
            tiendas.push(new Tiendas(tienda.TIENDA, tienda.NOMBRETIENDA, tienda.ESTATUS, tienda.DIRECCION, tienda.CODIGOPOSTAL, tienda.LONGITUD, tienda.LATITUD, tienda.IMAGENTIENDA));
        });

        return tiendas;
    }
}