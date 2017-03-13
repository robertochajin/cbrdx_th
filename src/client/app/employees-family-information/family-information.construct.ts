import { FamilyInformation } from './family-information';
import * as moment from 'moment/moment';

export class ConstructorFamilyInformation implements FamilyInformation {
  idTerceroFamiliar: number;
  idTercero: number;
  idTipoDocumento: number;
  nombreListaTipoDocumento: string;
  telefonoFijo: string;
  telefonoCelular: string;
  numeroDocumento: string;
  idConvivencia: boolean;
  nombreListaParentesco: any;
  idParentesco: number;
  idFamiliar: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  correoElectronico: string;
  direccion: string;

  nombreCompleto:string;
  edad: string;

  constructor() {
    this.nombreCompleto =  this.primerNombre +' '+
                            this.segundoNombre +' '+
                            this.primerApellido +' '+
                            this.segundoApellido;
    this.edad = moment(this.fechaNacimiento,'YYYY-MM-DD').toNow(true).toString();
  }
}
