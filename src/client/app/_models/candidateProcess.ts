import { Injectable } from '@angular/core';

@Injectable()
export class CandidateProcess {

   public idProcesoSeleccion :number;
   public idProcesoPaso :number;
   public idEstadoDiligenciado :number;
   public idAdjunto :number;
   public idResponsable :number;
   public idTercero :number;
   public idPublicacion :number;
   public indicadorContProceso :boolean;
   public observacion :string;
   public fechaCita :Date;
   public auditoriaUsuario :number;
   public auditoriaFecha :Date;
   public indicadorNoAplica:boolean;

   constructor() {
      this.auditoriaUsuario = 1;
   }
}
