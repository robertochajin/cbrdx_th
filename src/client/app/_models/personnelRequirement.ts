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
   public fechaSolicitud: Date;
   public indicadorAutorizacion: boolean;
   public indicadorAumentoPlazas: boolean;
   public idJefe: number;
   public idCategoria: number;
   public idTipoSolicitud: number;
   public fechaInicio: Date;
   public fechaFin: Date;
   public nombreCargo: string;
   public funcionCargo: string;
   public cargo: string;
   public nombreResponsableSeleccion: string;
   public estado: string;
   public area: string;
   public estructuraFisica: string;
   public tipoSolicitud: string;
   public cargoJefe: string;
   public categoria: string;
   public salario: number;
   public nombreSolicitante: string;
   public autorizacion: string;
   public nombrejefe: string;
   public editar: boolean = true;
   public idCargoJefe: number;

   // adicional para proceso de seleccion
   public idPublicacion: number;
   public fechaInicioPublicacion:Date;
   public fechaFinPublicacion: Date;
   public indicadorSalario: boolean;
   public indicadorBonificacion: boolean;
   public nivelEducacion: string;
   public idNivelEducacion: number;
   public tipoTrabajo: string;
   public idTipoTrabajo: number;
   public descripcionGeneral: string;
   public lugarTrabajo: string;
   public competenciasLaborales: string;
   public indicadorObservacion: boolean;
   public observacion: string;

   constructor() {
      this.editar = true;
   }
}

