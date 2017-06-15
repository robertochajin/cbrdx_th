import { Injectable } from '@angular/core';

class stepProgress {
   public idProcesoSeleccion: number;
   public idProcesoPaso: number;
   public idResponsable: number;
   public codigoEstadoDiligenciado: string;
   public interfaz: string;
   public interfazInterna: string;
}

@Injectable()
export class CandidateProgress {

   public idTerceroPublicacion: number;
   public idTercero: number;
   public nombreCompleto: string;
   public pasos: stepProgress[];

   constructor() {
   }
}
