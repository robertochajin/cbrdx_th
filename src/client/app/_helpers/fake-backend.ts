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

                {
                    "idFamiliar":"1",
                    'idColaborador'         : "1",
                    "tipoDeDocumento": {'value' : "1", 'label' : "Cédula de Ciudadania"},
                    "numeroDeDocumento":"1098154874",
                    "primerNombre":"Maria",
                    "segundoNombre":"Alejandra",
                    "primerApellido":"Gomez",
                    "segundoApellido":"Reatiga",
                    "fechadeNacimiento":"01/02/2009",
                    "parentesco":{'value' : "2", 'label' : "Madre"},
                    "correoElectronico":"mariagomez@gmail.com",
                    "telefono1":"3214569874",
                    "telefono2":"6531887",
                    "direccionDeResidencia":"Calle 40 No. 21-56",
                    "convive":"1"
                },
                {
                    "idFamiliar":"2",
                    'idColaborador'         : "1",
                    "tipoDeDocumento": {'value' : "1", 'label' : "Cédula de Ciudadania"},
                    "numeroDeDocumento":"1098564821",
                    "primerNombre":"Catalina",
                    "segundoNombre":"",
                    "primerApellido":"Mejia",
                    "segundoApellido":"Lopez",
                    "fechadeNacimiento":"01/02/2009",
                    "parentesco":{'value' : "2", 'label' : "Madre"},
                    "correoElectronico":"catalinamejia@gmail.com",
                    "telefono1":"6598741",
                    "telefono2":"3159874563",
                    "direccionDeResidencia":"Calle 15 No. 25-15",
                    "convive":"2"
                },

                {
                    "idFamiliar":"3",
                    'idColaborador'         : "1",
                    "tipoDeDocumento": {'value' : "1", 'label' : "Cédula de Ciudadania"},
                    "numeroDeDocumento":"1098654987",
                    "primerNombre":"Jairo",
                    "segundoNombre":"Jose",
                    "primerApellido":"Sepulveda",
                    "segundoApellido":"Blanco",
                    "fechadeNacimiento":"01/02/2009",
                    "parentesco":{'value' : "1", 'label' : "Padre"},
                    "correoElectronico":"josesepulveda@gmail.com",
                    "telefono1":"3",
                    "telefono2":"3",
                    "direccionDeResidencia":"3",
                    "convive":"3"
                }

            ];

        let references: any[] = JSON.parse(localStorage.getItem('references'))
            || [

                {

                    'idReferencia'          : "1",
                    'idColaborador'         : "1",
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
                    'idColaborador'         : "1",
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

        let fstudies: any[] = JSON.parse(localStorage.getItem('fstudies'))
            || [

                {

                    'idEstudio'             : "1",
                    'idColaborador'         : "1",
                    'titulo'                : "Laboral",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "uis",
                    'confirmada'            : "Si",
                    'nivelEstudio'          :   "Universitario",
                    'areaEstudio'           :   "Ingenieria",
                    'otraInstitucion'       :   "",
                    'estadoEstudio'         :   "Culminado",
                },

                {

                    'idEstudio'             : "2",
                    'idColaborador'         : "1",
                    'titulo'                : "Abogado",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "UPB",
                    'confirmada'            : "Si",
                    'nivelEstudio'          : "Universitario",
                    'areaEstudio'           : "Ingenieria",
                    'otraInstitucion'       : "",
                    'estadoEstudio'         : "Culminado",
                },

                {

                    'idEstudio'             : "3",
                    'idColaborador'         : "1",
                    'titulo'                : "ingeniero",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "uis",
                    'confirmada'            : "Si",
                    'nivelEstudio'          : "Universitario",
                    'areaEstudio'           : "Ingenieria",
                    'otraInstitucion'       : "",
                    'estadoEstudio'         : "Culminado",
                }
            ];

        let nfstudies: any[] = JSON.parse(localStorage.getItem('nfstudies'))
            || [

                {

                    'idEstudio'             : "1",
                    'idColaborador'         : "1",
                    'titulo'                : "Laboral",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "uis",
                    'confirmada'            : "Si",
                    'tipoEstudio'           : "Tipo",
                    'otroTipoEstudio'       : " Otro tipo",
                    'intensidad'            : "8 Horas",
                    'descripcion'           : "Un cursito para aprender algo",
                    'areaEstudio'           : "Diplomado",
                    'estadoEstudio'         : " Terminado",
                },

                {

                    'idEstudio'             : "2",
                    'idColaborador'         : "1",
                    'titulo'                : "Abogado",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "UPB",
                    'confirmada'            : "Si",
                    'tipoEstudio'           : "Tipo",
                    'otroTipoEstudio'       : " Otro tipo",
                    'intensidad'            : "8 Horas",
                    'descripcion'           : "Un cursito para aprender algo",
                    'areaEstudio'           : "Diplomado",
                    'estadoEstudio'         : " Terminado",
                },

                {

                    'idEstudio'             : "3",
                    'idColaborador'         : "1",
                    'titulo'                : "ingeniero",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'institucion'           : "uis",
                    'confirmada'            : "Si",
                    'tipoEstudio'           : "Tipo",
                    'otroTipoEstudio'       : " Otro tipo",
                    'intensidad'            : "8 Horas",
                    'descripcion'           : "Un cursito para aprender algo",
                    'areaEstudio'           : "Diplomado",
                    'estadoEstudio'         : " Terminado",
                }
            ];

        let experiences: any[] = JSON.parse(localStorage.getItem('experience'))
            || [

                {
                    'idExperiencia'             : "1",
                    'idColaborador'         : "1",
                    'empresa'               : "Crezcamos",
                    'cargo'                 : "Gerente",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'telefonoEmpresa'       : "uis",
                    'sectorEmpresa'         : "Si",
                    'subsectorEmpresa'      : "Tipo",
                    'nivelCargo'            : " Otro tipo",
                    'areaCargo'             : "8 Horas",
                    'jefeInmediato'         : "Un cursito para aprender algo",
                    'tiempoExperiencia'     : "Diplomado",
                    'actualmente'           : "1"
                },
                {
                    'idExperiencia'             : "2",
                    'idColaborador'         : "1",
                    'empresa'               : "Crezcamos",
                    'cargo'                 : "Gerente",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'telefonoEmpresa'       : "uis",
                    'sectorEmpresa'         : "Si",
                    'subsectorEmpresa'      : "Tipo",
                    'nivelCargo'            : " Otro tipo",
                    'areaCargo'             : "8 Horas",
                    'jefeInmediato'         : "Un cursito para aprender algo",
                    'tiempoExperiencia'     : "Diplomado",
                    'actualmente'           : "1"
                },
                {
                    'idExperiencia'             : "3",
                    'idColaborador'         : "1",
                    'empresa'               : "Crezcamos",
                    'cargo'                 : "Gerente",
                    'ingreso'               : "2 de mayo del 1999",
                    'finalizacion'          : "2 de mayo del 2005",
                    'ciudad'                : "Bucaramanga",
                    'telefonoEmpresa'       : "uis",
                    'sectorEmpresa'         : "Si",
                    'subsectorEmpresa'      : "Tipo",
                    'nivelCargo'            : " Otro tipo",
                    'areaCargo'             : "8 Horas",
                    'jefeInmediato'         : "Un cursito para aprender algo",
                    'tiempoExperiencia'     : "Diplomado",
                    'actualmente'           : "1"
                }
            ];

        let locations: any[] = JSON.parse(localStorage.getItem('locations')) || [
                {
                    'idUbicacion': '1',
                    'ciudad': {'idCiudad': 103, 'nombreCiudad': 'Bucaramanga'},
                    'departamento': {'idDepartamento': 3, 'nombreDepartamento': 'Santander'},
                    'pais': {'idPais': 3, 'nombrePais': 'Colombia'},
                    'direccion': 'Diagonal 14 # 32 - 32 Torre 1 Apartamento 4 ',
                    'tipoDireccion': {'idTipoDireccion': 2, 'tipoDireccion': 'Comercial'},
                    'barrio': 'San Alonso',
                    'correoElectronico': 'estecorreo@gmail.com',
                    'longitud': '-73.11609329999999',
                    'latitud': '7.1344315',
                    'comoLlegar': 'caminando',
                    'celular': '3008442354',
                    'telefono': '6352354',
                },
                {
                    'idUbicacion': '2',
                    'ciudad': {'idCiudad': 102, 'nombreCiudad': 'Bucaramanga'},
                    'departamento': {'idDepartamento': 4, 'nombreDepartamento': 'Santander'},
                    'pais': {'idPais': 1, 'nombrePais': 'Colombia'},
                    'direccion': '2',
                    'tipoDireccion': {'idTipoDireccion': 2, 'tipoDireccion': 'Comercial'},
                    'barrio': '2',
                    'correoElectronico': '2',
                    'longitud': '2',
                    'latitud': '2',
                    'comoLlegar': '2',
                    'celular': '2',
                    'telefono': '2',
                },
                {
                    'idUbicacion': '3',
                    'ciudad': {'idCiudad': 103, 'nombreCiudad': 'Bucaramanga'},
                    'departamento': {'idDepartamento': 4, 'nombreDepartamento': 'Santander'},
                    'pais': {'idPais': 1, 'nombrePais': 'Colombia'},
                    'direccion': '3',
                    'tipoDireccion': {'idTipoDireccion': 3, 'tipoDireccion': 'Comercial'},
                    'barrio': '3',
                    'correoElectronico': '3',
                    'longitud': '3',
                    'latitud': '3',
                    'comoLlegar': '3',
                    'celular': '3',
                    'telefono': '3',
                }
            ];

        let principalNomenclatureList = [
            {label: 'Seleccione', value: null},
            {label: 'Carrera', value: 'Carrera'},
            {label: 'Calle', value: 'Calle'},
            {label: 'Diagonal', value: 'Diagonal'},
            {label: 'Avenida', value: 'Avenida'}
        ];

        let complementaryNomenclatureList = [
            {label: 'Seleccione', value: null},
            {label: 'Casa', value: 'Casa'},
            {label: 'Torre', value: 'Torre'},
            {label: 'Apartamento', value: 'Apartamento'},
            {label: 'Manzana', value: 'Manzana'}
        ];

        let addressTypeList = [
            {label: 'Seleccione', value: '0'},
            {label: 'Residencial', value: '1'},
            {label: 'Comercial', value: '2'}
        ];


        let cities: any[] = [{'idCiudad': 101, 'nombreCiudad': 'Floridablanca - Santander - Colombia'},
                            {'idCiudad': 102, 'nombreCiudad': 'Floridablanca - Vichada - Colombia'},
                            {'idCiudad': 103, 'nombreCiudad': 'Floridablanca - Cesar - Colombia'},
                            {'idCiudad': 104, 'nombreCiudad': 'Bucaramanga - Santander - Colombia'},
                            {'idCiudad': 105, 'nombreCiudad': 'Bogota - Cundinamarca - Colombia'},
                            {'idCiudad': 106, 'nombreCiudad': 'Cartagena - Bolivar - Colombia'},];

        let documentTypes: any[] = [
                                        {'value' : null, 'label' : "Seleccione"},
                                        {'value' : "1", 'label' : "Cédula de Ciudadania"},
                                        {'value' : "2", 'label' : "Cédula de Extrangeria"},
                                        {'value' : "3", 'label' : "Tarjeta de identidad"},
                                    ];

        let relationship: any[] = [
                                        {'value' : null, 'label' : "Seleccione"},
                                        {'value' : "1", 'label' : "Padre"},
                                        {'value' : "2", 'label' : "Madre"},
                                        {'value' : "3", 'label' : "Hermano"},
                                        {'value' : "4", 'label' : "Primo"},
                                        {'value' : "5", 'label' : "Amigo"},
                                        {'value' : "6", 'label' : "abuelo"},
                                    ];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                /*================ Colaboradores ================*/
                // obtiene todos los Colaboradores
                if (connection.request.url.endsWith('/api/employees') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:employees}
                    })));

                }
//Colaboradores
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
                    matched = matched.length ? matched : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: matched} })));


                    return;

                }

                //Listado de nomenclaturas principales
                if (connection.request.url.endsWith('/api/principal-nomenclature') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:principalNomenclatureList}
                    })));

                }

                //Listado de tipos de nomenclaturas complementarias
                if (connection.request.url.endsWith('/api/complementary-nomenclature') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:complementaryNomenclatureList}
                    })));

                }

                //Listado de tipos de direcciones
                if (connection.request.url.endsWith('/api/address-types') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:addressTypeList}
                    })));

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

                    let matchedTypes = documentTypes.filter(types => { return types.value == newFamily.tipoDeDocumento; });
                    let matchedRelationship = relationship.filter(rel => { return rel.value == newFamily.parentesco; });

                    newFamily.tipoDeDocumento = matchedTypes.length ? matchedTypes[0] : null;
                    newFamily.parentesco = matchedRelationship.length ? matchedRelationship[0] : null;
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

                    let matchedTypes = documentTypes.filter(types => { return types.value == newFamily.tipoDeDocumento; });
                    let matchedRelationship = relationship.filter(rel => { return rel.value == newFamily.parentesco; });

                    newFamily.tipoDeDocumento = matchedTypes.length ? matchedTypes[0] : null;
                    newFamily.parentesco = matchedRelationship.length ? matchedRelationship[0] : null;


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
//Referencias

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

//Estudios formales

                // obtiene todos
                if (connection.request.url.endsWith('/api/formalstudies') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:fstudies}
                    })));

                }

                // obtiene una  por el id
                if (connection.request.url.match(/\/api\/formalstudies\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = fstudies.filter(fstudy => { return fstudy.idEstudio == id; });
                    let study = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: study} })));

                    return;

                }

                // crea una  en el localstorage
                if (connection.request.url.endsWith('/api/formalstudies') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let news = JSON.parse(connection.request.getBody());

                    // save new user
                    news.idEstudio = fstudies.length + 1;
                    news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    fstudies.push(news);
                    localStorage.setItem('references', JSON.stringify(fstudies));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar una
                if (connection.request.url.match(/\/api\/formalstudies\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let news = JSON.parse(connection.request.getBody());
                    news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < fstudies.length; i++) {
                        let col = fstudies[i];
                        if (col.idEstudio == id) {
                            // delete user
                            fstudies[i] = news;
                            localStorage.setItem('references', JSON.stringify(fstudies));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina una  del localstorage
                if (connection.request.url.match(/\/api\/formalstudies\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < fstudies.length; i++) {
                        let col = fstudies[i];
                        if (col.idEstudio == id) {
                            // delete user
                            fstudies.splice(i, 1);
                            localStorage.setItem('references', JSON.stringify(fstudies));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

//Estudios no formales

                // obtiene todos
                if (connection.request.url.endsWith('/api/noformalstudies') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:nfstudies}
                    })));

                }

                // obtiene una  por el id
                if (connection.request.url.match(/\/api\/noformalstudies\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = nfstudies.filter(fstudy => { return fstudy.idEstudio == id; });
                    let study = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: study} })));

                    return;

                }

                // crea una  en el localstorage
                if (connection.request.url.endsWith('/api/noformalstudies') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let news = JSON.parse(connection.request.getBody());

                    // save new user
                    news.idEstudio = nfstudies.length + 1;
                    news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    nfstudies.push(news);
                    localStorage.setItem('references', JSON.stringify(nfstudies));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar una
                if (connection.request.url.match(/\/api\/noformalstudies\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let news = JSON.parse(connection.request.getBody());
                    news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < nfstudies.length; i++) {
                        let col = nfstudies[i];
                        if (col.idEstudio == id) {
                            // delete user
                            nfstudies[i] = news;
                            localStorage.setItem('references', JSON.stringify(nfstudies));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina una  del localstorage
                if (connection.request.url.match(/\/api\/noformalstudies\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < nfstudies.length; i++) {
                        let col = nfstudies[i];
                        if (col.idEstudio == id) {
                            // delete user
                            nfstudies.splice(i, 1);
                            localStorage.setItem('references', JSON.stringify(nfstudies));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

 //Experiencia laboral

                // obtiene todos
                if (connection.request.url.endsWith('/api/workexperience') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:experiences}
                    })));

                }

                // obtiene una  por el id
                if (connection.request.url.match(/\/api\/workexperience\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matched = experiences.filter(experience => { return experience.idExperiencia == id; });
                    let experience = matched.length ? matched[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body:{data: experience} })));

                    return;

                }

                // crea una  en el localstorage
                if (connection.request.url.endsWith('/api/workexperience') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let news = JSON.parse(connection.request.getBody());

                    // save new user
                    news.idEstudio = nfstudies.length + 1;
                    //news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    experiences.push(news);
                    localStorage.setItem('experiences', JSON.stringify(experiences));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // actualizar una
                if (connection.request.url.match(/\/api\/workexperience\/\d+$/) && connection.request.method === RequestMethod.Put) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find user by id in users array
                    let news = JSON.parse(connection.request.getBody());
                    //news.nombreCompleto = news.primerNombre+' '+news.segundoNombre+' '+news.primerApellido+' '+news.segundoApellido;
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < experiences.length; i++) {
                        let col = experiences[i];
                        if (col.idExperiencia == id) {
                            // delete user
                            experiences[i] = news;
                            localStorage.setItem('experiences', JSON.stringify(experiences));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));


                    return;
                }

                // elimina una  del localstorage
                if (connection.request.url.match(/\/api\/workexperience\/\d+$/) && connection.request.method === RequestMethod.Delete) {

                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    for (let i = 0; i < experiences.length; i++) {
                        let col = experiences[i];
                        if (col.idEstudio == id) {
                            // delete user
                            experiences.splice(i, 1);
                            localStorage.setItem('experiences', JSON.stringify(experiences));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

//Tipos documentos

                // obtiene todos
                if (connection.request.url.endsWith('/api/document-types') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:documentTypes}
                    })));

                }

 //Parenetesco

                // obtiene todos
                if (connection.request.url.endsWith('/api/relationship') && connection.request.method === RequestMethod.Get) {

                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body:{data:relationship
                        }
                    })));

                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};