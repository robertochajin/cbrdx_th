import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventualityActivity {
   idTerceroNovedadActividad: number;
   idTerceroNovedad: number;
   fechaCreacion: Date;
   actividadRealizada: string;
   estadoNovedad: string;
   idEstadoNovedad: number;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   indicadorHabilitado: boolean;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
