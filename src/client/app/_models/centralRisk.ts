export class CentralRisk {

   idCentralRiesgo: number;
   codigo: string;
   nombre: string;
   url: string;
   indicadorReporta: boolean = false;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   // Se agrego estos campos a nivel de vista para fasilitar las acciones en el datatable
   idTerceroCentralRiesgo: number = null;
   idTercero: number = null;
   idAdjunto: number = null;
   indicadorReportado: boolean = false;
   indicadorAprobado: boolean = false;
}
