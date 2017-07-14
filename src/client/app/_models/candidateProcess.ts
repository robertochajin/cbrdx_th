import { Injectable } from '@angular/core';

@Injectable()
export class CandidateProcess {

   // ProcesoSeleccion
   public idProcesoSeleccion :number;
   public idProcesoPaso :number;
   public idEstadoDiligenciado :number;
   public idDesicionProcesoSeleccion :number;
   public idAdjunto :number;
   public idResponsable :number;
   public idTerceroPublicacion :number;
   public indicadorContProceso :boolean;
   public observacion :string;
   public fechaCita :string;
   public auditoriaUsuario :number;
   public auditoriaFecha :Date;
   public indicadorNoAplica:boolean;
   public estadoDiligenciado:string;
   public detalleCorreo:string;
   public nombreResponsable:string;

   constructor() {
      this.auditoriaUsuario = 1;
   }
}
