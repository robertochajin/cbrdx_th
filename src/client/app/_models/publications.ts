/**
 * Created by Andres on 30/05/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Publications {

   idRequerimientosPublicaciones: number;
   idRequermiento: number;
   fechaInicio: Date;
   fechaFin: Date;
   indicadorMostrarSalario: boolean;
   indicadorBonificacion: boolean;
   idNivelEducacion: number;
   idTipoTrabajo: number;
   descripcionGeneral: string;
   lugarDeTrabajo: string;
   competenciasLaborales: string;
   observacion: string;
   indicadorObservacion: boolean= true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.idRequerimientosPublicaciones = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}


