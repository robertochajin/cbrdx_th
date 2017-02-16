/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from './employees.service';
import { Employee } from './employees';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

export class constructorEmployee implements Employee {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?, public tipoDocumento?, public Avatar?, public ciudadExpedicion?, public fechaExp?, public fechaNacimiento?, public idtercero?, public ciudadNacimiento?, public nacionalidad?, public genero?, public estadoCivil?, public factorrh?, public numeroDeHijos?, public lateralidad?, public nivelEducativo?, public profesion?, public estratoSocioEconomico?, public vivienda?, public vehiculo?, public tallaCamisa?, public tallaPantalon?, public tallaCalzado?, public fechaDeste?) {}
}


@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees-form.component.html',
})

export class EmployeesAddComponent {
    @Input()
    employee: Employee = new constructorEmployee();
    const header = 'Agregando Colaborador';

    constructor(
        private employeeService: EmployeesService,
        private router: Router,
        private location: Location
    ) {}

    save() {

        this.employeeService.add(this.employee)
            .subscribe(
                data => {
                    this.router.navigate(['/employees']);
                    //this.location.back();
                },
                error => {
                });
    }

    goBack(): void {
        this.router.navigate(['/employees']);
        //this.location.back();
    }
}