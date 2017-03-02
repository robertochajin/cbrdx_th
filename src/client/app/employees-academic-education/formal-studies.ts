import { Injectable } from '@angular/core';

@Injectable()
export class FormalStudies {
  public idEstudio?: string;
  public nivelEstudio?: {value:number, label:string};
  public areaEstudio?: {value:number, label:string};
  public titulo?: string;
  public institucion?: {value:number, label:string};
  public otraInstitucion?: string;
  public ciudad:{value:number, label:String};
  public estadoEstudio?:{value:number, label:String};
  public ingreso?: string;
  public finalizacion?: string;
  public confirmada?: string;
  public soporte?: string;

  constructor() {
    this.nivelEstudio = {value: null, label: ''};
    this.areaEstudio = {value: null, label: ''};
    this.institucion = {value: null, label: ''};
    this.ciudad = {value: null, label: ''};
    this.estadoEstudio = {value: null, label: ''};
  }
}
