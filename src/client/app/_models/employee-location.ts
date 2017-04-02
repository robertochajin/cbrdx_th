import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesLocation {
  idTerceroLocalizacion:Number;
  idTercero:Number;
  idlocalizacion:Number;
  indicadorHabilitado:boolean;
  auditoriaUsuario :Number;
  auditoriaFecha:Date;

  constructor() {
  }

}
