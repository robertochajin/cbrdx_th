import { Injectable } from '@angular/core';
import { Risk } from './position-risks';

@Injectable()
export class RiskType {

   public idRiesgoTipo : number;
   public riesgoTipo : string;
   public indicadorHabilitado : boolean;
   public auditoriaUsuario : number;
   public auditoriaFecha : Date;

   // Array adicional para lista riesgos
   public subTypes: Risk[] = [];

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.indicadorHabilitado = true;
   }

}
