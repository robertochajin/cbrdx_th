import { Injectable } from '@angular/core';

@Injectable()
export class EmployessSuppliesProjectionSupply {

   public idProyeccionDotacionTerceroDotacion: number;
   public idProyeccionDotacionTercero: number;
   public idDotacion: number;
   public dotacion: number;
   public idTalla: number;
   public talla: number;
   public cantidadAsignada: number;
   public cantidadEntregada: number;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
