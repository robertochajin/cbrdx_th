import { Injectable } from '@angular/core';

@Injectable()
export class References {
  public idReferencia: number;
  public idColaborador?: number;
  public tipodeReferencia: {value:number, label:string}
  public empresa: string;
  public primerNombre: string;
  public segundoNombre: string;
  public primerApellido: string;
  public segundoApellido: string;
  public ciudad: {value:number, label:string};
  public telefono: string;
  public celular: string;
  public direccion: string;
  public nombreCompleto?: string;
  public numeroContacto?: string;


  constructor() {
    this.nombreCompleto = '';
    this.numeroContacto = '';
    this.segundoNombre = '';
    this.segundoApellido = '';
    this.direccion = '';
    this.ciudad = {value:null, label:''}
    this.tipodeReferencia = {value:null, label:''}
  }
}



