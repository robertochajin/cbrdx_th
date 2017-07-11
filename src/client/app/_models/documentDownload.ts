import { Injectable } from '@angular/core';

@Injectable()
export class DocumentoTercero {
   public idDocumentoTercero: number;
   public idClasificacionDocumento: number;
   public nombre: string;
   public codigoInstitucional: string;
   public descripcion: string;
   public indicadorAdjunto: boolean;
   public indicadorDescarga: boolean;
   public idAdjunto: number;
   public indicadorContratacion: boolean;
   public vigencia: number;
   public indicadorAplica: boolean;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = false;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}
