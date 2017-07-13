import { Injectable } from '@angular/core';

@Injectable()
export class TerceroPublicaciones {

   public idTercerosPublicaciones: number;
   public idTercero: number;
   public idPublicacion: number;
   public paso: number;
   public indicadorTerminos: boolean;
   public indicadorCentrales: boolean;
   public indicadorFinalizado: boolean;
   public codigo: string;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
   public fechaContratacion: Date;
   public indicadorContratacion: boolean;

   constructor() {
      this.auditoriaUsuario = 1;
   }
}
