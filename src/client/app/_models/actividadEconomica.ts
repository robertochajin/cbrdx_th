/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 9/03/2017.
 */
export class ActividadEconomica {
   idActividadEconomica: number;

   idActividadPadre: number = 0;
   idActividadTipo: number = 0;
   codigoActividadEconomica: string;
   actividadEconomica: string;
   indicadorHabilitado: boolean = true;

   auditoriaUsuario: number;
   auditoriaFecha: Date;
}