import { Injectable } from '@angular/core';

@Injectable()
export class References {
   public idTerceroReferencia: number;
   public idTercero: number;
   public idTipoReferencia: number;
   public empresa: string;
   public primerNombre: string;
   public segundoNombre: string;
   public primerApellido: string;
   public segundoApellido: string;
   public telefonoFijo: string;
   public telefonoMovil: string;
   public idLocalizacion: number;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public indicadorVerificado: boolean;
   public fechaVerificado: string;

   public nombreCompleto?: string;
   public ciudad?: string;
   public direccion?: string;
   public tipodeReferencia?: { value: number, label: string }

   public numeroContacto?: string;

   constructor() {
      this.nombreCompleto = '';
      this.segundoNombre = '';
      this.segundoApellido = '';
      this.direccion = '';
      this.tipodeReferencia = { value: null, label: '' };
   }
}



