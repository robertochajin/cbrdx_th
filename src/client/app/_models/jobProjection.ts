
export class JobProjection {
   idProyeccion: number;
   idSedeArea: number;
   idCargo: number;
   idEstado: number;
   nroPlazas: number;
   costoPlazas: number;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idProyeccion = null;
   }
}