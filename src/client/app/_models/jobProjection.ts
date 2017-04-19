
export class JobProjection {
   idProyeccion: number;
   idArea: number;
   idCargo: number;
   idTipoArea: number;
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