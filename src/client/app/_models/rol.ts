export class Rol {
   idRol: number;
   codigoRol: string;
   rol: string;
   descripcion: string;
   fechaInicio: Date;
   fechaFin: Date;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.fechaInicio = null;
      this.fechaFin = null;
      this.descripcion = '';

   }
}
