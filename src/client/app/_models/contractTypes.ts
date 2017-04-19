import { Injectable } from '@angular/core';

@Injectable()
export class ContractTypes {

   idListaTipoContrato : number ;
   codigo : string;
   nombre : string;
   orden : number ;
   indicadorHabilitado : boolean ;
   auditoriaUsuario : number ;
   auditoriaFecha : string ;
}
