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
  nombreListaParentezco: any;
  idParentezco: number;
  idFamiliar: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  correoElectronico: string;
  direccion: string;
  indicadorHabilitado: number;

  nombreCompleto:string;
  edad: string;

  constructor() {
  }
}
