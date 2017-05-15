import { Injectable } from '@angular/core';

@Injectable()
export class RolFunctionalityControl {

   public idRolFuncionalidadControl: number;
   public idFuncionalidadControl: number;
   public idRol: number;
   public rol: string;
   public control: string;
   public codigo: string;
   public indicadorHabilitado: boolean = true;
   public indicadorSeccion: boolean = true;
   public indicadorEditar: boolean = true;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idRolFuncionalidadControl = null;
      this.idFuncionalidadControl = null;
      this.idRol = null;
      this.rol = '';
      this.control = '';
      this.codigo = '';
   }
}
