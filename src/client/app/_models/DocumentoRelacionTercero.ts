import { Injectable } from '@angular/core';

@Injectable()
export class DocumentoRelacionTercero {
   public idTerceroDocumentoTercero: number;
   public idTercero: number;
   public nombreDocumentoTercero: string;
   public descripcion: string;
   public idDocumentoTercero: number;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = false;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }
}
