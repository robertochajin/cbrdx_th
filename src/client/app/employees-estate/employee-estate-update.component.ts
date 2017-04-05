import 'rxjs/add/operator/switchMap';
import {Component, Input}         from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {EmployeeEstate} from '../_models/employee-estate';
import {SelectItem, Message, ConfirmDialog, ConfirmationService} from 'primeng/primeng';
import {EmployeeEstateService} from '../_services/employee-estate.service';
import {ListEmployeesService}     from '../_services/lists-employees.service';
import {LocationService}     from '../_services/employee-location.service';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'employees-estate',
  templateUrl: 'employee-estate-form.component.html',
  providers: [ConfirmationService]
})

export class EmployeesEstateUpdateComponent {
  @Input()
  employeeEstate: EmployeeEstate = new EmployeeEstate();
  header: string = 'Agregando Inmueble';

  listTypeEstate: SelectItem[] = [];
  listTypeConstruction: SelectItem[] = [];
  listStratum: SelectItem[] = [];
  listClassEstate: SelectItem[] = [];
  listLocalizacion: SelectItem[] = [];
  msgs: Message[] = [];

  constructor(private employeesEstatesService: EmployeeEstateService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
              private confirmationService: ConfirmationService) {

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => this.employeesEstatesService.getById(+params['id']))
      .subscribe(data => {
        this.employeeEstate = data;
      });

    this.listEmployeesService.getlistTypeEstate().subscribe(rest => {
      this.listTypeEstate.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listTypeEstate.push({
          label: dp.nombre,
          value: dp.idListaTipoVivienda
        });
      }
    });

    this.listEmployeesService.getlistClassEstate().subscribe(rest => {
      this.listClassEstate.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listClassEstate.push({
          label: dp.nombre,
          value: dp.idListaClaseVivienda
        });
      }
    });

    this.listEmployeesService.getlistTypeConstruction().subscribe(rest => {
      this.listTypeConstruction.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listTypeConstruction.push({
          label: dp.nombre,
          value: dp.idListaTipoConstruccionVivienda
        });
      }
    });

    this.listEmployeesService.getlistStratum().subscribe(rest => {
      this.listStratum.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listStratum.push({
          label: dp.nombre,
          value: dp.idListaEstrato
        });
      }
    });


  }

  onSubmit(){
    this.employeesEstatesService.update(this.employeeEstate)
      .subscribe(data => {
        this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
        this.location.back();
      }, error => {
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      });
  }

  inputNumber() {
    var anio = this.employeeEstate.anioConstruccion+"";
    if (this.employeeEstate.anioConstruccion != null) {
      this.employeeEstate.anioConstruccion = Number(anio.replace(/[^0-9]/g, ''));
    }
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea salir sin guardar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.router.navigate(['/employees-estate']);
      }
    });
  }

}
