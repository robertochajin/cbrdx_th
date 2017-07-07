import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesQuestions {

   public idPregunta: number = null;
   public idCuestionario: number = null;
   public codigo: string;
   public pregunta: string;
   public idTipo: number;
   public tipo: string;
   public indicadorDepende: boolean;
   public dependePregunta: number;
   public dependeRespuesta: number;
   public secuencia: number;
   public indicadorHabilitado: boolean;
   public indicadorObligatorio: boolean;
   public indicadorFiltrante: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
