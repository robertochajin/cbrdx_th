import { Injectable } from '@angular/core';

@Injectable()
export class SuppliesGroups {

   public idGrupoDotacion: number = null;
   public codigo: string;
   public grupoDotacion: string;
   public descripcion: string;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
