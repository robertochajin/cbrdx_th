import { Injectable } from '@angular/core';

@Injectable()
export class ReferencesCall {
   public idTerceroReferenciaLlamada: number;
   public tipoReferencia: string;
   public terceroReferencia: string;
   public telefonoFijo: string;
   public telefonoMovil: string;
   public resultadoLlamada: string;
   public nombreArchivo: string;
   public descripcionDivisonPolitica: string;
   public idTerceroReferencia: number;
   public idResultadoLlamada: number;
   public idAdjunto: number;
   public idMaestroRespuesta: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {

   }
}

