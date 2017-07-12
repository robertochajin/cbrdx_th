import { Injectable } from '@angular/core';

@Injectable()
export class PostulationHistory {
   idTercero: number;
   cargo: string;
   fechaInicio: Date;
   estado: string;
   responsableSeleccion: string;
   codigo: string;

   constructor() {

   }
}
