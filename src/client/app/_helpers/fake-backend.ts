/**
 * Created by TracesMaker on 08/02/2017.
 */
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {

        let employees: any[] = JSON.parse(localStorage.getItem('employees')) || [
                {"idColaborador":"1",

                    "numeroDocumento":"1098936874",

                    "nombreCompleto":"Luis Enrrique Gomez Ramirez",

                    "primerNombre":"Luis",

                    "segundoNombre":"Enrrique",

                    "primerApellido":"Gomez",

                    "segundoApellido":"Ramirez",

                    "tipoDocumento":"C.C.",

                    "Avatar":"fotico.png",

                    "ciudadExpedicion":"Bucaramanga",

                    "fechaExp":"1 de 2 de 2010",

                    "fechaNacimiento":"12 de 12 de 1991",

                    "idtercero":"12",

                    "ciudadNacimiento":"Bogotá",

                    "nacionalidad":"Colombiano",

                    "genero":"M",

                    "estadoCivil":"Soltero",

                    "factorrh":"O+",

                    "numeroDeHijos":"5",

                    "lateralidad":"D",

                    "nivelEducativo":"Pregrado",

                    "profesion":"Orientador",

                    "estratoSocioEconomico":"3",

                    "vivienda":"Arrendada",

                    "vehiculo":"Propio",

                    "tallaCamisa":"M",

                    "tallaPantalon":"32",

                    "tallaCalzado":"38",

                    "fechaDesde":"2011-05-11",

                    "cargoActual":"Ejecutivo Comercial"},

                {"idColaborador":"2",

                    "numeroDocumento":"91256964",

                    "primerNombre":"Miguel",

                    "segundoNombre":"Alejandro",

                    "primerApellido":"Fernandez",

                    "segundoApellido":"Lopera",

                    "tipoDocumento":"C.C.",

                    "Avatar":"fotico.png",

                    "ciudadExpedicion":"Bucaramanga",

                    "fechaExp":"2 de 3 de 2003",

                    "fechaNacimiento":"23 de 01 de 1985",

                    "idtercero":"23",

                    "ciudadNacimiento":"Bogotá",

                    "nacionalidad":"Colombiano",

                    "genero":"M",

                    "estadoCivil":"Soltero",

                    "factorrh":"O+",

                    "numeroDeHijos":"5",

                    "lateralidad":"D",

                    "nivelEducativo":"Pregrado",

                    "profesion":"Orientador",

                    "estratoSocioEconomico":"3",

                    "vivienda":"Arrendada",

                    "vehiculo":"Propio",

                    "tallaCamisa":"L",

                    "tallaPantalon":"36",

                    "tallaCalzado":"40",

                    "fechaDesde":"2012-05-12",

                    "cargoActual":"Asesor"},

                {"idColaborador":"3",

                    "numeroDocumento":"63859741",

                    "primerNombre":"Juana",

                    "segundoNombre":"Maria",

                    "primerApellido":"Díaz",

                    "segundoApellido":"Rodriguez",

                    "tipoDocumento":"C.C.",

                    "Avatar":"fotico.png",

                    "ciudadExpedicion":"Bucaramanga",

                    "fechaExp":"3 de 4 de 2004",

                    "fechaNacimiento":"12 de 03 de 1986",

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

                    "tallaCamisa":"S",

                    "tallaPantalon":"8",

                    "tallaCalzado":"36",

                    "fechaDesde":"2013-05-13",

                    "cargoActual":"Ejecutiva"},

                {"idColaborador":"4",

                    "numeroDocumento":"63258159",

                    "primerNombre":"Martha",

                    "segundoNombre":"Sofia",

                    "primerApellido":"Sepulveda",

                    "segundoApellido":"Blanco",

                    "tipoDocumento":"C.C.",

                    "Avatar":"fotico.png",

                    "ciudadExpedicion":"Bucaramanga",

                    "fechaExp":"4 de 5 de 2005",

                    "fechaNacimiento":"2 de 4 de 1987",

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

                    "tallaCamisa":"M",

                    "tallaPantalon":"10",

                    "tallaCalzado":"38",

                    "fechaDesde":"2014-05-14",

                    "cargoActual":"Ejecutiva"}

            ];

        let familys: any[] = JSON.parse(localStorage.getItem('familys'))
            || [

                {"idFamiliar":"1",

                    "tipoDeDocumento":"R.C",

                    "numeroDeDocumento":"1098154874",

                    "nombreCompleto":"Maria Alejandra Gomez Reatiga",

                    "primerNombre":"Maria",

                    "segundoNombre":"Alejandra",

                    "primerApellido":"Gomez",

                    "segundoApellido":"Reatiga",

                    "fechadeNacimiento":"1 de 2 de 2009",

                    "edad":"8",

                    "parentesco":"1",

                    "correoElectronico":"mariagomez@gmail.com",

                    "telefono1":"3214569874",

                    "telefono2":"6531887",

                    "direccionDeResidencia":"Calle 40 No. 21-56",

                    "convive":"1"},

                {"idFamiliar":"2",

                    "tipoDeDocumento":"R.C",

                    "numeroDeDocumento":"1098564821",

                    "nombreCompleto":"Catalina Mejia Lopez",

                    "primerNombre":"Catalina",

                    "segundoNombre":"",

                    "primerApellido":"Mejia",

                    "segundoApellido":"Lopez",

                    "fechadeNacimiento":"2 de 2 de 2009",

                    "edad":"8",

                    "parentesco":"2",

                    "correoElectronico":"catalinamejia@gmail.com",

                    "telefono1":"6598741",

                    "telefono2":"3159874563",

                    "direccionDeResidencia":"Calle 15 No. 25-15",

                    "convive":"2"},

                {"idFamiliar":"3",

                    "tipoDeDocumento":"R.C",

                    "numeroDeDocumento":"1098654987",

                    "nombreCompleto":"Jairo Jose Sepulveda Blanco",

                    "primerNombre":"Jairo",

                    "segundoNombre":"Jose",

                    "primerApellido":"Sepulveda",

                    "segundoApellido":"Blanco",

                    "fechadeNacimiento":"3 de 2 de 2009",

                    "edad":"8",

                    "parentesco":"3",

                    "correoElectronico":"josesepulveda@gmail.com",

                    "telefono1":"3",

                    "telefono2":"3",

                    "direccionDeResidencia":"3",

                    "convive":"3"}

            ];

        let references: any[] = JSON.parse(localStorage.getItem('references'))
            || [

                {

                    'idReferencia'          : "1",

                    'tipodeReferencia'      : "Laboral",

                    'empresa'               : "Gobernación de Santander",

                    'nombreCompleto'        : "Maria Angelica Diaz Ramirez",

                    'primerNombre'          : "Maria",

                    'segundoNombre'         : "Angelica",

                    'primerApellido'        : "Diaz",

                    'segundoApellido'       : "Ramirez",

                    'ciudad'                : "Bucaramanga",

                    'telefono'              : "6597842",

                    'celular'               : "3215874125",

                    'numeroContacto'        : "3169874125",

                    'direccion'             : "Calle 5 No. 19-25"
                },

                {

                    'idReferencia'          : "2",

                    'tipodeReferencia'      : "Laboral",

                    'empresa'               : "ESSA",

                    'nombreCompleto'        : "Alexander Ramirez",

                    'primerNombre'          : "Alexander",

                    'segundoNombre'         : "",

                    'primerApellido'        : "Ramirez",

                    'segundoApellido'       : "",

                    'ciudad'                : "Bucaramanga",

                    'telefono'              : "6597841",

                    'celular'               : "3168945217",

                    'numeroContacto'        : "3159876541",

                    'direccion'             : "Cra 15 No. 26-87"
                },

                {

                    'idReferencia'          : "3",

                    'tipodeReferencia'      : "Familiar",

                    'empresa'               : "",

                    'nombreCompleto'        : "Katherine Gomez Velazquez",

                    'primerNombre'          : "Katherine",

                    'segundoNombre'         : "",

                    'primerApellido'        : "Gomez",

                    'segundoApellido'       : "Velazquez",

                    'ciudad'                : "Girón",

                    'telefono'              : "3159874158",

                    'celular'               : "3216987451",

                    'numeroContacto'        : "6597841",

                    'direccion'             : "Cra 2 No. 12-98"
                }
            ];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // obtiene todos los Colaboradores
                if (connection.request.url.endsWith('/api/employees') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:employees}
                    })));

                }

                // obtiene un colaborador por el id
                if (connection.request.url.match(/\/api\/employees\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = employees.filter(employee => { return employee.idColaborador == id; });
                        let employee = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: employee} })));


                    return;

                }

                // crea un colaborador en el local
                if (connection.request.url.endsWith('/api/employees') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                   let newColaborador = JSON.parse(connection.request.getBody());

                    // save new user
                    newColaborador.idColaborador = employees.length + 1;
                    employees.push(newColaborador);
                    localStorage.setItem('employees', JSON.stringify(employees));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar un colaborador
                if (connection.request.url.match(/\/api\/employees\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                        // find user by id in users array
                        let updColaborador = JSON.parse(connection.request.getBody());
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < employees.length; i++) {
                            let col = employees[i];
                            if (col.idColaborador == id) {
                                // delete user
                                employees[i] = updColaborador;
                                localStorage.setItem('employees', JSON.stringify(employees));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina un colaborador del localstorage
                if (connection.request.url.match(/\/api\/employees\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < employees.length; i++) {
                        let col = employees[i];
                        if (col.idColaborador === id) {
                            // delete user
                            employees.splice(i, 1);
                            localStorage.setItem('employees', JSON.stringify(employees));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

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

                // obtiene el referencias
                if (connection.request.url.endsWith('/api/references') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:references}
                    })));

                }

                // obtiene una referencia por el id
                if (connection.request.url.match(/\/api\/references\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = references.filter(reference => { return reference.idReferencia == id; });
                    let reference = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: reference} })));

                    return;

                }

                // crea una referencia en el localstorage
                if (connection.request.url.endsWith('/api/references') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newReference = JSON.parse(connection.request.getBody());

                    // save new user
                    newReference.idReferencia = familys.length + 1;
                    newReference.nombreCompleto = newReference.primerNombre+' '+newReference.segundoNombre+' '+newReference.primerApellido+' '+newReference.segundoApellido;
                    newReference.numeroContacto = newReference.telefono+' - '+newReference.celular;
                    references.push(newReference);
                    localStorage.setItem('references', JSON.stringify(references));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar una referencia
                if (connection.request.url.match(/\/api\/references\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let newReference = JSON.parse(connection.request.getBody());
                    newReference.nombreCompleto = newReference.primerNombre+' '+newReference.segundoNombre+' '+newReference.primerApellido+' '+newReference.segundoApellido;
                    newReference.numeroContacto = newReference.telefono+' - '+newReference.celular;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < references.length; i++) {
                        let col = references[i];
                        if (col.idReferencia == id) {
                            // delete user
                            references[i] = newReference;
                            localStorage.setItem('references', JSON.stringify(references));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina una referencias del localstorage
                if (connection.request.url.match(/\/api\/references\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < references.length; i++) {
                        let col = references[i];
                        if (col.idReferencia == id) {
                            // delete user
                            references.splice(i, 1);
                            localStorage.setItem('references', JSON.stringify(references));
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