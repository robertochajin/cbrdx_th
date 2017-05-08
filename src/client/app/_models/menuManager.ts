export class MenuManager {
   
   idMenu: number;
   codigoMenu: string;
   menu: string;
   ruta: string;
   clase: string;
   nuevo: boolean;
   secuencia: number;
   idPadre: number;
   indicadorHabilitado: boolean;
   auditoriaFecha: Date;
   auditoriaUsuario: number;
   
   constructor() {
      this.codigoMenu = "";
      this.menu = "";
      this.ruta = "";
      this.secuencia = null;
      this.indicadorHabilitado = true;
      this.idPadre = 0;
   }
}
