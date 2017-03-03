import {Injectable} from '@angular/core';

@Injectable()
export class Workexperience {
  public idExperiencia?: number;
  public idColaborador?: number;
  public empresa?: string;
  public cargo?: string;
  public ingreso?: string;
  public finalizacion?: string;
  public ciudad?: {value: number, label: string};
  public telefonoEmpresa?: string;
  public sectorEmpresa?: {value: number, label: string};
  public subsectorEmpresa?: {value: number, label: string};
  public nivelCargo?: string;
  public areaCargo?: string;
  public jefeInmediato?: string;
  public tiempoExperiencia?: string;
  public actualmente?: string;

  constructor() {
    this.ciudad = {value: null, label: ''};
    this.sectorEmpresa = {value: null, label: ''};
    this.subsectorEmpresa = {value: null, label: ''};
  }

}
