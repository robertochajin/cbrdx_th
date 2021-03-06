import { Injectable } from '@angular/core';

@Injectable()
export class FormalStudies {

   public idTerceroEstudioFormal: number;
   public idTercero: number;
   public idNivelEstudio: number;
   public idAreaEstudio: number;
   public tituloEstudio: string;
   public idInstitucion: number;
   public otraInstitucion: string;
   public idCiudad: number;
   public idEstado: number;
   public fechaIngresa: Date;
   public fechaTermina: Date;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public indicadorVerificado: boolean;
   public fechaVerificado: string;
   public nivelEstudio: string;
   public areaEstudio: string;
   public institucion: string;
   public ciudad: string;
   public estadoEstudio: string;

}
