export class MenuManager {
   
   idMenu : number;
   codigo : string;
   nombre : string;
   formulario : string;
   secuencia : number;
   idPadre : number;
   indicadorHabilitado : boolean;
   auditoriaFecha : Date;
   auditoriaUsuario : number;
   
   constructor(){
      this.codigo = "";
      this.nombre = "";
      this.formulario = "";
      this.secuencia = null;
      this.indicadorHabilitado = true;
   }
}
