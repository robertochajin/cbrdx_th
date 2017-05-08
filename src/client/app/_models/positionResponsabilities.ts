import { Injectable } from "@angular/core";

@Injectable()
export class PositionResponsabilities {
   public idCargoResponsabilidad: number;
   public idResponsabilidad: number;
   public idCargo: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public responsabilidad: string;
   public descripcion: string;
   
   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }
}
