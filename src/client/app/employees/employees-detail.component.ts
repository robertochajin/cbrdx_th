import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesService }         from './employees.service';
import { Employee }                 from './employees';
import {NavService}                 from '../_services/_nav.service';
@Component({
    moduleId: module.id,
    selector: 'employee',
    templateUrl: 'employees-detail.component.html'
})


export class EmployeesDetailComponent implements OnInit   {
    employee: Employee;
    acordion:number;
    constructor(
        private employeeService: EmployeesService,
        private route: ActivatedRoute,
        private location: Location,
        private _nav:NavService
    ) {}

    ngOnInit(): void {
      this.route.params.switchMap((params: Params) => this.employeeService.get(+params['id']))
          .subscribe(employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre+' '+
                                           this.employee.segundoNombre+' '+
                                           this.employee.primerApellido+' '+
                                           this.employee.segundoApellido;

            this.employee.cargoActual = 'FALTA CARGO';
            this.employee.factorrh = 'FALTA FACTOR RH';
            this.employee.nacionalidad = 'FALTA NACIONALIDAD';
            this.employee.lateralidad = 'FALTA LATERALIDAD';
          });

      this.acordion = this._nav.getTab();

    }

    goBack(): void {
        this.location.back();
    }
    onTabShow(e:any) {
      this._nav.setTab(e.index);
      this.acordion = this._nav.getTab();
    }

}

