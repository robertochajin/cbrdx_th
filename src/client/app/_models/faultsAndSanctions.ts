import { Injectable } from '@angular/core';

@Injectable()
export class FaultsAndSanctions {

  public idFalta : number;
  public idEstadoFalta : number;
  public estadoFalta : string;
  public falta  : string;
  public idTipoFalta  : number;
  public tipoFalta  : string;
  public accion : string;
  public indicadorHabilitado : boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;

  constructor() {
    this.indicadorHabilitado = true;
  }
}

