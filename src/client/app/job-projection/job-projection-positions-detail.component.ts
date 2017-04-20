/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */
import {Component} from "@angular/core";
import {Location} from '@angular/common';
import {JobProjection} from '../_models/jobProjection';
import {JobProjectionService} from '../_services/jobProjection.service';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
   moduleId: module.id,
   templateUrl: 'job-projection-positions-detail.component.html',
   selector: 'projection'
})
export class JobProjectionDetailComponent {

   jobProjection: JobProjection = new JobProjection();
   constructor(
      private jobProjectionService: JobProjectionService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
   ) {
      route.params.switchMap((params: Params) => jobProjectionService.getById(+params['id']))
         .subscribe(data => {
            this.jobProjection= data;
            this.jobProjectionService.getPositionsById(data.idCargo).subscribe(res=>{
               this.jobProjection.cargo=res.cargo;
            });
         });
   }

   goBack(): void {
      this.location.back();
   }
}
