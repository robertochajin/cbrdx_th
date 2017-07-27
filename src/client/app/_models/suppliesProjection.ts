import { Injectable } from '@angular/core';

@Injectable()
export class SuppliesProjection {

   public idProyeccionDotacion: number;
   public nombreProyeccion: string;
   public idGrupoDotacion: number;
   public indicadorAdicional: boolean = true;
   public indicadorNoAreas: boolean = false;
   public cantidadProyeccion: number;
   public cantidadMeses: number;
   public fechaInicio: Date;
   public fechaFin: Date;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
   public idEstructuraOrganizacional : number[]=[];

   constructor() {
      this.auditoriaFecha = null;
   }
}
