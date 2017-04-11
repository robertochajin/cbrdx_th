import {Injectable} from '@angular/core';
import {Ponderancies} from "./ponderancies";

@Injectable()
export class Competencies {
   public idCompetencia : number;
   public idGrupoCompetencia : number;
   public competencia : string;
   public descripcion : string;
   public indicadorHabilitado : boolean;
   public auditoriaUsuario : number;
   public auditoriaFecha : string;

   //Campo auxiliar
   public ponderaciones : Ponderancies[];

  constructor() {
    this.indicadorHabilitado = true;
    this.auditoriaUsuario = 1;
    this.auditoriaFecha = "";
  }
}
