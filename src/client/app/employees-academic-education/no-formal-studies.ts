import { Injectable } from '@angular/core';

@Injectable()
export class Noformalstudies {
   public idTerceroEstudioNoFormal: number;
   public idTercero: number;
   public idTipoEstudio: number;
   public tipoEstudio: string;
   public otroEstudio: string;
   public idAreaEstudio: number;
   public areaEstudio: string;
   public tituloEstudio: string;
   public institucion: string;
   public idIntensidadHoraria: number;
   public intensidadHoraria: string;
   public descripcion: string;
   public idCiudad: number;
   public ciudad: string;
   public indicadorTerminacion: boolean;
   public fechaIngresa: Date;
   public fechaTermina: Date;
   public fechaVerificado: string;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public indicadorVerificado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   constructor() {
      this.auditoriaFecha = '';
      this.auditoriaUsuario = 1;
      this.descripcion = '';
      this.fechaIngresa = null;
      this.fechaTermina = null;
      this.idTipoEstudio = null;
      this.fechaVerificado = '';
      this.idAdjunto = 0;
      this.idAreaEstudio = null;
      this.idCiudad = 0;
      this.idIntensidadHoraria = null;
      this.idTercero = 0;
      this.indicadorHabilitado = true;
      this.indicadorTerminacion = true;
      this.indicadorVerificado = false;
      this.institucion = '';
      this.otroEstudio = '';
      this.tituloEstudio = '';
   }
}
