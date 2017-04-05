import "rxjs/add/operator/switchMap";
import {Component, Input} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {Employee} from "../_models/employees";
import {SelectItem, Message} from "primeng/primeng";
import {EmployeesService} from "../_services/employees.service";
import {ListEmployeesService} from "../_services/lists-employees.service";
import {DivisionPolitica} from "../_models/divisionPolitica";
import {NavService} from "../_services/_nav.service";

@Component({
  moduleId: module.id,
  selector: 'employees-additional-data',
  templateUrl: 'employees-additional-data.component.html',
  providers: []
})

export class EmployeesAdditionalDataComponent {
  @Input() employee:Employee;
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

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
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
   
  }

  onSubmit() {
    this.msgs = [];
    this.employeesService.update(this.employee)
      .subscribe(data => {
        this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
      }, error => {
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      });

  }

  getimc(): void {
    if (this.employee.peso != null && this.employee.talla != null) {
      if (!isNaN(this.employee.peso) && !isNaN(this.employee.talla)) {
        var imc = (this.employee.peso / Math.pow((this.employee.talla / 100), 2));
        this.employee.imc = Number(imc.toFixed(2));
      }
    }
  }

  inputNumberPeso() {
    var peso = this.employee.peso+"";
    if (this.employee.peso != null) {
       this.employee.peso = Number(peso.replace(/[^0-9]/g, ''));
    }
  }

  inputNumber() {
    var size = this.employee.talla+"";
    if (this.employee.talla != null) {
      this.employee.talla = Number(size.replace(/[^0-9]/g, ''));
    }
  }

}
