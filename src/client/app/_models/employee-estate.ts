import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEstate {
  idTerceroInmueble:Number;
  idTercero:Number;
  idTipoVivienda:Number;
  idClaseVivienda:Number;
  idTipoConstruccionVivienda:Number;
  anioConstruccion:Number;
  numeroPisos:Number;
  numeroSotanos:Number;
  idEstrato:Number;
  indicadorHabilitado:boolean;
  auditoriaUsuario :Number;
  auditoriaFecha:Date;
  tipoVivienda: String;
  claseVivienda: String;
  tipoConstruccionVivienda: String;
  estrato: Number;
  idTerceroLocalizacion: Number;

  constructor() {
    this.indicadorHabilitado = true;
    this.auditoriaFecha = null;
    this.auditoriaUsuario = null;
    this.idTerceroInmueble = null;
  }

}
