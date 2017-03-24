import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employees/employees';
import { LocationService } from '../_services/employee-location.service';
import { EmployeesLocation } from './employee-location';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  templateUrl: 'employee-location.component.html',
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
    this.locationService.getAllByEmployee(this.colaborador.idTercero).subscribe(
      employeesLocations => this.employeesLocations = employeesLocations
    );
  }

  del(f: any) {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea eliminar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        let tercero: any = {
          idTercero: this.colaborador.idTercero,
          auditoriaFecha: '',
          auditoriaUsuario: 1,
          indicadorHabilitado: false,
          idLocalizacion: f.idLocalizacion,
          localizacion: f.localizacion
        };

        tercero.localizacion.indicadorHabilitado = false;

        this.locationService.update(tercero).subscribe(
          data => {
            this.employeesLocations.splice(this.employeesLocations.indexOf(f), 1);
          });
      }, reject: () => { }
    });
  }

  detail(l: any) {
    this.router.navigate(['employees-location/detail/' + l.localizacion.idUbicacion]);
  }

  add() {
    this.router.navigate(['employees-location/add/' + this.colaborador.idTercero]);
  }

  update(l: any) {
    this.router.navigate(['employees-location/update/' + l.localizacion.idUbicacion + '/' + this.colaborador.idTercero + '/' + l.idTerceroLocalizacion]);
  }
}
