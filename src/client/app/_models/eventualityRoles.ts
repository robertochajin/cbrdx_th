import { Injectable } from '@angular/core';

@Injectable()
export class EventualityRoles {

   public idNovedadesRoles: number;
   public idNovedad: number;
   public idRol: number;
   public rol: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.indicadorHabilitado = true;
   }

}
