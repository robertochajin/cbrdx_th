import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesQuestions {

   public idPregunta: number = null;
   public idCuestionario: number = null;
   public codigoPregunta: string;
   public pregunta: string;
   public idTipoPregunta: number;
   public tipoPregunta: string;
   public indicadorDepende: boolean;
   public dependePregunta: number;
   public dependeRespuesta: number;
   public secuencia: number;
   public indicadorHabilitado: boolean = true;
   public indicadorObligatorio: boolean;
   public indicadorFiltrante: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
