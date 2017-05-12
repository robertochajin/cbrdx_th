export class Rol {
   idRol: number;
   codigoRol: string;
   rol: string;
   descripcion: string;
   fechaInicio: string;
   fechaFin: string ;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   constructor(){
      this.fechaInicio = null;
      this.fechaFin = null;
      this.descripcion = '';

   }
}
