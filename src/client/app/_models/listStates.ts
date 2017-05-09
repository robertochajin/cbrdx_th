import { Injectable } from '@angular/core';

@Injectable()
export class ListStates {

   public idListaEstadoCargo: number;
   public codigo: string;
   public nombre: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {
      this.indicadorHabilitado = true;
   }
}
