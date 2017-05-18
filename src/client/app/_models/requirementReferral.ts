import { Injectable } from '@angular/core';

@Injectable()
export class RequirementReferral {
   public idRequerimientoReferido: number;
   public idRequerimiento: number;
   public nombre: string;
   public telefono: string;
   public correoElectronico: string;
   public fechaReferencia: Date;
   public idEstado: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
}
