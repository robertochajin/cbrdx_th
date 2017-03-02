import { Injectable } from '@angular/core';

@Injectable()
export class Employee {

  public idColaborador : string;
  public tipoDocumento : {value:number, label:string};
  public numeroDocumento : string;
  public nombreCompleto?  : string;
  public primerNombre  : string;
  public segundoNombre : string;
  public primerApellido  : string;
  public segundoApellido : string;
  public fechaDesde?  : string;
  public cargoActual? : string;
  public Avatar?  : string;
  public ciudadExpedicion?  : {value:number, label:string};
  public fechaExp?  : string;
  public fechaNacimiento? : string;
  public idtercero? : string;
  public ciudadNacimiento?  : {value:number, label:string};
  public nacionalidad?  : string;
  public genero?  : {value:number, label:string};
  public estadoCivil? : {value:number, label:string};
  public factorrh?  : string;
  public numeroDeHijos? : string;
  public lateralidad? : string;
  public nivelEducativo?  : string;
  public profesion? : string;
  public estratoSocioEconomico? : {value:number, label:string};
  public vivienda?  : string;
  public vehiculo?  : string;
  public tallaCamisa? : string;
  public tallaPantalon? : string;
  public tallaCalzado?  : string;


  constructor() {
    this.nombreCompleto = '';
    this.segundoNombre = '';
    this.segundoApellido = '';
    this.tipoDocumento = {value:null, label:''};
    this.ciudadNacimiento = {value:null, label:''};
    this.ciudadExpedicion = {value:null, label:''};
    this.nacionalidad = '';
    this.estratoSocioEconomico = {value:null, label:''};
    this.genero = {value:null, label:''};
    this.estadoCivil = {value:null, label:''};
  }
}



