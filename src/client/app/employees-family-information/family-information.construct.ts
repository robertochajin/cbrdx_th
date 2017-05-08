export class ConstructorFamilyInformation {
   idTerceroFamiliar: number;
   idTercero: number;
   idTipoDocumento: number;
   TipoDocumento: string;
   telefonoFijo: string;
   telefonoCelular: string;
   numeroDocumento: string;
   idConvivencia: number;
   Parentezco: any;
   idParentesco: number;
   idFamiliar: number;
   primerNombre: string;
   segundoNombre: string;
   primerApellido: string;
   segundoApellido: string;
   fechaNacimiento: string;
   correoElectronico: string;
   direccion: string;
   indicadorHabilitado: boolean;
   idLocalizacion: number;
   nombreCompleto: string;
   edad: string;
   auditoriaFecha: string;
   auditoriaUsuario: number;

   constructor() {
      this.auditoriaFecha = "";
      this.auditoriaUsuario = 1;
      this.direccion = '';
   }
}
