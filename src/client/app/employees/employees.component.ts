/**
 * Created by TracesMaker on 06/02/2017.
 * Update by Angel on 20/02/2017
 */
import {Component} from '@angular/core';
import {Employee} from './employees';
import {EmployeesService} from './employees.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

class constructorEmployee implements Employee {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?) {
    }
}

@Component({
    moduleId: module.id,
    templateUrl: 'employees.component.html',
    selector: 'employees',
    providers:  [ConfirmationService]
})
export class EmployeesComponent {

    employee: Employee = new constructorEmployee();
    dialogObjet: Employee = new constructorEmployee();

    employees: Employee[];

    constructor(
        private employeesService: EmployeesService,
        private router: Router,
        private confirmationService: ConfirmationService
        ) {
    }

    ngOnInit() {
        this.employeesService.getAll().subscribe(
            employees => this.employees = employees
        );
    }

    delete(employee: Employee) {
        this.dialogObjet = employee;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.employeesService.delete(this.dialogObjet);
                this.employees.splice(this.employees.indexOf(this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: Employee) {
        this.router.navigate(['employees/detail/'+f.idColaborador]);
    }

    add() {
        this.router.navigate(['employees/add']);
    }

    update(c: Employee) {
        this.router.navigate(['employees/update/'+c.idColaborador]);
    }


}
