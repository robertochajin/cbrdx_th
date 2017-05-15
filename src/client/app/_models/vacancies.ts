import { Injectable } from '@angular/core';

@Injectable()
export class Vacancies {

   idVacante: number;
   vacante: string;
   fechaCreacion: number;
   idArea: number;
   area: string;
   idOficina: number;
   oficina: string;
   idMotivo: number;
   motivo: string;
   idAutorizacion: number;
   autorizacion: string;
   idEstado: number;
   estado: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}
