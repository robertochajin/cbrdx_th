import { Injectable } from '@angular/core';
import { Competencies } from './competencies';

@Injectable()
export class GroupCompetencies {
   public idGrupoCompetencia: number;
   public grupoCompetencia: string;
   public descripcion: string;
   public ponderacion: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   //Auziliar
   public competencies: Competencies[] = [];

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = '';
   }
}
