import { Injectable } from "@angular/core";

@Injectable()
export class Intensity {
   public idListaIntensidad: number;
   public codigoListaIntensidad: string;
   public nombreListaIntensidad: string;
   public ordenListaIntensidad: number;
   public indicadorHabilitado: boolean;
   public auditoriaUsuario: number;
   public auditoriaFecha: string;
}
