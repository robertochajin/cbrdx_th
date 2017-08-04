import { Injectable } from '@angular/core';

@Injectable()
export class EmployessSuppliesProjection {

   public idProyeccionDotacionTerceros: number;
   public idProyeccionDotacion: number;
   public documento: string;
   public nombreCompleto: string;
   public codigoVerificacion: string;
   public cargo: string;
   public area: string;
   public tipoArea: string;
   public idTercero: number;
   public idEstado: number;
   public estado: number;
   public fechaEntrega: Date;
   public fechaPosibleEntrega: Date;
   public comentario: string;
   public comentarioAdicional: string;
   public comentarioEntrega: string;
   public indicadorHabilitado: boolean = true;
   public indicadorSatisfecho: boolean = true;
   public indicadorAdicional: boolean = false;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
   public idMotivo: number;
   public motivo: number;
   public observacion: string;
   public imagen: string;

   constructor() {

   }
}
