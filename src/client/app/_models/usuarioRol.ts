/**
 * Created by jenni on 13/02/2017.
 */
export class UsuarioRol {
   idUsuarioRol: number;
   idUsuario: number;
   idRol: number;
   auditoriaUsuario: number = null;
   auditoriaFecha: Date = null;
   fechaInicio: Date = null;
   fechaFin: Date = null;
   indicadorHabilitado: boolean = true;
}
