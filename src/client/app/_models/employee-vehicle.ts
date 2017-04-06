import {Injectable} from '@angular/core';

@Injectable()
export class EmployeeVehicle {
  idTerceroVehiculo: Number;
  idTercero: Number;
  idTipoVehiculo: Number;
  idTipoServicio: Number;
  idMarca: Number;
  modelo: Number;
  placa: String;
  idCiudad: Number;
  indicadorHabilitado: boolean;
  auditoriaUsuario: Number;
  auditoriaFecha: Date;
  tipoVehiculo: String;
  tipoServicio: String;
  marca: String;
  ciudad: String;


  constructor() {
    this.indicadorHabilitado = true;
    this.auditoriaFecha = null;
    this.auditoriaUsuario = null;
    this.idTerceroVehiculo = null;
  }
}
