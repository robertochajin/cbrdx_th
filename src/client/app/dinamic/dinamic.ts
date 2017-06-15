import { Injectable } from '@angular/core';

@Injectable()
export class Dinamic {
   public idComponente: number;
   public codigo: string;
   public nombre: string;
   public tipo: string;
   public indicadorVisible: boolean;
   public indicadorEditable: boolean;

   constructor() {
   }
}
