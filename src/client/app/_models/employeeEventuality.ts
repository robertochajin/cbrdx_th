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
   fechaInicio: Date;
   horaInicio: Date;
   fechaFinal: Date;
   horaFinal: Date;
   fechaReintegro: Date;
   horaReintergo: Date;
   dias: number;
   idDiagnostico: number;
   reemplazadoPor: string;
   valor: number;
   nroCuotas:number;
   nroReferencia: number;
   idEntidad: number;
   entidad: string;
   descripcion: string;
   periodoInicio: Date;
   periodoFinal: Date;
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
