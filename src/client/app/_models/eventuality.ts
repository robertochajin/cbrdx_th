import { Injectable } from '@angular/core';

@Injectable()
export class Eventuality {

   public idNovedad : number;
   public codigoNovedad : string;
   public novedad : string;
   public idTipoNovedad : number;
   public idRolResponsable : number;
   public idEstadoInicialNovedad : number;
   public indicadorHabilitado : boolean;
   public indicadorAusentismo : boolean;
   public indicadorSeguimiento : boolean;
   public indicadorConfirmacion : boolean;
   public indicadorAdjuntos : boolean;
   public indicadorAutorizaJefe : boolean;
   public indicadorNotificaJefe : boolean;
   public indicadorBandeja : boolean;
   public indicadorPlanta : boolean;
   public indicadorAreasApoyo : boolean;
   public codigoSafix : string;
   public indicadorNomina : boolean;
   public indicadorAfecta : boolean;
   public idTipoAfectacion : number;
   public indicadorCancelacion : number;
   public idEstadoTercero : number;
   public auditoriaUsuario : number;
   public auditoriaFecha : Date;
   public fechaCreacion : Date;


   //Atributos auxiliares
   public tipoNovedad : string;
   public rolResponsable : string;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
      this.indicadorHabilitado = true;
   }

}
