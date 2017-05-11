import { Injectable } from '@angular/core';

@Injectable()
export class PersonnelRequirement {

   public idRequerimiento : number ;
   public idSolicitante : number;
   public motivo : string;
   public idCargo : number;
   public idFormaContratacion : number;
   public idTipoContratacion : number;
   public cantidadVacantes : number;
   public cantidadConvocados : number;
   public idEstado : number;
   public auditoriaUsuario : number ;
   public auditoriaFecha : string ;
   public idResponsableSeleccion : number;
   public idFormaRecluta : number;

   constructor() {
   }
}

