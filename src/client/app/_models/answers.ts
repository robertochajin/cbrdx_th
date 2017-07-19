import { Injectable } from '@angular/core';

@Injectable()
export class Answers {

   public idRespuesta: number = null;
   public idMaestroRespuesta: number = null;
   public idCuestionarioPregunta: number = null;
   public idPreguntaOpcion: number = null;
   public codigoOpcion: string;
   public codigoPregunta: string;
   public opcion: string;
   public orden: number;
   public secuencia: number;
   public pregunta: string;
   public respuesta: string;
   public tipoPregunta: string;
   public codigoTipoPregunta: string;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

}