import { Injectable } from '@angular/core';

@Injectable()
export class Productivity {

   idCargoProductividad: number;
   idCargo: number;
   idProductividad: number;
   idProductividadIq: number;
   idProductividadAptitud: number;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.idCargoProductividad = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}
