import { Injectable } from '@angular/core';

@Injectable()
export class TicsResourses {

   public idRequerimientoTic: number;
   public idTic: number;
   public idRequerimiento: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public tic: string;
   public indicadorHabilitado: boolean = true;

   constructor() {
      this.idRequerimientoTic= null;
   }
}
