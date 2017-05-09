import { Injectable } from '@angular/core';

@Injectable()
export class Exam {
   idCargoExamen: number;
   idCargo: number;
   cargo: string;
   idExamen: number;
   examen: string;
   indicadorIngreso: boolean;
   indicadorPeriodicidad: boolean;
   indicadorRetiro: boolean;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.idCargoExamen = null;
   }

}
