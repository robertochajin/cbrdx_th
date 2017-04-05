import {Injectable} from '@angular/core';

@Injectable()
export class EmployeesContact {
  
  public idTerceroContacto: number;
  public idTercero: number;
  public nombreContacto: string;
  public idListaParentesco: number;
  public telefonoFijo: string;
  public telefonoCelular: number;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: Date;
  
  constructor() {
      
  }
}
