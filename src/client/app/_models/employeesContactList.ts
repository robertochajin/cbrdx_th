import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesContact {

   public idTerceroContacto: number;
   public idTercero: number;
   public contacto: string;
   public idListaParentesco: number;
   public codigoListaParentesco: string;
   public nombreListaParentesco: string;
   public telefono: string;
   public celular: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.telefono = '';
      this.celular = '';
      this.idTerceroContacto = null;
      this.idListaParentesco = null;
   }
}
