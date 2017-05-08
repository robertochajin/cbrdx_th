import { Injectable } from '@angular/core';

@Injectable()
export class PositionRoles {
   public idCargoRolProceso: number;
   public idRolProceso: number;
   public idCargo: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   public cragoRolProceso: string;
   public cargo: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }
}
