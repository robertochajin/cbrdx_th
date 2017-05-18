import { Injectable } from '@angular/core';

@Injectable()
export class RequirementsAction {

   idRequerimientoAccion: number;
   idAccion: number;
   autorizacion: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}
