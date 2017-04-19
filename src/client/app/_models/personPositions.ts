import { Injectable } from "@angular/core";

@Injectable()
export class PersonPositions {
   idTerceroCargo: number; 
   idSede: number;
   idArea: number;
   idCargo: number;
   fechaInicio: string;
   fechaFin: string;
   idTipoContrato: number;
   public indicadorHabilitado : boolean;
   auditoriaUsuario: number; 
   auditoriaFecha: string;
   idTercero: number;
}
