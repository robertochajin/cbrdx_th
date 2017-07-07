import { Injectable } from '@angular/core';

@Injectable()
export class Questionnaries {

   public idCuestionario: number = null;
   public codigo: string;
   public cuestionario: string;
   public descripcion: string;
   public indicadorHabilitado: boolean;
   public indicadorPonderacion: boolean;
   public auditoriaUsuario: number;
   public valor: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
