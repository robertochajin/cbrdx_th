import { Injectable } from '@angular/core';

@Injectable()
export class Supplies {

   public idDotacion: number = null;
   public idGrupoDotacion: number = null;
   public idTipoTalla: number = null;
   public idCicloEntrega: number = null;
   public codigo: string;
   public descripcion: string;
   public grupoDotacion: string;
   public cicloEntrega: string;
   public detalleProveedor: string;
   public dotacion: string;
   public nombreArchivo: string;
   public tipoTalla: string;
   public costo: number;
   public cantidad: number;
   public idAdjunto: number = null;
   public indicadorHabilitado: boolean = true;
   public indicadorAdicional: boolean;
   public indicadorRequiereTalla: boolean;
   public auditoriaUsuario: number;
   public valor: number;
   public auditoriaFecha: Date;
   public total: number;
   public totales: TotalSupplies[] = [];

   constructor() {

   }
}
export class TotalSupplies {

   public talla: string;
   public Genero: string;
   public Total: string;

}
