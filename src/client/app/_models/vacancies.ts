import { Injectable } from '@angular/core';

@Injectable()
export class Vacancies {

   idRequerimiento: number;
   idCargo: number;
   cargo: string;
   fechaSolicitud: Date;
   idEstructuraOrganizacional: number;
   area: string;
   idEstructuraFisica: number;
   estructuraFisica: string;
   idTipoSolicitud: number;
   tipoSolicitud: string;
   idJefe: number;
   cargoJefe: string;
   idCategoria: number;
   categoria: string;
   idEstado: number;
   estado: string;
   salario: number;
   idSolicitante: number;
   idResponsableSeleccion: number;
   idFormaReclutamiento: number;
   nombreSolicitante: string;
   cantidadVacantes: number;
   cantidadConvocados: number;
   indicadorAutorizacion: boolean;
   autorizacion: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}
