import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { JobProjection } from '../_models/jobProjection';
import { JobProjectionService } from '../_services/jobProjection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'job-projection-positions-detail.component.html',
               selector: 'projections-detail'
            } )
export class JobProjectionDetailComponent {

   @Input()
   jobProjection: JobProjection;

   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private jobProjectionService: JobProjectionService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location, ) {
   }

   goBack(): void {
      this.dismiss.emit( 1 );
   }
}
