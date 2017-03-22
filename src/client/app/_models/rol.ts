/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 26/02/2017.
 */
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
}