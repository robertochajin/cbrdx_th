export class PhysicStructure {
   idEstructuraFisica: number;
   codigo:string;
   estructuraFisica: string;
   idClasificacionSede: number;
   clasificacionSede:string;
   idLocalizacion: number;
   direccion:string;
   camino: string;
   telefono: number;
   celular: string;
   correoElectronico: string;
   indicadorVirtual:boolean;
   indicadorHabilitado: boolean;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idEstructuraFisica = null;
      this.direccion='';
      this.telefono=null;
      this.celular=null;
   }
}