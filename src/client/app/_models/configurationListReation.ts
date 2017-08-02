import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationListRelation {
   public idRelacionListaHijo: number;
   public idRelacionLista: number;
   public idItemHijo: number;
   public codigo: string;
   public nombre: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }
}
