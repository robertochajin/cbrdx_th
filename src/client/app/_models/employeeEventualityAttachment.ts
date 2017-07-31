import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityAttachment {
   idTerceroNovedadAdjunto: number;
   idTerceroNovedad: number;
   idAdjunto: number;
   nombre: string;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
