import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from './location.service';
import { ConstructorEmployeesLocation } from './employees-location.constructor';
import {ConfirmationService} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'location.component.html',
    selector: 'employees-locations',
    providers:  [ConfirmationService]
})
export class LocationComponent implements OnInit {

    employeesLocations: ConstructorEmployeesLocation[];
    dialogObjet: ConstructorEmployeesLocation = new ConstructorEmployeesLocation();
    constructor(
              private locationService: LocationService,
              private router: Router,
              private confirmationService: ConfirmationService
            ) {}

    ngOnInit() {
        this.locationService.getAll().subscribe(
            employeesLocations => this.employeesLocations = employeesLocations
        );
    }

    delete(l: ConstructorEmployeesLocation) {
        this.locationService.delete(l);
        this.employeesLocations.splice(this.employeesLocations.indexOf(l), 1);
        l = null;
    }
    del(f: ConstructorEmployeesLocation) {
      this.dialogObjet = f;
      this.confirmationService.confirm({
        message: ` ¿Esta seguro que desea eliminar?`,
        header: 'Corfirmación',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.locationService.delete(this.dialogObjet);
          this.employeesLocations.splice(this.employeesLocations.indexOf(this.dialogObjet), 1);
          this.dialogObjet = null;
        },
        reject: () => {

        }
      });
    }

    detail(l: ConstructorEmployeesLocation) {
        this.router.navigate(['employees-location/detail/'+l.idUbicacion]);
    }

    add() {
        this.router.navigate(['employees-location/add']);
    }

    update(l: ConstructorEmployeesLocation) {
        console.log(l);
        this.router.navigate(['employees-location/update/'+l.idUbicacion]);
    }
}
