import { Injectable } from "@angular/core";

@Injectable()
export class FunctionalitySection {
   
   public idFuncionalidadSeccion: number;
   public codigo: number;
   public nombre: string;
   public indicadorHabilitado: boolean = true;
   public indicadorVisible: boolean = true;
   public indicadorImprime: boolean = true;
   public idListaClasificacion: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idFuncionalidadSeccion = null;
   }
}
