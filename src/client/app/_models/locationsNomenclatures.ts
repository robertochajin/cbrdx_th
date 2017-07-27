import { Injectable } from '@angular/core';

@Injectable()
export class LocationsNomenclatures {

   public idLocalizacionNomenclatura: number;
   public idTipoNomenclaturaComplementaria: number;
   public idLocalizacion: number;
   public descripcion: string;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

}
