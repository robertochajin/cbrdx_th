import { Injectable } from "@angular/core";

@Injectable()
export class PositionsObservations {
   
   public idCargoEstadoObservacion: number;
   public observacion: string;
   public idCargo: number;
   public idEstadoCargo: number;
   public estadoCargo: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.indicadorHabilitado = true;
   }
}

