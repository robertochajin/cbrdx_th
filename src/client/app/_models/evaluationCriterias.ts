import { Injectable } from '@angular/core';

@Injectable()
export class EvaluationCriterias {
  public idCriterio: number;
  public criterio: number;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;
  public label: string;
  public value: number;
}
