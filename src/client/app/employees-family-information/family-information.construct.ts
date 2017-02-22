/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';

import {FamilyInformation} from './family-information';


export class constructorFamilyInformation implements FamilyInformation {
    idFamiliar: number;
    idColaborador: number;
    tipoDeDocumento: number;
    numeroDeDocumento: any;
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
    convive: number;
    edad: number;
    nombreCompleto:string;
    constructor() {
    }
}
