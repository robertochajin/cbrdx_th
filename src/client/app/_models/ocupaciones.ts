/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 6/03/2017.
 */
export class Ocupaciones {
   idOcupacion: number;
   idOcupacionPadre: number = 0;
   idOcupacionTipo: number = 0;
   ocupacion: string;
   codigoOcupacion: string;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
}