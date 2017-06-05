import { Injectable } from '@angular/core';

@Injectable()
export class SelectionProcess {

   public idProceso : number;
   public idEstado : number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = '';
   }
}
