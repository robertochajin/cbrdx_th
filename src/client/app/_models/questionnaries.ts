import { Injectable } from '@angular/core';

@Injectable()
export class Questionnaries {

   public idCuestionario: number;
   public cuestionario: string;
   public descripcion: string;
   public indicadorHabilitado: boolean;
   public indicadorPonderacion: boolean;
   public auditoriaUsuario: number;
   public valor: number;
   public auditoriaFecha: Date;
   public codigo: string;

   constructor() {

   }
}
