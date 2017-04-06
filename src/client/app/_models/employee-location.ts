import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesLocation {
  idTerceroLocalizacion:number;
  idTercero:Number;
  idlocalizacion:Number;
  indicadorHabilitado:boolean;
  auditoriaUsuario :Number;
  auditoriaFecha:Date;

  constructor() {
  }

}
