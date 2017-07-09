import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnariesQuestions {

   public idCuestionarioPregunta: number = null;
   public idCuestionario: number = null;
   public codigoPregunta: string;
   public pregunta: string;
   public idTipoPregunta: number;
   public tipoPregunta: string;
   public indicadorDepende: boolean = false;
   public idDependePregunta: number = null;
   public dependePregunta: string;
   public idDependeRespuesta: number = null;
   public dependeRespuesta: string;
   public secuencia: number = 0;
   public indicadorHabilitado: boolean = true;
   public indicadorObligatorio: boolean;
   public indicadorFiltrante: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
