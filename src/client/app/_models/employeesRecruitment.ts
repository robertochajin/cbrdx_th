import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesRecruitment {

   public idTercero: number;
   public cargo: string;
   public codigo: string;
   public estado: string;
   public fechaInicio: Date;
   public responsableSeleccion: string;

   constructor() {
      cargo = null;
   }

}