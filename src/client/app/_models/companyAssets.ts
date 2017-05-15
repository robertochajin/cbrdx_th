export class CompanyAssets {
   public idCargoElemento: number;
   public idCargo: number;
   public idTipoElemento: number;
   public descripcion: string;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
   public nombreLista: string;
   public codigoLista: string;

   constructor() {
      this.idCargoElemento = null;
      this.auditoriaUsuario = null;
      this.auditoriaFecha = null;
   }
}
