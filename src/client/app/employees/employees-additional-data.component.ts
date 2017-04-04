import 'rxjs/add/operator/switchMap';
import {Component, Input}         from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {Employee}                 from '../_models/employees';
import {SelectItem, Message, ConfirmDialog, ConfirmationService} from 'primeng/primeng';
import {Search}                    from "../_models/search";
import {EmployeesService}         from '../_services/employees.service';
import {ListEmployeesService}     from '../_services/lists-employees.service';
import {PoliticalDivisionService} from "../_services/political-division.service";
import {TiposPersonas}            from '../_models/tiposPersonas';
import {DivisionPolitica}         from "../_models/divisionPolitica";
import {NavService}               from '../_services/_nav.service';

import {Ocupaciones} from "../_models/ocupaciones";
import {OcupacionesService}         from "../_services/ocupaciones.service";

import {ActividadEconomica} from "../_models/actividadEconomica";
import {ActividadEconomicaService}  from "../_services/actividadEconomica.service";
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'employees',
  templateUrl: 'employees-additional-data.component.html',
  providers: [ConfirmationService]
})

export class EmployeesAdditionalDataComponent {
  @Input()
  employee: Employee = new Employee();
  header: string = 'Datos Adicionales ';

  personTypes: SelectItem[] = [];
  documentTypes: SelectItem[] = [];
  resultExpeditionCity: DivisionPolitica[];
  resultBirthPlace: DivisionPolitica[] = [];

  lateralityTypes: SelectItem[] = [];
  listSizeShirt: SelectItem[] = [];
  listSizePants: SelectItem[] = [];
  listSizeFootwear: SelectItem[] = [];

  msgs: Message[] = [];


  idTipoTercero: number;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
              private politicalDivisionService: PoliticalDivisionService,
              private actividadEconomicaService: ActividadEconomicaService,
              private ocupacionesService: OcupacionesService,
              private confirmationService: ConfirmationService,
              private _nav: NavService) {

    this.listEmployeesService.getLateralityTypes().subscribe(rest => {
      this.lateralityTypes.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.lateralityTypes.push({
          label: dp.nombre,
          value: dp.idListaLateralidad
        });
      }
    });
    this.listEmployeesService.getlistSizeShirt().subscribe(rest => {
      this.listSizeShirt.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizeShirt.push({
          label: dp.nombre,
          value: dp.idListaTalla
        });
      }
    });
    this.listEmployeesService.getlistSizeFootwear().subscribe(rest => {
      this.listSizeFootwear.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizeFootwear.push({
          label: dp.nombre,
          value: dp.idListaTalla
        });
      }
    });
    this.listEmployeesService.getlistSizePants().subscribe(rest => {
      this.listSizePants.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizePants.push({
          label: dp.nombre,
          value: dp.idListaTalla
        });
      }
    });

  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.employeesService.get(+params['id']))
      .subscribe(employee => {
        this.employee = employee;
      });

  }

  onSubmit() {
    this.msgs = [];
    this.employee.idTipoTercero = this.idTipoTercero;
    this.employeesService.update(this.employee)
      .subscribe(data => {
        this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
        //this.router.navigate(['/employees']);
        this.location.back();
      }, error => {
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      });

  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea salir sin guardar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._nav.setTab(0);
        this.location.back();
      }
    });
  }

  getimc(): void {
    if (this.employee.peso != '' && this.employee.talla != '') {
      if (!isNaN(this.employee.peso) && !isNaN(this.employee.talla)) {
        var imc = (this.employee.peso / Math.pow((this.employee.talla / 100), 2));
        this.employee.imc = imc.toFixed(2);
      }
    }
  }

  inputNumberPeso() {
    var peso = this.employee.peso+"";
    if (this.employee.peso != null) {
       this.employee.peso = peso.replace(/[^0-9]/g, '');
    }
  }

  inputNumber() {
    var size = this.employee.talla+"";
    if (this.employee.talla != null) {
      this.employee.talla = size.replace(/[^0-9]/g, '');
    }
  }

}
