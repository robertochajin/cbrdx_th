import { Injectable } from '@angular/core';

@Injectable()
export class Absence {

   idCargoRelacionado: number;
   idTipoRelacion: number;
   idCargo:number;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   idCargoRelacion: number;
   cargoRelacion: string;
   indicadorHabilitado:boolean;

   constructor() {
      this.auditoriaUsuario= null;
      this.auditoriaFecha=null;
      this.idCargoRelacionado= null;
      this.indicadorHabilitado= true;
   }

}