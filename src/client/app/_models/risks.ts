
export class Risks {
   idRiesgo: number;
   idSubTipoRiesgo: number;
   subtipo: string;
   idTipoRiesgo: number;
   tipo: string;
   riesgo: number = 0;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
constructor() {
   this.auditoriaFecha = null;
   this.auditoriaUsuario = null;
   this.idRiesgo = null;
}
}