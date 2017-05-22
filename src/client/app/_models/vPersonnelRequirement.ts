import { Injectable } from '@angular/core';

@Injectable()
export class VPersonnelRequirement {

   public idRequerimiento: number;
   public nombreSolicitante: string;
   public idSolicitante: number;
   public justificacion: string;
   public cargo: string;
   public idCargo: number;
   public salario: number;
   public formaContratacion: string;
   public idFormaContratacion: number;
   public tipoContratacion: string;
   public idTipoContratacion: number;
   public cantidadVacantes: number;
   public cantidadConvocados: number;
   public estado: string;
   public idEstado: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public nombreResponsableSeleccion: string;
   public idResponsableSeleccion: number;
   public formaReclutamiento: string;
   public idFormaReclutamiento: number;
   public area: string;
   public idEstructuraOrganizacional: number;
   public zona: string;
   public idZona: number;
   public estructuraFisica: string;
   public idEstructuraFisica: number;
   public fechaSolicitud: string;
   public indicadorAutorizacion: boolean;
   public indicadorAumentoPlazas: boolean;
   public nombrejefe:string;
   public idJefe: number;
   public categoria:string;
   public idCategoria: number;
   public tipoSolicitud: string;
   public idTipoSolicitud: number;
   public fechaInicio: string;
   public fechaFin: string;
   public nombreCargo: string;
   public funcionCargo: string;

   constructor() {
   }
}