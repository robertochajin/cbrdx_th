/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';

import {FamilyInformation} from './family-information';


export class constructorFamilyInformation implements FamilyInformation {
    idFamiliar: number;
    idColaborador: number;
    tipoDeDocumento: number;
    numeroDeDocumento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechadeNacimiento: string;
    parentesco: number;
    correoElectronico: string;
    telefono1: string;
    telefono2: string;
    direccionDeResidencia: string;
    convive: number;

    edad: number;
    nombreCompleto:string;
    constructor() {
        this.nombreCompleto = this.primerNombre+' '+this.segundoNombre+' '+this.primerApellido+' '+this.segundoApellido;
        this.edad = 25;
    }
}
