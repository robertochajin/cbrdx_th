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
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // getColaboradores
                if (connection.request.url.endsWith('/api/colaboradores') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {"data":[
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
                                "fechaDeste":"2011-05-11",
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
                                "fechaDeste":"2012-05-12",
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
                                "fechaDeste":"2013-05-13",
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
                                "fechaDeste":"2014-05-14",
                                "cargoActual":"cargo 4"}
                        ]}
                    })));

                }

                if (connection.request.url.match(/\/api\/colaboradores\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // get users
               /* if (connection.request.url.endsWith('/api/colaboradores') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: colaboradores })));

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {"data": {"idColaborador":"3",
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
                                "fechaDeste":"2013-05-13",
                                "cargoActual":"cargo 3"}}
                    })));
                    return;
                }*/

                // create
                if (connection.request.url.endsWith('/api/colaboradores') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                   let newColaborador = JSON.parse(connection.request.getBody());

                    // validation
                    //let duplicateUser = colaboradores.filter(colaborador => { return user.username === newUser.username; }).length;
                    //if (duplicateUser) {
                        return connection.mockError(new ResponseOptions);
                    //}

                    // save new user
                    newColaborador.idColaborador = colaboradores.length + 1;
                    colaboradores.push(newColaborador);
                    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};