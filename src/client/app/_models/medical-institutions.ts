import { Injectable } from '@angular/core';

@Injectable()
export class MedicalInstitution {

   public idInstitucionMedica: Number;
   public institucionMedica: string;
   public representanteLegal: string;
   public idLocalizacion: number;
   public valorExamenOsteosmuscular: Number;
   public valorExamenVisiometria: Number;
   public valorExamenOptometria: Number;
   public direccion: string;
   public correoElectronico: string;
   public telefonoContacto: string;
   public indicadorHabilitado: boolean=true;
   public auditoriaUsuario: Number;
   public auditoriaFecha: Date;


   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.direccion='';
   }

}
