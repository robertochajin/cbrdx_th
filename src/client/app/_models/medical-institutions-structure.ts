import { Injectable } from '@angular/core';

@Injectable()
export class MedicalInstitutionStructure {

   public idInstitucionMedicaEstructuraFisica: Number;
   public idInstitucionMedica: Number;
   public idEstructuraFisica: Number;
   public estructuraFisica: string;
   public valorViaje: Number;
   public indicadorHabilitado: boolean;
   public indicadorViaja: boolean;
   public auditoriaUsuario: Number;
   public auditoriaFecha: Date;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }

}
