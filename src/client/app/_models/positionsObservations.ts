import { Injectable } from '@angular/core';

@Injectable()
export class PositionsObservations {

  public idObservacion : number;
  public Observacion  : string;
  public idCargo  : number;
  public indicadorHabilitado : boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;

  constructor() {
    this.indicadorHabilitado = true;
  }
}

