import { Injectable } from '@angular/core';

@Injectable()
export class PositionCriterias {
  public idCargosCriterios : number;
  public idCriterio : number;
  public idCargo : number;
  public criterio : string;
  public descripcion : string;
  public meta : number;
  public indicadorHabilitado : boolean;
  public auditoriaUsuario : number;
  public auditoriaFecha : string;
  public factor : number;
}
