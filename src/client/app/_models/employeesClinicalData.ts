import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesClinicalData {
   idTerceroDatoClinico: number;
   idTercero: number;
   idDiagnostico: number;
   fechaInicio: Date;
   fechaFin: Date;
   indicadorHabilitado: boolean;
   auditoriaUsuario: number;
   auditoriaFecha: string;
   idDiagnosticoCie: number;
   codigo: string;
   descripcion: string;
   diagnostico: { idDiagnosticoCie: number, codigo: string, descripcion: string, label: string };

   constructor() {
      this.indicadorHabilitado = true;
      this.fechaInicio = null;
      this.fechaFin = null;
      this.idDiagnostico = null;
   }
}
