/**
 * Created by Angel on 10/02/2017.
 */
export interface FamilyInformation {
    idFamiliar: number;
    idColaborador: number;
    tipoDeDocumento: number;
    numeroDeDocumento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechadeNacimiento: string;
    parentesco?: number;
    correoElectronico?: string;
    telefono1?: string;
    telefono2?: string;
    direccionDeResidencia?: string;
    convive?: number;
}

