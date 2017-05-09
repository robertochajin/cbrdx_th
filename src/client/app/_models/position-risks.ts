import { Injectable } from '@angular/core';

@Injectable()
export class Risk {

   idCargoRiesgo: number;
   idCargo: number;
   idRiesgo: number;
   tipo: string;
   subtipo: string;
   riesgo: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.idCargoRiesgo = null;
   }

}
