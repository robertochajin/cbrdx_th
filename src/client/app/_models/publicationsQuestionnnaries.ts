/**
 * Created by Andres on 30/05/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class PublicationsQuestionnaries {

   idPublicacionCuestionarios: number;
   idCuestionario: number;
   orden: number;
   indicadorHabilitado: boolean= true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.idPublicacionCuestionarios = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}




