import {Injectable} from '@angular/core';

@Injectable()
export class Ponderancies {
   public idPonderacion : number;
   public ponderacion : string;
   public minimo : number;
   public maximo : number;
   public indicadorHabilitado : boolean;
   public auditoriaUsuario : number;
   public auditoriaFecha : string;

  constructor() {
    this.indicadorHabilitado = true;
    this.auditoriaUsuario = 1;
    this.auditoriaFecha = "";
  }
}
