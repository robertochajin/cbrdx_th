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
   public indicadorHabilitado: boolean = false;
   public indicadorAdicional: boolean;
   public indicadorRequiereTalla: boolean;
   public auditoriaUsuario: number;
   public valor: number;
   public auditoriaFecha: Date;

   constructor() {

   }
}