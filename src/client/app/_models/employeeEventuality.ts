import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventuality {
   idTerceroNovedad: number;
   idTercero: number;
   idNovedad: number;
   novedad: string;
   idEstado: number;
   estado: string;
   tipoNovedad: string;
   fechaInicio: string;
   horaInicio: string;
   fechaFin: string;
   horaFin: string;
   fechaReintegro: string;
   horaReintergo: string;
   dias: number;
   idDiagnostico: number;
   diagnostico: string;
   reemplazadoPor: string;
   valor: number;
   nroCuotas:number;
   nroReferencia: number;
   idEntidad: number;
   entidad: string;
   descripcion: string;
   periodoInicio: string;
   periodoFinal: string;
   retiro: boolean;
   idEps: number;
   eps: string;
   idFp: number;
   fp: string;
   idCcf: number;
   ccf: string;
   indicadorHabilitado: boolean;
   codigoValidacion: string;
   auditoriaUsuario: Number;
   auditoriaFecha: Date;
   fechaReporte: Date;
   nombreTerceroReporta: string;
   idTerceroReporta: number;
   idEstadoNovedad: number;
   estadoNovedad: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
