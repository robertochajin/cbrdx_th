/**
 * Created by Andres on 30/05/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Publications {

   idPublicacion: number;
   idRequerimiento: number;
   fechaInicio: Date;
   fechaFin: Date;
   indicadorSalario: boolean;
   indicadorBonificacion: boolean;
   indicadorPublicacion: boolean;
   idNivelEducacion: number;
   nivelEducacion: string;
   idTipoTrabajo: number;
   tipoTrabajo: string;
   idFormaReclutamiento: number;
   formaReclutamiento: string;
   descripcionGeneral: string;
   lugarTrabajo: string;
   competenciasLaborales: string;
   observacion: string;
   indicadorObservacion: boolean;
   indicadorHabilitado: boolean= true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   cargo: string;
   idProceso: number;

   constructor() {
      this.idPublicacion = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}


