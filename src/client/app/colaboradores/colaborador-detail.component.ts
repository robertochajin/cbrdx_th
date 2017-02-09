/**
 * Created by TracesMaker on 07/02/2017.
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
    selector: 'colaborador-detail',
    templateUrl: './colaborador-detail.component.html'
})


export class ColaboradorDetailComponent implements OnInit   {
    @Input()

    colaborador: Colaborador = new PrimeColaborador();

    constructor(
        private colaboradorService: ColaboradoresService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        var este$ = this.route.params
            .switchMap((params: Params) => this.colaboradorService.getColaborador(+params['id']));
        este$.subscribe(colaborador => this.colaborador = colaborador);
    }

    goBack(): void {
        this.location.back();
    }
}

