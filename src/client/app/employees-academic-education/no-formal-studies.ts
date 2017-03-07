import { Injectable } from '@angular/core';

@Injectable()
export class Noformalstudies {
  public idEstudio?: string;
  public areaEstudio?: {value: number, label: string};
  public titulo?: string;
  public institucion?: string;
  public ciudad: {value: number, label: string};
  public estadoEstudio?: {value: number, label: string};
  public ingreso?: string;
  public finalizacion?: string;
  public tipoEstudio?:  {value: number, label: string};
  public otroTipoEstudio?: string;
  public intensidad?: {value: number, label: string};
  public descripcion?: string;
  public confirmada?: boolean;

  constructor() {
    this.areaEstudio = {value: null, label: ''};
    this.ciudad = {value: null, label: ''};
    this.estadoEstudio = {value: null, label: ''};
    this.tipoEstudio = {value: null, label: ''};
    this.intensidad = {value: null, label: ''};
  }
}
