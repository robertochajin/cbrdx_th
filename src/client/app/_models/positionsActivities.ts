export class PositionsActivities {
   idCargoOcupacion: number;
   idCargo: number;
   ocupacion: string;
   idOcupacion: number;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   
   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idCargoOcupacion = null;
   }
}