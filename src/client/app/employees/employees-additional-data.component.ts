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
import {ListaItem} from "../_models/listaItem";
import {ListaService} from "../_services/lista.service";

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
              private listaService: ListaService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private listEmployeesService: ListEmployeesService,
              private _nav: NavService) {

     this.listaService.getMasterDetails('ListasLateralidades').subscribe(res => {
        this.lateralityTypes.push({label: 'Seleccione', value: null});
        res.map((s: ListaItem) => {
           this.lateralityTypes.push({label: s.nombre, value: s.idLista});
        });
     });
     this.listaService.getMasterDetailsStartsByCode('ListasTallas','CAM').subscribe(rest => {
      this.listSizeShirt.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizeShirt.push({
          label: dp.nombre,
          value: dp.idLista
        });
      }
    });
     this.listaService.getMasterDetailsStartsByCode('ListasTallas','ZAPA').subscribe(rest => {
      this.listSizeFootwear.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizeFootwear.push({
          label: dp.nombre,
          value: dp.idLista
        });
      }
    });
    
    

  }

  ngOnInit() {
    let tipo = this.employee.genero == "Masculino" ? "PANH":"PANM"
     this.listaService.getMasterDetailsStartsByCode('ListasTallas',tipo).subscribe(rest => {
      this.listSizePants.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listSizePants.push({
          label: dp.nombre,
          value: dp.idLista
        });
      }
    });
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
    let peso = this.employee.peso+"";
    if (this.employee.peso != null) {
       if(peso==="0" ||peso===""){peso="1"}
       this.employee.peso = Number(peso.replace(/[^0-9]/g, ''));
    }
  }

  inputNumber() {
    let size = this.employee.talla+"";
    if (this.employee.talla != null) {
       if(size==="0"||size===""){size="1"}
      this.employee.talla = Number(size.replace(/[^0-9]/g, ''));
    }
  }

}
