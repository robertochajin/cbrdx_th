import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityPlans {
   idPlanAccionNovedadAccidente: number;
   idTerceroNovedad: number;
   idEstadoPlanAccion: number;
   estadoPlanAccion: string;
   idResponsable: number;
   nombreResponsable: string;
   idEncargado: number;
   nombreEncargado: string;
   codigoEstadoPlanAccion: string;
   respuesta: string;
   observacion: string;
   actividad: string;
   fechaLimite: Date;
   fechaVerificacion: Date;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;
   indicadorVerficar: boolean;

   constructor() {
      this.indicadorVerficar = false;
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.fechaLimite = new Date();
      this.fechaVerificacion = new Date();
   }
}
