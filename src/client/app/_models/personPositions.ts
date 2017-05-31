import { Injectable } from '@angular/core';

@Injectable()
export class PersonPositions {
   idTerceroCargo: number;
   idSede: number;
   idArea: number;
   idCargo: number;
   idTipoContrato: number;
   indicadorHabilitado: boolean;
   auditoriaUsuario: number;
   auditoriaFecha: string;
   idTercero: number;
   idEstructuraOrganizacionalCargo: number;
   asignadoDesde: Date;

   // Atributos auxiliares
   cargo: string;
   primerNombre: string;
   primerApellido: string;
   segundoNombre: string;
   segundoApellido: string;
   nombreCompleto: string;
   tipoContrato: string;
   idZona: number;
   zona: string;
   idEstructuraOrganizacional: number;
}
