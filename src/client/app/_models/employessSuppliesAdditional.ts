import { Injectable } from '@angular/core';

@Injectable()
export class EmployessSuppliesAdditional {

   public idTerceroDotacionAdicional: number;
   public idTercero: number;
   public idDotacion: number;
   public idProyeccionDotacion: number;
   public cantidadDotacion: number = 0;
   public idTalla: number;
   public indicadorHabilitado: boolean = true
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}