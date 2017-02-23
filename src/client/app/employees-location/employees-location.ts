export interface EmployeesLocation {
    idUbicacion:String;
    direccion:String;
    ciudad:{idCiudad:number, nombreCiudad:String};
    departamento:{idDepartamento:number, nombreDepartamento:String};
    pais:{idPais:number, nombrePais:String};
    tipoDireccion:{idTipoDireccion: number, tipoDireccion: String};
    barrio?:String;
    correoElectronico?:String;
    longitud?:String;
    latitud?:String;
    comoLlegar?:String;
    celular?:String;
    telefono?:String;
    colaborador:number;
}

