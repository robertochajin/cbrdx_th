import { Injectable } from '@angular/core';

@Injectable()
export class Workexperience {

   public idTerceroExperienciaLaboral?: number;
   public idTercero: number;
   public empresa?: string;
   public cargo: string;
   public idNivelCargo: number;
   public nivelCargo?: string;
   public telefonoEmpresa: string;
   public idSectorEmpresa: number;
   public sectorEmpresa?: string;
   public idSubSectorEmpresa: number;
   public subSectorEmpresa?: string;
   public areaCargo: string;
   public jefeInmediato: string;
   public tiempoExperiencia: string;
   public idCiudad: number;
   public ciudad?: string;
   public indicadorActualmente: boolean;
   public indicadorHabilitado: boolean;
   public fechaIngresa: Date;
   public fechaTermina: Date;
   public idAdjunto: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.idTercero = null;
      this.empresa = '';
      this.cargo = '';
      this.idNivelCargo = null;
      this.nivelCargo = '';
      this.telefonoEmpresa = '';
      this.idSectorEmpresa = null;
      this.sectorEmpresa = '';
      this.idSubSectorEmpresa = null;
      this.subSectorEmpresa = '';
      this.areaCargo = '';
      this.jefeInmediato = '';
      this.tiempoExperiencia = '';
      this.idCiudad = null;
      this.ciudad = '';
      this.indicadorActualmente = false;
      this.indicadorHabilitado = true;
      this.fechaIngresa = null;
      this.fechaTermina = null;
      this.idAdjunto = null;
      this.auditoriaUsuario = 1;
   }
}
