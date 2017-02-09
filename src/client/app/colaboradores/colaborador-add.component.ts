/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColaboradoresService } from './colaboradoresservice';
import { Colaborador } from './colaboradores';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {date} from "gulp-util";
import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";

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
    model: any = {};

    constructor(
        private colaboradorService: ColaboradoresService,
        private router: Router
    ) {}

    addColaborador() {
        /*this.colaboradorService.addColaborador(this.colaborador);
        this.location.back();*/

        this.colaboradorService.addColaborador(this.colaborador)
            .subscribe(
                data => {
                    this.router.navigate(['/colaboradores']);
                },
                error => {
                });
    }

    goBack(): void {
        this.router.navigate(['/colaboradores']);
    }
}