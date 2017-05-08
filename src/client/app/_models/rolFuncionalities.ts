import { Injectable } from "@angular/core";

@Injectable()
export class RolFuncionalities {
   public idRolFuncionalidad: number;
   public idFuncionalidad: number;
   public idRol: number;
   public rol: string;
   public idMenu: number;
   public menu: string;
   public indicadorHabilitado: boolean;
   public indicadorImprimir: boolean;
   public indicadorExportar: boolean;
   public indicadorInsertar: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }
}
