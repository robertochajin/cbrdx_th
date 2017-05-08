export class JobProjection {
   idProyecccionLaboral: number;
   idEstructuraOrganizacional: number;
   idCargo: number;
   cargo: string;
   plazasActuales: number;
   plazasProyectadas: number;
   costoActual: number;
   costoProyectado: number;
   idEstadoProyeccion: number;
   estadoProyeccion: string;
   idUsuarioAprueba: number;
   idUsuarioProyecta: number;
   anio: number;
   observacion: string;
   observacionAprobacion: string;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   index: number;
   costoPP: string;
   costoAP: string;
   
   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idProyecccionLaboral = null;
   }
}
