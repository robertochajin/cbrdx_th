import { Injectable } from '@angular/core';

@Injectable()
export class SelectionStep {

   public idProcesoPaso: number;
   public idProceso: number;
   public codigo: string;
   public orden: number;
   public nombre: string;
   public idRol: number;
   public idTipoConvocatoria: number;
   public indicadorInterfazInterna: boolean;
   public interfazInterna: string;
   public indicadorBloqueante: boolean;
   public indicadorObservacion: boolean;
   public indicadorCorreo: boolean;
   public indicadorAdjunto: boolean;
   public indicadorLlamada: boolean;
   public indicadorCalendario: boolean;
   public indicadorContratado: boolean;
   public indicadorCuestionarios: boolean;
   public idCuestionario: number;
   public indicadorInterfaz: boolean;
   public interfaz: string;
   public descripcion: string;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;

   constructor() {
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }

}



