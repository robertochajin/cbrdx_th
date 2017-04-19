import {Component} from '@angular/core';
import {JobProjection} from '../_models/jobProjection';
import {JobProjectionService} from '../_services/jobProjection.service';
import {Router} from '@angular/router';
import {ConfirmationService, Message, SelectItem} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'job-projection.component.html',
   selector: 'projection',
   providers: [ConfirmationService]
})

export class JobProjectionComponent {

   JobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[]=[];
   ListaTiposAreas: SelectItem[]= [];
   ListaAreas: SelectItem[]= [];
   dialogObjet: JobProjection = new JobProjection();
   msgs: Message[] = [];


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

      this.jobProjectionService.getLisTypeStructure().subscribe(rest => {
         this.ListaTiposAreas.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaTiposAreas.push({
               label: dp.estructuraArea,
               value: dp.idEstructuraArea
            });
         }
      });


   }
   changeTypeArea(){
   this.ListaAreas=[];
      this.jobProjectionService.getLisStructure().subscribe(rest => {
         this.ListaAreas.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaAreas.push({
               label: dp.nombre,
               value: dp.idEstructuraOrganizacional
            });
         }
      });
   }
   changeArea(){

   }


}
