import {Injectable} from '@angular/core';

@Injectable()
export class Localizaciones {

  idLocalizacion: number;
  idTipoDireccion: number;
  direccion: string = "";
  latitud: string = "";
  longitud: string = "";
  comoLlegar: string = "";
  indicadorHabilitado: boolean = true;
  idDivisionPolitica: number = null;
  auditoriaUsuario: number;
  auditoriaFecha: string;
  nomenclaturaPrincipal: number;
  locacion: {camino: string, idDivisionPolitica: number};

  constructor(){
     this.locacion.camino = "";
     this.locacion.idDivisionPolitica = null;
  }
}
