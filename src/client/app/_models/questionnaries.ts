import { Injectable } from '@angular/core';

@Injectable()
export class Questionnaries {

   public idCuestionario: number;
   public cuestionario: string;
   public descripcion: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
   public codigo: string;

   constructor() {

   }
}
