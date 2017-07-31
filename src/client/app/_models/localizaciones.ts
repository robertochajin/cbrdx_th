import { Injectable } from '@angular/core';
import { LocationsNomenclatures } from './locationsNomenclatures';

@Injectable()
export class Localizaciones {

   idLocalizacion: number;
   idTipoDireccion: number;
   direccion: string = '';
   latitud: string = '';
   longitud: string = '';
   comoLlegar: string = '';
   indicadorHabilitado: boolean = true;
   idDivisionPolitica: number = null;
   auditoriaUsuario: number;
   auditoriaFecha: string;
   principal: string;
   adicional: string;
   adicionalComplementaria: string;
   nomenclaturaPrincipal: number;
   idTipoNomenclatura: number;
   locacion: { camino: string, idDivisionPolitica: number };

   // nomenclaturas complementarias
   listLN: LocationsNomenclatures[] = [];
}

