import {Injectable} from "@angular/core";

@Injectable()
export class Responsabilities {
  public idResponsabilidad: number;
  public responsabilidad: string;
  public descripcion: string;
  public indicadorHabilitado: boolean;
  public auditoriaUsuario: number;
  public auditoriaFecha: string;
}
