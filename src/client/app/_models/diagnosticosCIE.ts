import { Injectable } from '@angular/core';

@Injectable()
export class DiagnosticosCIE {

   public idDiagnosticoCIE: number;
   public codigo: string;
   public simbolo: string;
   public descripcion: string;
   public sexo: number;
   public limiteInferior: number;
   public limiteSuperior: number;
   public noAfeccion: number;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public label: string;

}
