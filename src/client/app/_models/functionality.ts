import { Injectable } from "@angular/core";

@Injectable()
export class Functionality {
   
   public idFuncionalidad: number;
   public idMenu: number;
   public menu: string;
   public indicadorHabilitado: boolean = true;
   public indicadorSeccion: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idFuncionalidad = null;
   }
}
