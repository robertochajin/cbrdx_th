export class PhysicStructute {
   idEstructura: number;
   nombre: string;
   subtipo: string;
   telefono: number;
   celular: number;
   correo: string;
   categoria: string;
   virtual: boolean;
   indicadorHabilitado: boolean = true;
   auditoriaUsuario: number;
   auditoriaFecha: Date;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
      this.idEstructura = null;
   }
}