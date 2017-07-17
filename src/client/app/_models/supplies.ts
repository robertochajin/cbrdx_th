import { Injectable } from '@angular/core';

@Injectable()
export class Supplies {

   public idCuestionario: number = null;
   public codigoCuestionario: string;
   public cuestionario: string;
   public descripcion: string;
   public indicadorHabilitado: boolean = false
   public indicadorPonderacion: boolean;
   public auditoriaUsuario: number;
   public valor: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
