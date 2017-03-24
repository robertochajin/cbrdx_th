import { Injectable } from '@angular/core';

@Injectable()
export class Localizaciones {
  public idUbicacion: number;
  public idTipoDireccion: number;
  public direccion: string;
  public latitud: string;
  public longitud: string;
  public comoLlegar: string;
  public indicadorHabilitado: boolean;
  public idDivisionPolitica: number;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;
}
