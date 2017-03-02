import { EmployeesLocation } from './employees-location';

export class ConstructorEmployeesLocation implements EmployeesLocation {
    idUbicacion:String;
    direccion:String;
    ciudad:{value:number, label:String};
    departamento:{value:number, label:String};
    pais:{value:number, nombrePais:String};
    tipoDireccion:{value: number, label: String};
    barrio:String;
    correoElectronico:String;
    longitud :String;
    latitud:String;
    comoLlegar:String;
    celular:String;
    telefono:String;
    colaborador:number;

    constructor() {
      this.ciudad = {value: null, label: ''};
      this.tipoDireccion = {value: null, label: ''};
    }

}
