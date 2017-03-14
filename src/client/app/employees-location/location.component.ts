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
    this.locationService.getAllByEmployee(this.colaborador.idTercero).subscribe(
      employeesLocations => this.employeesLocations = employeesLocations
    );
  }

  delete(l: EmployeesLocation) {
    this.locationService.delete(l);
    this.employeesLocations.splice(this.employeesLocations.indexOf(l), 1);
    l = null;
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
            alert("Se eliminó exitosamente el registro");
          });
        this.dialogObjet = null;
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
    this.router.navigate(['employees-location/update/' + l.localizacion.idUbicacion + '/' + this.colaborador.idTercero]);
  }
}
