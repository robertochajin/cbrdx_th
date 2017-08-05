import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityPlansAttachments {
   idPlanAccionNovedadAccidenteAdjunto: number;
   idPlanAccionNovedadAccidente: number;
   idAdjunto: number;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;
   codigoAdjunto: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
