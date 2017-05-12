export class Usuario {
   idUsuario: number;
   usuarioSistema: string;
   contrasena: string;
   contrasenaAntigua: string;
   usuarioLdap: boolean = true;
   fechaInactivacion: Date;
   idTercero: number;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   correoElectronico: string;
}
