import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityPlans {
   idPlanAccionNovedadAccidente: number;
   idTerceroNovedad: number;
   idEstadoPlanAccion: number;
   idResponsable: number;
   idEncargado: number;
   actividad: string;
   fechaLimite: Date;
   fechaVerificacion: Date;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
