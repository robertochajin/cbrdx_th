import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesPublications {

   idTercerosPublicaciones: number;
   idTercero: number;
   idPublicacion: number;
   idCuestionarioActual: number;
   paso: number;
   codigo: number;
   indicadorTerminos: boolean = false;
   indicadorCentrales: boolean = false;
   indicadorFinalizado: boolean = false;
   indicadorFinalizadoCuestionarios: boolean = false;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
   }

}


