/**
 * Created by Angel on 10/02/2017.
 */
export interface FamilyInformation {
    idFamiliar: number;
    idColaborador: number;
    tipoDeDocumento: any;
    numeroDeDocumento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechadeNacimiento: string;
    parentesco: any;
    correoElectronico: string;
    telefono1: string;
    telefono2: string;
    direccionDeResidencia: string;
    convive: boolean;
    nombreCompleto?:string;
    edad?:number;
}

