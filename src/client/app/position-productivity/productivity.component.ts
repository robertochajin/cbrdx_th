import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ProductivityService} from '../_services/productivity.service';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {Productivity} from '../_models/productivity';
import {Location}                 from '@angular/common';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import { Positions } from "../_models/positions";
@Component({
  moduleId: module.id,
  templateUrl: 'productivity.component.html',
  selector: 'productivity',
  providers: [ConfirmationService]
})
export class ProductivityComponent {
   @Input()
   position: Positions;
  productivity: Productivity = new Productivity();
  ListProductivity: SelectItem[] = [];
  ListIQLevel: SelectItem[] = [];
  ListAptitudeLevel: SelectItem[] = [];
  header: string = 'Productividad';
  msgs: Message[] = [];
   
   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();
   
  constructor(private productivityService: ProductivityService,
              private location: Location,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
     this.productivity.idCargo = this.position.idCargo;

    this.productivityService.getlistProductivityByIdCargo(this.productivity.idCargo).subscribe(rest=>{
      if(rest!==undefined){
        this.productivity= rest;
      }
    });
    this.productivityService.getlistProductivity().subscribe(rest => {
      this.ListProductivity.push({label: "Seleccione", value: null});
      this.ListIQLevel.push({label: "Seleccione", value: null});
      this.ListAptitudeLevel.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.ListProductivity.push({
          label: dp.productividad,
          value: dp.idProductividad
        });
        this.ListIQLevel.push({
          label: dp.minimoIq + " - " + dp.maximoIq,
          value: dp.idProductividad
        });
        this.ListAptitudeLevel.push({
          label: dp.minimoAptitud + " - " + dp.maximoAptitud,
          value: dp.idProductividad
        });
      }
    });
  }

  onSubmit() {
     this.msgs=[];
    if (this.productivity.idCargoProductividad == null) {
      this.productivityService.add(this.productivity)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
          this.next();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    } else {
      this.productivityService.update(this.productivity)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
           this.next();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    }
  }
   next(){
      this.nextStep.emit(12);
   }
}
