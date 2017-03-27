import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees-form.component.html',
})

export class EmployeesAddComponent {
    @Input()
    employee: Employee = new Employee();
    header: string = 'Agregando Colaborador';

    personTypes: SelectItem[] = [];
    documentTypes: SelectItem[] = [];
    nationalityTypes: SelectItem[] = [];
    genderTypes: SelectItem[] = [];
    maritalStatusTypes: SelectItem[] = [];
    rhRactorTypes: SelectItem[] = [];
    rhTypes: SelectItem[] = [];
    healthTypes: SelectItem[] = [];
    healthAffiliationTypes: SelectItem[] = [];
    academicLevelTypes: SelectItem[] = [];
    activitiesTypes: SelectItem[] = [];
    activities: SelectItem[] = [];
    sectorTypes: SelectItem[] = [];
    legalStatusTypes: SelectItem[] = [];

    constructor(
        private employeeService: EmployeesService,
        private router: Router,
        private location: Location
    ) {
      this.personTypes.push({label: "Seleccione", value: "seleccione"});

    }

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
