import { Injectable } from '@angular/core';

@Injectable()
export class MasterAnswers {

   public idMaestroRespuesta: number = null;
   public idUsuario: number = null;
   public idCuestionario: number = null;
   public idPreguntaEnCurso: number = null;
   public indicadorFinalizado: boolean = false;
   public indicadorAprobado: boolean = true;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

}
