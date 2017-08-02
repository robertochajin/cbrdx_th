import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationList {
   public idRelacionLista: number;
   public idListaPadre: number;
   public idListaHijo: number;
   public idItemPadre: number;
   public nombreRelacion: string;
   public codigo: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }
}
