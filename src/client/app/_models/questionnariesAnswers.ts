import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesAnswers {

   public idPregunta: number = null;
   public idRespuesta: number = null;
   public respuesta: string;
   public orden: number;
   public indicadorCorrecte: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
