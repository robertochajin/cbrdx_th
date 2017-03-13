import { Injectable } from '@angular/core';

@Injectable()
export class Employee {

  public idTercero : number;
  public numeroDocumento : string;
  public nombreCompleto?  : string;
  public primerNombre  : string;
  public segundoNombre : string;
  public primerApellido  : string;
  public segundoApellido : string;
  public fechaCreacion?  : string;
  public cargoActual? : string;
  public nacionalidad?  : string;
  public Avatar?  : string;
  public fechaDocumento?  : string;
  public fechaNacimiento? : string;
  public idtercero? : string;
  public factorrh?  : string;
  public nroHijos? : number;
  public lateralidad? : string;
  public nivelEducativo  : any;
  public vivienda?  : string;
  public vehiculo?  : string;
  public tallaCamisa? : string;
  public tallaPantalon? : string;
  public tallaCalzado?  : string;
  public profesion? : any;
  /*idEstadoCivil:number,*/
  public estadoCivil? : {
    codigoListaEstadoCivil: string,
    nombreListaEstadoCivil: string,
    indicadoHabilitado: boolean,
    auditoriaUsuario: number,
    auditoriaFecha: string
  };
  public genero  : {
    codigoListaGenero: string,
    nombreListaGenero: string
  };
  public tipoDocumento? : {/*idTipoDocumento:number,*/ nombreListaTipoDocumentos:string};
  public ciudadExpDocumento  : any ;//{/*idDivisionPoliticaPadre:number,*/ descripcionDivisionPolitica:string};
  public ciudadNacimiento  : any ;//{/*idDivisionPoliticaPadre:number,*/ descripcionDivisionPolitica:string};
  public estratoSocioEconomico? : {value:number, label:string};


  constructor() {
    this.nombreCompleto = '';
    this.segundoNombre = '';
    this.segundoApellido = '';
    this.tipoDocumento = {/*idTipoDocumento:null, */nombreListaTipoDocumentos:''};
    //this.ciudadNacimiento = {/*idDivisionPoliticaPadre:null, */descripcionDivisionPolitica:''};
    //this.ciudadExpedicion = {/*idDivisionPoliticaPadre:null, */descripcionDivisionPolitica:''};
    this.nacionalidad = '';
    this.estratoSocioEconomico = {value:null, label:''};
    this.genero = {
      codigoListaGenero: '',
      nombreListaGenero: ''
    };
    /*this.genero = {
      codigoListaGenero: '',
      indicadoHabilitado: false,
      auditoriaUsuario: null,
      auditoriaFecha: ''
    };*/
    this.estadoCivil = {
      codigoListaEstadoCivil: '',
      nombreListaEstadoCivil: '',
      indicadoHabilitado: false,
      auditoriaUsuario: null,
      auditoriaFecha: ''
    };
  }
}



