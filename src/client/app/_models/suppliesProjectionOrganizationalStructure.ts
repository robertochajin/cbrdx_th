import { Injectable } from '@angular/core';

@Injectable()
export class SuppliesProjectionOrganizationalStructure {

   public idProyeccionDotacionEstructuraOrganizacional: number;
   public idEstructuraOrganizacional: number;
   public idProyeccionDotacion: number;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
