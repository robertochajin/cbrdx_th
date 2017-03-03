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

    acordion: any = {
                tab1:true,
                tab2:false,
                tab3:false,
                tab4:false,
                tab5:false,
                tab6:false
              };

    constructor(
        private employeeService: EmployeesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.employeeService.get(+params['id']));
        este$.subscribe(employee => {
          this.employee = employee;
          this.employee.nombreCompleto = this.employee.primerNombre+' '+this.employee.segundoNombre+' '+this.employee.primerApellido+' '+this.employee.segundoApellido;
          });
        //
        // let aco$ = this.route.params
        // .switchMap((params: Params) => {
        //   let tab = params['tab'] ? params['tab'].isNaN ? params['tab'] : 0;
        //       this.acordion.`tab`
        // });
        //  let acordion = this.acordion.subscribe(acordion => this.acordion = acordion)

    }

    goBack(): void {
        this.location.back();
    }

}

