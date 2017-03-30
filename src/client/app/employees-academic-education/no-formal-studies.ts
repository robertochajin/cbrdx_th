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
  public fechaIngresa: string;
  public fechaTermina: string;
  public idAdjunto: number;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;
}
