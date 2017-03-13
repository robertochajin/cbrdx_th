import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employees/employees';
import { LocationService } from './location.service';
import { EmployeesLocation } from './employees-location';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  templateUrl: 'location.component.html',
  selector: 'employees-locations',
  providers: [ConfirmationService]
})
export class LocationComponent implements OnInit {

  @Input() colaborador: any;

  employeesLocations: EmployeesLocation[];
  dialogObjet: EmployeesLocation = new EmployeesLocation();

  constructor(private locationService: LocationService,
    private router: Router,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.locationService.getAllByEmployee(11).subscribe(
      employeesLocations => this.employeesLocations = employeesLocations
    );
  }

  delete(l: EmployeesLocation) {
    this.locationService.delete(l);
    this.employeesLocations.splice(this.employeesLocations.indexOf(l), 1);
    l = null;
  }

  del(f: EmployeesLocation) {
    this.dialogObjet = f;
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea eliminar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.locationService.delete(this.dialogObjet);
        this.employeesLocations.splice(this.employeesLocations.indexOf(this.dialogObjet), 1);
        this.dialogObjet = null;
      }, reject: () => {}
    });
  }

  detail(l: any) {
    this.router.navigate(['employees-location/detail/' + l.localizacion.idUbicacion]);
  }

  add() {
    this.router.navigate(['employees-location/add/' + 11]);
  }

  update(l: any) {
    this.router.navigate(['employees-location/update/' + l.localizacion.idUbicacion]);
  }
}
