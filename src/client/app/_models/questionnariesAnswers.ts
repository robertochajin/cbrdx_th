import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesAnswers {

   public idPreguntaOpcion: number = null;
   public idCuestionarioPregunta: number = null;
   public codigoOpcion: string = null;
   public opcion: string;
   public pregunta: string;
   public orden: number;
   public indicadorCorrecto: boolean;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
