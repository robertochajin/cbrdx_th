export class DivisionPolitica {
   idDivisionPolitica: number;
   idDivisionPoliticaPadre: number = 0;
   codigoDivisionPolitica: string;
   descripcionDivisonPolitica: string;
   indicativoDivisonPolitica: string = '';
   gentilicio: string = '';
   codigoPostalDivisionPolitica: string;
   idDivisionPoliticaTipo: number;
   idDivisionPoliticaArea: number;
   idEstratoDivisionPolitica: number = 0;
   idDivisionPoliticaAgrupacion: number;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   camino: string;
   nivel: number;
}
