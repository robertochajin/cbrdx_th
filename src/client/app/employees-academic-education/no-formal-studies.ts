import { Injectable } from '@angular/core';

@Injectable()
export class Noformalstudies {
  public idEstudio?: string;
  public nivelEstudio?: {value: number, label: string};
  public areaEstudio?: {value: number, label: string};
  public titulo?: string;
  public institucion?: string;
  public ciudad: {value: number, label: String};
  public estadoEstudio?: {value: number, label: String};
  public ingreso?: string;
  public finalizacion?: string;
  public tipoEstudio?:  {value: number, label: String};
  public otroTipoEstudio?: string;
  public intensidad?: {value: number, label: String};
  public descripcion?: string;
  public confirmada?: string;

  constructor() {
    this.nivelEstudio = {value: null, label: ''};
    this.areaEstudio = {value: null, label: ''};
    this.ciudad = {value: null, label: ''};
    this.estadoEstudio = {value: null, label: ''};
    this.tipoEstudio = {value: null, label: ''};
    this.intensidad = {value: null, label: ''};
  }
}
