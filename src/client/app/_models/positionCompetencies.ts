import { Injectable } from "@angular/core";

@Injectable()
export class PositionCompetencies {
   public idCargoCompetencia: number;
   public idCargo: number;
   public idCompetencia: number;
   public idPonderacion: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }
}
