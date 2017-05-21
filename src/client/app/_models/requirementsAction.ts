import { Injectable } from '@angular/core';

@Injectable()
export class RequirementsAction {

   idRequerimientoAccion: number;
   idRequerimiento: number;
   idRequerimientoHistorico: number;
   idAccion: number;
   accion: string;
   observacion: string;
   autorizacion: string;
   nombreTercero: string;
   cargo: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}
