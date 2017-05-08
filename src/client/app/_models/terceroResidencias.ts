import { Injectable } from "@angular/core";

@Injectable()
export class TerceroResidencias {
   public idTerceroResidencia: number;
   public idTerceroLocalizacion: number;
   public idTipoVivienda: number;
   public idTipoConstruccionVivienda: number;
   public idEstrato: number;
   public idClasesViviendas: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   
   constructor() {
      this.indicadorHabilitado = false;
   }
   
}
