/**
 * Created by TracesMaker on 07/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees';
import 'rxjs/add/operator/switchMap';


export class constructorEmployee implements Employee {
  constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?, public tipoDocumento?, public Avatar?, public ciudadExpedicion?, public fechaExp?, public fechaNacimiento?, public idtercero?, public ciudadNacimiento?, public nacionalidad?, public genero?, public estadoCivil?, public factorrh?, public numeroDeHijos?, public lateralidad?, public nivelEducativo?, public profesion?, public estratoSocioEconomico?, public vivienda?, public vehiculo?, public tallaCamisa?, public tallaPantalon?, public tallaCalzado?, public fechaDeste?) {}
}

@Component({
    moduleId: module.id,
    selector: 'employee',
    templateUrl: 'employees-detail.component.html'
})


export class EmployeesDetailComponent implements OnInit   {
    @Input()

    employee: Employee = new constructorEmployee();

    constructor(
        private employeeService: EmployeesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        var este$ = this.route.params
            .switchMap((params: Params) => this.employeeService.get(+params['id']));
        este$.subscribe(employee => this.employee = employee);
    }

    goBack(): void {
        this.location.back();
    }
}

