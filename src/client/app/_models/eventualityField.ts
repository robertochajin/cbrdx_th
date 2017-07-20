import { Injectable } from '@angular/core';

@Injectable()
export class EventualityField {

   public idNovedadCampo: number;
   public idNovedad: number;
   public idCampoNovedad: number;
   public campoNovedad: string;
   public indicadorObligatorio: boolean;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.indicadorHabilitado = false;
      this.indicadorObligatorio = false;
   }

}
