import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventuality {
   idNovedadTercero: number;
   idTercero: number;
   idTipoNovedad: number;
   idNovedad: number;
   idDiagnostico: number;
   fechaInicio: Date;
   fechaFinal: Date;
   descripcion: string;
   reemplazadoPor: number;
   idAdjunto: number;
   indicadorHabilitado: boolean;
   auditoriaUsuario: Number;
   auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
