import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesService }         from './employees.service';
import { Employee }                 from './employees';


@Component({
    moduleId: module.id,
    selector: 'employee',
    templateUrl: 'employees-detail.component.html'
})


export class EmployeesDetailComponent implements OnInit   {
    @Input()

    employee: Employee = new Employee();

    constructor(
        private employeeService: EmployeesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        var este$ = this.route.params
            .switchMap((params: Params) => this.employeeService.get(+params['id']));
        este$.subscribe(employee => {
          this.employee = employee;
          this.employee.nombreCompleto = this.employee.primerNombre+' '+this.employee.segundoNombre+' '+this.employee.primerApellido+' '+this.employee.segundoApellido;
          });

    }

    goBack(): void {
        this.location.back();
    }
}

