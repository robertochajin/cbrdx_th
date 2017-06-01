/**
 * Created by Andres on 30/05/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class PublicationsQuestionnaries {

   idPublicacionCustionario: number;
   idPublicacion: number;
   idCuestionario: number;
   cuestionario: string;
   descripcion: string;
   orden: number;
   indicadorHabilitado: boolean= true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.idPublicacion = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}




