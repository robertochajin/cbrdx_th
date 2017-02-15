/**
 * Created by TracesMaker on 08/02/2017.
 */
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // array in local storage for registered users
        let colaboradores: any[] = JSON.parse(localStorage.getItem('colaboradores')) || [
            {"idColaborador":"1",
                "numeroDocumento":"12",
                "primerNombre":"Nombre 1.1",
                "segundoNombre":"Nombre 1.2",
                "primerApellido":"Apellido 1.1",
                "segundoApellido":"Apellido 1.2",
                "tipoDocumento":"C.C.",
                "Avatar":"fotico.png",
                "ciudadExpedicion":"Bucaramanga",
                "fechaExp":"1 de 2 de 2002",
                "fechaNacimiento":"12",
                "idtercero":"12",
                "ciudadNacimiento":"Bogotá",
                "nacionalidad":"Colombiano",
                "genero":"F",
                "estadoCivil":"Soltero",
                "factorrh":"O+",
                "numeroDeHijos":"5",
                "lateralidad":"D",
                "nivelEducativo":"Pregrado",
                "profesion":"Orientador",
                "estratoSocioEconomico":"3",
                "vivienda":"Arrendada",
                "vehiculo":"Propio",
                "tallaCamisa":"12",
                "tallaPantalon":"12",
                "tallaCalzado":"11",
                "fechaDesde":"2011-05-11",
                "cargoActual":"cargo 1"},
            {"idColaborador":"2",
                "numeroDocumento":"23",
                "primerNombre":"Nombre 2.1",
                "segundoNombre":"Nombre 2.2",
                "primerApellido":"Apellido 2.1",
                "segundoApellido":"Apellido 2.2",
                "tipoDocumento":"C.C.",
                "Avatar":"fotico.png",
                "ciudadExpedicion":"Bucaramanga",
                "fechaExp":"2 de 3 de 2003",
                "fechaNacimiento":"23",
                "idtercero":"23",
                "ciudadNacimiento":"Bogotá",
                "nacionalidad":"Colombiano",
                "genero":"F",
                "estadoCivil":"Soltero",
                "factorrh":"O+",
                "numeroDeHijos":"5",
                "lateralidad":"D",
                "nivelEducativo":"Pregrado",
                "profesion":"Orientador",
                "estratoSocioEconomico":"3",
                "vivienda":"Arrendada",
                "vehiculo":"Propio",
                "tallaCamisa":"23",
                "tallaPantalon":"23",
                "tallaCalzado":"21",
                "fechaDesde":"2012-05-12",
                "cargoActual":"cargo 2"},
            {"idColaborador":"3",
                "numeroDocumento":"34",
                "primerNombre":"Nombre 3.1",
                "segundoNombre":"Nombre 3.2",
                "primerApellido":"Apellido 3.1",
                "segundoApellido":"Apellido 3.2",
                "tipoDocumento":"C.C.",
                "Avatar":"fotico.png",
                "ciudadExpedicion":"Bucaramanga",
                "fechaExp":"3 de 4 de 2004",
                "fechaNacimiento":"34",
                "idtercero":"34",
                "ciudadNacimiento":"Bogotá",
                "nacionalidad":"Colombiano",
                "genero":"F",
                "estadoCivil":"Soltero",
                "factorrh":"O+",
                "numeroDeHijos":"5",
                "lateralidad":"D",
                "nivelEducativo":"Pregrado",
                "profesion":"Orientador",
                "estratoSocioEconomico":"3",
                "vivienda":"Arrendada",
                "vehiculo":"Propio",
                "tallaCamisa":"34",
                "tallaPantalon":"34",
                "tallaCalzado":"31",
                "fechaDesde":"2013-05-13",
                "cargoActual":"cargo 3"},
            {"idColaborador":"4",
                "numeroDocumento":"45",
                "primerNombre":"Nombre 4.1",
                "segundoNombre":"Nombre 4.2",
                "primerApellido":"Apellido 4.1",
                "segundoApellido":"Apellido 4.2",
                "tipoDocumento":"C.C.",
                "Avatar":"fotico.png",
                "ciudadExpedicion":"Bucaramanga",
                "fechaExp":"4 de 5 de 2005",
                "fechaNacimiento":"45",
                "idtercero":"45",
                "ciudadNacimiento":"Bogotá",
                "nacionalidad":"Colombiano",
                "genero":"F",
                "estadoCivil":"Soltero",
                "factorrh":"O+",
                "numeroDeHijos":"5",
                "lateralidad":"D",
                "nivelEducativo":"Pregrado",
                "profesion":"Orientador",
                "estratoSocioEconomico":"3",
                "vivienda":"Arrendada",
                "vehiculo":"Propio",
                "tallaCamisa":"45",
                "tallaPantalon":"45",
                "tallaCalzado":"41",
                "fechaDesde":"2014-05-14",
                "cargoActual":"cargo 4"}
        ];

        let familys: any[] = JSON.parse(localStorage.getItem('familys')) || [
         {"idFamiliar":"1",
         "tipoDeDocumento":"1",
         "numeroDeDocumento":"1",
         "nombreCompleto":"1",
         "primerNombre":"1",
         "segundoNombre":"1",
         "primerApellido":"1",
         "segundoApellido":"1",
         "fechadeNacimiento":"1",
         "edad":"1",
         "parentesco":"1",
         "correoElectronico":"1",
         "telefono1":"1",
         "telefono2":"1",
         "direccionDeResidencia":"1",
         "convive":"1"},
         {"idFamiliar":"2",
         "tipoDeDocumento":"222",
         "numeroDeDocumento":"2",
         "nombreCompleto":"2",
         "primerNombre":"2",
         "segundoNombre":"2",
         "primerApellido":"2",
         "segundoApellido":"2",
         "fechadeNacimiento":"2",
         "edad":"2",
         "parentesco":"2",
         "correoElectronico":"correo2",
         "telefono1":"2",
         "telefono2":"2",
         "direccionDeResidencia":"2",
         "convive":"2"},
         {"idFamiliar":"3",
         "tipoDeDocumento":"3",
         "numeroDeDocumento":"3",
         "nombreCompleto":"3",
         "primerNombre":"3",
         "segundoNombre":"3",
         "primerApellido":"3",
         "segundoApellido":"3",
         "fechadeNacimiento":"3",
         "edad":"3",
         "parentesco":"3",
         "correoElectronico":"3",
         "telefono1":"3",
         "telefono2":"3",
         "direccionDeResidencia":"3",
         "convive":"3"}

         ];

        let locations: any[] = JSON.parse(localStorage.getItem('locations')) || [
                {
                    "idUbicacion": "1",
                    "NombreCiudad": "1",
                    "NombreDepartamento": "1",
                    "NombrePais": "1",
                    "Direccion": "1",
                    "Ciudad": "1",
                    "TipoDireccion": "1",
                    "TipoDireccionLabel": "1",
                    "Barrio": "1",
                    "CorreoElectronico": "1",
                    "Longitud": "1",
                    "Latitud": "1",
                    "ComoLlegar": "1",
                    "Celular": "1",
                    "Telefono": "1",
                },
                {
                    "idUbicacion": "2",
                    "NombreCiudad": "2",
                    "NombreDepartamento": "2",
                    "NombrePais": "2",
                    "Direccion": "2",
                    "Ciudad": "2",
                    "TipoDireccion": "2",
                    "TipoDireccionLabel": "2",
                    "Barrio": "2",
                    "CorreoElectronico": "2",
                    "Longitud": "2",
                    "Latitud": "2",
                    "ComoLlegar": "2",
                    "Celular": "2",
                    "Telefono": "2",
                },
                {
                    "idUbicacion": "3",
                    "NombreCiudad": "3",
                    "NombreDepartamento": "3",
                    "NombrePais": "3",
                    "Direccion": "3",
                    "Ciudad": "3",
                    "TipoDireccion": "3",
                    "TipoDireccionLabel": "3",
                    "Barrio": "3",
                    "CorreoElectronico": "3",
                    "Longitud": "3",
                    "Latitud": "3",
                    "ComoLlegar": "3",
                    "Celular": "3",
                    "Telefono": "3",
                }
            ];

        let cities: any[] = [{'idCiudad': 101, 'nombreCiudad': 'Floridablanca - Santander - Colombia'},
                            {'idCiudad': 102, 'nombreCiudad': 'Floridablanca - Vichada - Colombia'},
                            {'idCiudad': 103, 'nombreCiudad': 'Floridablanca - Cesar - Colombia'}];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                /*================ Colaboradores ================*/
                // obtiene todos los Colaboradores
                if (connection.request.url.endsWith('/api/colaboradores') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:colaboradores}
                    })));

                }

                // obtiene un colaborador por el id
                if (connection.request.url.match(/\/api\/colaboradores\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = colaboradores.filter(colaborador => { return colaborador.idColaborador == id; });
                        let colaborador = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: colaborador} })));


                    return;

                }

                // crea un colaborador en el local
                if (connection.request.url.endsWith('/api/colaboradores') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                   let newColaborador = JSON.parse(connection.request.getBody());

                    // save new user
                    newColaborador.idColaborador = colaboradores.length + 1;
                    colaboradores.push(newColaborador);
                    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar un colaborador
                if (connection.request.url.match(/\/api\/colaboradores\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                        // find user by id in users array
                        let updColaborador = JSON.parse(connection.request.getBody());
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < colaboradores.length; i++) {
                            let col = colaboradores[i];
                            if (col.idColaborador == id) {
                                // delete user
                                colaboradores[i] = updColaborador;
                                localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina un colaborador del localstorage
                if (connection.request.url.match(/\/api\/colaboradores\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < colaboradores.length; i++) {
                        let col = colaboradores[i];
                        if (col.idColaborador == id) {
                            // delete user
                            colaboradores.splice(i, 1);
                            localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                /*================ Ubicaciones ================*/

                // obtiene el listado de Ubicaciones
                if (connection.request.url.endsWith('/api/employees-location') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:locations}
                    })));

                }

                // obtiene un Ubicacion por el id
                if (connection.request.url.match(/\/api\/employees-location\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = locations.filter(location => { return location.idUbicacion == id; });
                    let location = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: location} })));


                    return;

                }

                // crea un Ubicacion en el local
                if (connection.request.url.endsWith('/api/employees-location') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newlocation = JSON.parse(connection.request.getBody());

                    // save new user
                    newlocation.idUbicacion = locations.length + 1;
                    newlocation.nombreCompleto = newlocation.primerNombre+' '+newlocation.segundoNombre+' '+newlocation.primerApellido+' '+newlocation.segundoApellido;
                    newlocation.edad = 25;
                    locations.push(newlocation);
                    localStorage.setItem('locations', JSON.stringify(locations));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar un Ubicacion
                if (connection.request.url.match(/\/api\/employees-location\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let newlocation = JSON.parse(connection.request.getBody());
                    newlocation.nombreCompleto = newlocation.primerNombre+' '+newlocation.segundoNombre+' '+newlocation.primerApellido+' '+newlocation.segundoApellido;
                    newlocation.edad = 25;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < locations.length; i++) {
                        let col = locations[i];
                        if (col.idUbicacion == id) {
                            // delete user
                            locations[i] = newlocation;
                            localStorage.setItem('locations', JSON.stringify(locations));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina un Ubicacion del localstorage
                if (connection.request.url.match(/\/api\/employees-location\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < locations.length; i++) {
                        let col = locations[i];
                        if (col.idUbicacion == id) {
                            // delete user
                            locations.splice(i, 1);
                            localStorage.setItem('locations', JSON.stringify(locations));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                // obtiene un listado de ciudades filtrado por el query
                if (connection.request.url.match(/\/api\/cities\/s\/\w+/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let qr = urlParts[urlParts.length - 1];
                    let matched = cities.filter(cities => {
                        //return cities.nombreCiudad.match(/^qr.*$/);
                        if(cities.nombreCiudad.match(/[qr]+/)){
                            return cities;
                        }
                    });
                    let matched = matched.length ? matched : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: matched} })));


                    return;

                }



                /*================ Familiares ================*/

                // obtiene el listado de familiares
                if (connection.request.url.endsWith('/api/employees-family-information') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:familys}
                    })));

                }

                // obtiene un familiar por el id
                if (connection.request.url.match(/\/api\/employees-family-information\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = familys.filter(family => { return family.idFamiliar == id; });
                    let family = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: family} })));


                    return;

                }

                // crea un familiar en el local
                if (connection.request.url.endsWith('/api/employees-family-information') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newFamily = JSON.parse(connection.request.getBody());

                    // save new user
                    newFamily.idFamiliar = familys.length + 1;
                    newFamily.nombreCompleto = newFamily.primerNombre+' '+newFamily.segundoNombre+' '+newFamily.primerApellido+' '+newFamily.segundoApellido;
                    newFamily.edad = 25;
                    familys.push(newFamily);
                    localStorage.setItem('familys', JSON.stringify(familys));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar un familiar
                if (connection.request.url.match(/\/api\/employees-family-information\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let newFamily = JSON.parse(connection.request.getBody());
                    newFamily.nombreCompleto = newFamily.primerNombre+' '+newFamily.segundoNombre+' '+newFamily.primerApellido+' '+newFamily.segundoApellido;
                    newFamily.edad = 25;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < familys.length; i++) {
                        let col = familys[i];
                        if (col.idFamiliar == id) {
                            // delete user
                            familys[i] = newFamily;
                            localStorage.setItem('familys', JSON.stringify(familys));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina un familiar del localstorage
                if (connection.request.url.match(/\/api\/employees-family-information\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < familys.length; i++) {
                        let col = familys[i];
                        if (col.idFamiliar == id) {
                            // delete user
                            familys.splice(i, 1);
                            localStorage.setItem('familys', JSON.stringify(familys));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};