import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityPlans {
   idPlanAccionNovedadAccidente: number;
   idTerceroNovedad: number;
   idEstadoPlanAccion: number;
   estadoPlanAccion: string;
   idResponsable: number;
   responsable: string;
   idEncargado: number;
   actividad: string;
   fechaLimite: Date;
   fechaVerificacion: Date;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;
   indicadorVerificado: boolean;

   constructor() {
      this.indicadorVerificado = false;
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.fechaLimite = new Date();
      this.fechaVerificacion = new Date();
   }
}
