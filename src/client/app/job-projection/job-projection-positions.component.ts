import {Component} from '@angular/core';
import {JobProjection} from '../_models/jobProjection';
import {JobProjectionService} from '../_services/jobProjection.service';
import {Router} from '@angular/router';
import {ConfirmationService, Message, SelectItem} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'job-projection-positions.component.html',
   selector: 'projection',
   providers: [ConfirmationService]
})

export class JobProjectionPositionsComponent {

   JobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[] = [];
   ListaEstados: SelectItem[] = [];
   dialogObjet: JobProjection = new JobProjection();
   msgs: Message[] = [];
   demo: string="demo";

   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.jobProjectionService.getAll().subscribe(
         projection => {
            this.ListJobProjection = projection;
         }
      );

      this.jobProjectionService.getListEstados().subscribe(rest => {
         this.ListaEstados.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaEstados.push({
               label: dp.nombre,
               value: dp.idListaEstadoCargo
            });
         }
      });

   }
}
