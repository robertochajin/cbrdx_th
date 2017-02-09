/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ColaboradoresService } from './colaboradoresservice';
import { Colaborador } from './colaboradores';
import 'rxjs/add/operator/switchMap';

export class PrimeColaborador implements Colaborador {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?, public tipoDocumento?, public Avatar?, public ciudadExpedicion?, public fechaExp?, public fechaNacimiento?, public idtercero?, public ciudadNacimiento?, public nacionalidad?, public genero?, public estadoCivil?, public factorrh?, public numeroDeHijos?, public lateralidad?, public nivelEducativo?, public profesion?, public estratoSocioEconomico?, public vivienda?, public vehiculo?, public tallaCamisa?, public tallaPantalon?, public tallaCalzado?, public fechaDeste?) {}
}


@Component({
    moduleId: module.id,
    selector: 'colaborador-add',
    templateUrl: './colaborador-add.component.html',
    //styleUrls: ['./colaborador-detail.component.css']
})

export class ColaboradorAddComponent {
    @Input()
    colaborador: Colaborador = new PrimeColaborador();

    constructor(
        private colaboradorService: ColaboradoresService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    addColaborador(): void {
        this.colaboradorService.addColaborador(this.colaborador);
    }

    goBack(): void {
        this.location.back();
    }
}