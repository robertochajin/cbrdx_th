export class TiposPersonas {
   
   idListaTipoPersona: number;
   codigoListaTipoPersona: string;
   nombreListaTipoPersona: string;
   ordenListaTipoPersona: number;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;
   private _label?: string;
   private _value?: number;
   
   constructor() {
      // this._label = this.nombreListaTipoPersona;
      // this._value = this.idListaTipoPersona;
   }
   
   get label(): string {
      return this.nombreListaTipoPersona;
   }
   
   get value(): number {
      return this.idListaTipoPersona;
   }
   
}
