import { Injectable } from '@angular/core';

@Injectable()
export class ContactInformation {
   idInformacionContcto: number;
   codigo: string;
   nombre: string;
   indicadorObligatorio: boolean;
   indicadorConfirmacion: boolean;
   indicadorHabilitado: boolean;
   auditoriaUsuario: Number;
   auditoriaFecha: Date;

   constructor() {
      this.indicadorObligatorio = false;
      this.indicadorConfirmacion = false;
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;

   }

}
