import { Injectable } from '@angular/core';

@Injectable()
export class VacancyTest {
   // ProcesoSeleccionPruebasTecnicas
   public idProcesoSeleccionPruebaTecnica: number;
   public idProcesoSeleccion: number;
   public idPruebaTecnica: number;
   public indicadorRealiza: boolean;
   public nota: string;
   public observacion: string;
   public idAdjunto: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: Date;
   public pruebaTecnica: string;
   public nombreArchivo: string;

   constructor() {
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
   }
}
