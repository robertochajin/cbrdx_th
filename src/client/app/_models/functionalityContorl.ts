import { Injectable } from "@angular/core";

@Injectable()
export class FunctionalityControl {
   
   public idFuncionalidadControl: number;
   public idFuncionalidad: number;
   public idClasificacion: number;
   public idPadre: number;
   public codigo: string;
   public clasificacion: string;
   public control: string;
   public indicadorHabilitado: boolean = true;
   public indicadorVisible: boolean = true;
   public indicadorImprimir: boolean = true;
   public indicadorSeccion: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   public notFoundFiel: boolean;
   public index: number;
   
   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idFuncionalidadControl = null;
   }
}
