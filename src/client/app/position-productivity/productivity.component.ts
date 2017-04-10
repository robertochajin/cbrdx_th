import {Component} from '@angular/core';
import {ProductivityService} from '../_services/productivity.service';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {Productivity} from '../_models/productivity';
import {Location}                 from '@angular/common';
import {Router, ActivatedRoute, Params}   from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'productivity.component.html',
  selector: 'productivity',
  providers: [ConfirmationService]
})
export class ProductivityComponent {

  productivity: Productivity = new Productivity();
  ListProductivity: SelectItem[] = [];
  ListIQLevel: SelectItem[] = [];
  ListAptitudeLevel: SelectItem[] = [];
  header: string = 'Productividad';
  msgs: Message[] = [];

  constructor(private productivityService: ProductivityService,
              private location: Location,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productivity.idCargo = Number(+params['idCargo']);
    });

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
    if (this.productivity.idCargoProductividad == null) {
      this.productivityService.add(this.productivity)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
          this.location.back();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    } else {
      this.productivityService.update(this.productivity)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
          this.location.back();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    }
  }
}
