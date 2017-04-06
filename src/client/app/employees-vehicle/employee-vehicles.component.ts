import {Component,Input} from '@angular/core';
import {EmployeeVehicle} from '../_models/employee-vehicle';
import {EmployeeVehicleService} from '../_services/employee-vehicles.service';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import { Employee } from '../_models/employees';

@Component({
  moduleId: module.id,
  templateUrl: 'employee-vehicles.component.html',
  selector: 'employees-vehicle',
  providers:  [ConfirmationService]
})
export class EmployeesVehicleComponent {
  @Input() employee:Employee;
  employeeVehicle: EmployeeVehicle = new EmployeeVehicle();
  dialogObjet: EmployeeVehicle = new EmployeeVehicle();

  employeesVehicle: EmployeeVehicle[];

  constructor(
    private employeesVehicleService: EmployeeVehicleService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    // this.employee.idTercero=179;
  }

  ngOnInit() {

    this.employeesVehicleService.getAll().subscribe(
      employeesVehicle => {
        this.employeesVehicle = employeesVehicle;

      }
    );

  }

  del(employeeVehicle: EmployeeVehicle) {
    this.dialogObjet = employeeVehicle;
    this.confirmationService.confirm({
      message: `¿Esta seguro que lo desea eliminar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.employeesVehicleService.delete(this.dialogObjet);
        this.employeesVehicle.splice(this.employeesVehicle.indexOf(this.dialogObjet), 1);
        this.dialogObjet = null;
      },
      reject: () => {
        this.dialogObjet = null;
      }
    });
  }

  detail(f: EmployeeVehicle) {
    this.router.navigate(['employees-vehicle/detail/'+f.idTerceroVehiculo]);
  }

  update(c: EmployeeVehicle) {
    this.router.navigate(['employees-vehicle/update/'+c.idTerceroVehiculo]);
  }
  add() {
    //this.router.navigate(['employees-estate/add/'+this.employee.idTercero]);
    this.router.navigate(['employees-vehicle/add/'+11 ]);
  }
}
