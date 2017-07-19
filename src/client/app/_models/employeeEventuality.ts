import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEventuality {
   idNovedadTercero: number;
   idTercero: number;
   idNovedad: number;
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
   numeroCuotas: number;
   numeroReferencia: number;
   idEntidad: number;
   descripcion: string;
   periodoInicio: Date;
   periodoFinal: Date;
   retiro: boolean;
   idEPS: number;
   idFP: number;
   idCCF: number;
   idAdjunto: number;
   codigoValidacion: string;
   indicadorHabilitado: boolean;
   auditoriaUsuario: Number;
   auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
