import { Injectable } from '@angular/core';

@Injectable()
export class SuppliesProjectionOrganizationalStructure {

   public idProyeccionDotacion: number;
   public NombreProyeccion: string;
   public idProyeccionDotacionEstructuraOrganizacional: number;
   public indicadorAdicional: boolean = true;
   public indicadorNoAreas: boolean = false;
   public cantidadProyeccion: number;
   public cantidadMeses: number;
   public fechaInicio: Date;
   public fechaFin: Date;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
