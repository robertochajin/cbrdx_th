import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationalStructurePositions {

   public idEstructuraOrganizacionalCargo : number;
   public idEstructuraOrganizacional : number;
   public idCargo : number;
   public plazas : number;
   public indicadorHabilitado : boolean;
   public auditoriaUsuario : number;
   public auditoriaFecha : string;
   public cargo: string;
   public salario: number;


   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }
}
