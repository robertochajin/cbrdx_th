/**
 * Created by TracesMaker on 06/02/2017.
 */
import {Component} from '@angular/core';
import {Employee} from './employees';
import {EmployeesService} from './employees.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

class constructorEmployee implements Employee {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?) {
    }
}

@Component({
    moduleId: module.id,
    templateUrl: 'employees.component.html',
    selector: 'employees'
})
export class EmployeesComponent {

    employee: Employee = new constructorEmployee();

    employees: Employee[];

    constructor(private employeesService: EmployeesService, private router: Router) {
    }

    ngOnInit() {
        this.employeesService.getAll().subscribe(
            employees => this.employees = employees
        );
    }

    delete(employee: Employee) {
        this.employeesService.delete(employee);
        this.employees.splice(this.employees.indexOf(employee), 1);
        employee = null;
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
