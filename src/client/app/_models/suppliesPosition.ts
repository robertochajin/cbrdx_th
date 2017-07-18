import { Injectable } from '@angular/core';

@Injectable()
export class SuppliesPosition {

   public idCargoDotacion: number = null;
   public idGrupoDotacion: number = null;
   public idCargo: number = null;
   public cargo: string;
   public grupoDotacion: string;
   public indicadorHabilitado: boolean = true
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
