import {Component} from '@angular/core';
import {Employee} from './employees';
import {EmployeesService} from './employees.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'employees.component.html',
    selector: 'employees',
    providers:  [ConfirmationService]
})
export class EmployeesComponent {

    employee: Employee = new Employee();
    dialogObjet: Employee = new Employee();

    employees: Employee[];

    constructor(
        private employeesService: EmployeesService,
        private router: Router,
        private confirmationService: ConfirmationService
        ) {
    }

    ngOnInit() {
        this.employeesService.getAll().subscribe(
            employees => {
              this.employees = employees;
              this.employees.forEach(function(obj, index){
                obj.nombreCompleto = obj.primerNombre+' '+obj.segundoNombre+' '+obj.primerApellido+' '+obj.segundoApellido;
              });
            }
        );
    }

    del(employee: Employee) {
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
