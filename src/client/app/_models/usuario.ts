/**
 * Created by jenni on 13/02/2017.
 */
export class Usuario {
    idUsuario: number;
    usuarioSistema: string;
    contrasena: string;
    usuarioLdap: boolean = true;
    fechaInactivacion: Date;
    idTercero: number;
    indicadorHabilitado: boolean = true;
    auditoriaUsuario: number;
    auditoriaFecha: Date;
    correoElectronico: string;
}