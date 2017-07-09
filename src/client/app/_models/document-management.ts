import { Injectable } from '@angular/core';

@Injectable()
export class DocumentManagement {
   idDocumentoTercero: number;
   idClasificacionDocumento: number;
   nombre: string;
   codigoInstitucional: number;
   descripcion: string;
   indicadorAdjunto: boolean;
   indicadorDescarga: boolean;
   indicadorAplica: boolean;
   indicadorContratacion: number;
   vigencia: number;
   indicadorHabilitado: boolean;
   auditoriaFecha: Date;
   auditoriaUsuario: number;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }

}
