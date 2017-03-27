import { Injectable } from '@angular/core';

@Injectable()
export class Employee {

  public idTercero : number;
  public idNaturaleza : number;
  public naturaleza? : string;
  public idTipoDocumento : number;
  public tipoDocumento? : string;
  public numeroDocumento : string;

  public primerNombre  : string;
  public segundoNombre : string;
  public primerApellido  : string;
  public segundoApellido : string;
  public nombreCompleto?  : string;

  public fechaCreacion?  : string;
  public cargoActual? : string;
  public nacionalidad?  : string;
  public Avatar?  : string;
  public fechaDocumento?  : string;
  public fechaNacimiento? : string;
  public idtercero? : string;
  public factorrh?  : any;
  public nroHijos? : number;
  public lateralidad? : any;
  public nivelEducacion : any;
  public vivienda?  : string;
  public vehiculo?  : string;
  public tallaCamisa? : string;
  public tallaPantalon? : string;
  public tallaCalzado?  : string;
  public profesion? : any;
  /*idEstadoCivil:number,*/
  public estadoCivil? : any;
  public genero  : any;
  public ciudadExpDocumento  : any ;//{/*idDivisionPoliticaPadre:number,*/ descripcionDivisionPolitica:string};
  public ciudadNacimiento  : any ;//{/*idDivisionPoliticaPadre:number,*/ descripcionDivisionPolitica:string};
  public estratoSocioEconomico? : {value:number, label:string};


  constructor() {
    this.nombreCompleto = '';
    this.segundoNombre = '';
    this.segundoApellido = '';
    //this.ciudadNacimiento = {/*idDivisionPoliticaPadre:null, */descripcionDivisionPolitica:''};
    //this.ciudadExpedicion = {/*idDivisionPoliticaPadre:null, */descripcionDivisionPolitica:''};
    this.nacionalidad = '';
    this.cargoActual = '';
    this.estratoSocioEconomico = {value:null, label:''};
    this.genero = '';
    this.factorrh = '';
  }
}



