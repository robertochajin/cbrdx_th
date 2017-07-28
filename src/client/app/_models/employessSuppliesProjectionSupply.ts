import { Injectable } from '@angular/core';

@Injectable()
export class EmployessSuppliesProjectionSupply {

   public idProyeccionDotacionTerceroDotacion: number;
   public idProyeccionDotacionTercero: number;
   public dotacion: string;
   public talla: string;
   public idDotacion: number;
   public idTalla: number;
   public cantidadAsignada: number;
   public cantidadEntregada: number;
   public indicadorHabilitado: boolean = true;
   public indicadorEntregado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
