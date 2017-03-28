import { Injectable } from '@angular/core';

@Injectable()
export class FormalStudies {

  public idTerceroEstudioFormal: number ;
  public idTercero: number ;
  public idNivelEstudio: number ;
  public idAreaEstudio: number ;
  public tituloEstudio: string ;
  public idInstitucion: number ;
  public otraInstitucion: string;
  public idCiudad: number ;
  public idEstado: number ;
  public fechaIngresa: string ;
  public fechaTermina: string ;
  public idAdjunto: number ;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number ;
  public auditoriaFecha: string ;
  public indicadorVerificado: boolean ;
  public fechaVerificado: string;

  constructor() {
  }
}
