/**
 * Created by TracesMaker on 06/02/2017.
 */
export interface Employee {
    idColaborador?;
    tipoDocumento?;
    numeroDocumento?;
    nombreCompleto?; //Campo calculado en backend
    primerNombre?;
    segundoNombre?;
    primerApellido?;
    segundoApellido?;
    fechaDesde?; //Campo calculado en backend?
    cargoActual?; //Campo calculado en backend?

    Avatar?;
    ciudadExpedicion?;
    fechaExp?;
    fechaNacimiento?;
    idtercero?;
    ciudadNacimiento?;
    nacionalidad?;
    genero?;
    estadoCivil?;
    factorrh?;
    numeroDeHijos?;
    lateralidad?;
    nivelEducativo?;
    profesion?;
    estratoSocioEconomico?;
    vivienda?;
    vehiculo?;
    tallaCamisa?;
    tallaPantalon?;
    tallaCalzado?;
}