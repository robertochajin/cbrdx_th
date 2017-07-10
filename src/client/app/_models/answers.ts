import { Injectable } from '@angular/core';

@Injectable()
export class Answers {

   public idRespuesta: number = null;
   public idCuestionarioPregunta: number = null;
   public idPreguntaOpcion: number = null;
   public respuesta: string;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

}
