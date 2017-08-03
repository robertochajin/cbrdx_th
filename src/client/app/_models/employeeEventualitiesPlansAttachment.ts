import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityPlansAttachments {
   idPlanAccionNovedadAccidenteAdjunto: number;
   idPlanAccionNovedadAccidente: number;
   idAdjunto: number;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;
   indicadorRespuesta: boolean;

   constructor() {
      this.indicadorHabilitado = true;
      this.indicadorRespuesta = false;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
