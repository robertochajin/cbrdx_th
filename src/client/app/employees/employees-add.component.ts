import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from './employees.service';
import { Employee } from './employees';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees-form.component.html',
})

export class EmployeesAddComponent {
    @Input()
    employee: Employee = new Employee();
    header: string = 'Agregando Colaborador';

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
