import { Injectable } from '@angular/core';

@Injectable()
export class PersonnelRequirement {

   public idRequerimiento: number;
   public idSolicitante: number;
   public justificacion: string;
   public idCargo: number;
   public idFormaContratacion: number;
   public idTipoContratacion: number;
   public cantidadVacantes: number;
   public cantidadConvocados: number;
   public idEstado: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public idResponsableSeleccion: number;
   public idFormaReclutamiento: number;
   public idEstructuraOrganizacional: number;
   public idZona: number;
   public idEstructuraFisica: number;
   public fechaSolicitud: string;
   public indicadorAutorizacion: boolean;
   public indicadorAumentoPlazas: boolean;
   public idJefe: number;
   public idCategoria: number;
   public idTipoSolicitud: number;
   public fechaInicio: string;
   public fechaFin: string;

   constructor() {
   }
}

