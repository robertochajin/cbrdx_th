import {Injectable} from '@angular/core';

@Injectable()
export class ProcessRoles {


   public idLista: number;
   public codigo: string;
   public nombre: string;
   public orden: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;

   //Atributo auxiliar
   public asignadoAlCargo: boolean;

   constructor(idLista: number, codigo: string, nombre: string, orden: number) {
      this.idLista = idLista;
      this.codigo = codigo;
      this.nombre = nombre;
      this.orden = orden;
      this.asignadoAlCargo = false;
      this.indicadorHabilitado = true;
      this.auditoriaUsuario = 1;
      this.auditoriaFecha = "";
   }

}
