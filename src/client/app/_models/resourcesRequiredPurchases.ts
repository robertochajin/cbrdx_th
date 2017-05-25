import { Injectable } from '@angular/core';

@Injectable()
export class ResourcesRequiredPurchases {

   public idRequerimientoCompra: number;
   public idCompra: number;
   public idRequerimiento: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public compra: string;
   public indicadorHabilitado: boolean = true;

   constructor() {
      this.idRequerimientoCompra= null;
   }
}
