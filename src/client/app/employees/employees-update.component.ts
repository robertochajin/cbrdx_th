import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Employee } from '../_models/employees';
import { EmployeesService} from '../_services/employees.service';


@Component({
    moduleId: module.id,
    selector: 'employees',
    template: 'employees-form.component.html',
})

export class EmployeesUpdateComponent implements OnInit{
    employee: Employee;
    header: string = 'Editando Colaborador';

    constructor(
        private employeesService: EmployeesService,
        private route: ActivatedRoute,
        private router: Router

) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.employeesService.get(+params['id']))
            .subscribe(employee => this.employee = employee);
    }

    save() {

        this.employeesService.update(this.employee)
            .subscribe(
                data => {
                    this.router.navigate(['/employees']);
                },
                error => {
                });
    }
    goBack(): void {
        this.router.navigate(['/employees']);
    }

}


