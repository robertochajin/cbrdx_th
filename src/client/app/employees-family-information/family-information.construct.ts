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
  convive: boolean;
  parentesco: any;

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
    this.edad = moment(this.fechaNacimiento,'MM/DD/YYYY').toNow(true).toString();
  }
}
