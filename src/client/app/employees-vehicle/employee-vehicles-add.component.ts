import 'rxjs/add/operator/switchMap';
import {Component, Input}         from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {EmployeeVehicle} from '../_models/employee-vehicle';
import {SelectItem, Message, ConfirmDialog, ConfirmationService} from 'primeng/primeng';
import {EmployeeVehicleService} from '../_services/employee-vehicles.service';
import {ListEmployeesService}     from '../_services/lists-employees.service';

import {PoliticalDivisionService} from "../_services/political-division.service";
import {DivisionPolitica}         from "../_models/divisionPolitica";
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'employees-vehicle',
  templateUrl: 'employee-vehicles-form.component.html',
  providers: [ConfirmationService]
})

export class EmployeesVehicleAddComponent {
  @Input()
  employeeVehicle: EmployeeVehicle = new EmployeeVehicle();
  header: string = 'Agregando Vehiculo';

  listTypeVehicle: SelectItem[] = [];
  listTypeService: SelectItem[] = [];
  listBrandVehicle: SelectItem[] = [];
  msgs: Message[] = [];
  year: Number;
  anioValid: boolean = false;
  listLocalizacion: SelectItem[] = [];
  idTercero: number;
  ciudadPlaca: string;
  backupCiudadPlaca: string;
  resultCity: DivisionPolitica[];

  constructor(private employeeVehicleService: EmployeeVehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
              private politicalDivisionService: PoliticalDivisionService,
              private confirmationService: ConfirmationService) {

  }

  ngOnInit() {

    let today = new Date();
    let year = today.getFullYear();
    this.year = year;

    this.route.params.subscribe((params: Params) => {
      this.employeeVehicle.idTercero = Number(+params['idTercero']);
      this.idTercero = Number(+params['idTercero']);
    });

    this.listEmployeesService.getlistTypeVehicle().subscribe(rest => {
      this.listTypeVehicle.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listTypeVehicle.push({
          label: dp.nombre,
          value: dp.idListaTipoVehiculo
        });
      }
    });

    this.listEmployeesService.getlistTypeService().subscribe(rest => {
      this.listTypeService.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listTypeService.push({
          label: dp.nombre,
          value: dp.idListaTipoServicioVehiculo
        });
      }
    });

    this.listEmployeesService.getlistBrand().subscribe(rest => {
      this.listBrandVehicle.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listBrandVehicle.push({
          label: dp.nombre,
          value: dp.idListaMarcaVehiculo
        });
      }
    });

  }

  onSubmit() {
    if (this.ciudadPlaca != this.backupCiudadPlaca) {
      this.ciudadPlaca = "";
      this.employeeVehicle.idCiudad =null;
    }
    if (this.ciudadPlaca == this.backupCiudadPlaca) {
      this.employeeVehicleService.add(this.employeeVehicle)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
          this.location.back();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    }
  }

  inputNumber() {
    let modelo = this.employeeVehicle.modelo + "";
    if (this.employeeVehicle.modelo != null) {
      this.employeeVehicle.modelo = Number(modelo.replace(/[^0-9]/g, ''));
    }
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea salir sin guardar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.router.navigate(['/employees-vehicle']);
      }
    });
  }

  searchCity(event: any) {
    this.politicalDivisionService.getAllCities(event.query).subscribe(
      lis => this.resultCity = lis
    );
  }

  captureCity(event: any) {
    this.employeeVehicle.idCiudad = event.idDivisionPolitica;
    this.ciudadPlaca = event.camino;
    this.backupCiudadPlaca = event.camino;
  }

}
