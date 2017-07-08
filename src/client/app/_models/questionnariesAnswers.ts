import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesAnswers {

   public idRespuesta: number = null;
   public idPregunta: number = null;
   public codigoRespuesta: string = null;
   public respuesta: string;
   public orden: number;
   public indicadorCorrecto: boolean;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
