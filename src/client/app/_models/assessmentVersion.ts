import { Injectable } from '@angular/core';

@Injectable()
export class AssessmentVersion {

   public idValoracionRiesgo: number;
   public nombreVersion: string;
   public numeroVersion: number;
   public fechaCreacion: Date;
   public idUsuario: number;
   public nombreUsuario: string;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.indicadorHabilitado = true;
   }

}
