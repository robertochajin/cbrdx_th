export interface EmployeesLocation {
    idUbicacion:String;
    direccion:String;
    ciudad:{value:number, label:String};
    departamento?:{value:number, label:String};
    pais?:{value:number, label:String};
    tipoDireccion:{value: number, label: String};
    barrio?:String;
    correoElectronico?:String;
    longitud?:String;
    latitud?:String;
    comoLlegar?:String;
    celular?:String;
    telefono?:String;
    colaborador:number;
}

