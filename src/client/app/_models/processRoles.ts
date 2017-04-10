import {Injectable} from '@angular/core';

@Injectable()
export class ProcessRoles {

  public idListaRolProceso: number;
  public codigo: string;
  public nombre: string;
  public orden: number;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;

  //Atributo auxiliar
  public asignadoAlCargo: boolean;

  constructor() {
    this.indicadorHabilitado = true;
    this.auditoriaUsuario = 1;
    this.auditoriaFecha = "";
  }

}
