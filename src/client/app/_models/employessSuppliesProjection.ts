import { Injectable } from '@angular/core';

@Injectable()
export class EmployessSuppliesProjection {

   public idProyeccionDotacionTerceros: number;
   public idProyeccionDotacion: number;
   public idTercero: number;
   public idEstado: number;
   public fechaEntrega: Date;
   public comentario: string;
   public indicadorHabilitado: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}
