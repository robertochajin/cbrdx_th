/**
 * Created by Andres on 30/05/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Publications {

   idPublicacion: number;
   idRequermiento: number;
   fechaInicio: Date;
   fechaFin: Date;
   indicadorSalario: boolean;
   indicadorBonificacion: boolean;
   idNivelEducacion: number;
   idTipoTrabajo: number;
   descripcionGeneral: string;
   lugarDeTrabajo: string;
   competenciasLaborales: string;
   observacion: string;
   indicadorObservacion: boolean;
   indicadorHabilitado: boolean= true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.idPublicacion = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}

