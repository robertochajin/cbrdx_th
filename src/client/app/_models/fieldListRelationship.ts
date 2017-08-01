import { Injectable } from '@angular/core';
@Injectable()
export class FieldListRelationship {
   public idRelacionListaCampo: number;
   public nombreRelacion: string;
   public idRelacionLista: number;
   public menu: string;
   public funcionalidadControl: string;
   public idFuncionalidadesControles: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = false;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }
}