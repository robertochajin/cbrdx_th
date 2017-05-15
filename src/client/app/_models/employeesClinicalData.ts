import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesClinicalData {
   idTerceroDatoClinico: number;
   idTercero: number;
   idDiagnostico: number;
   fechaInicio: string;
   fechaFin: string;
   indicadorHabilitado: boolean;
   auditoriaUsuario: number;
   auditoriaFecha: string;
   idDiagnosticoCie: number;
   codigo: string;
   descripcion: string;
   diagnostico: { idDiagnosticoCie: number, codigo: string, descripcion: string, label: string };

   constructor() {
      this.indicadorHabilitado = true;
      this.fechaInicio = '';
      this.fechaFin = '';
      this.idDiagnostico = null;
   }
}
