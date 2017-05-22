import { Injectable } from '@angular/core';

@Injectable()
export class Questionnaires {

   public idRequerimientoCuestionario: number;
   public idCuestionario: number;
   public idRequerimiento: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public cuestionario: string;
   public indicadorHabilitado: boolean = true;

   constructor() {
      this.idRequerimientoCuestionario= null;
   }
}
