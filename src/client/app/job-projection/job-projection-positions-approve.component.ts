import 'rxjs/add/operator/switchMap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JobProjection } from '../_models/jobProjection';
import { Positions } from '../_models/positions';
import { Constante } from '../_models/constante';
import { Message, ConfirmationService } from 'primeng/primeng';
import { JobProjectionService } from '../_services/jobProjection.service';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'job-projection-positions-approve.component.html',
               selector: 'projections-approve',
               providers: [ ConfirmationService ]
            } )

export class JobProjectionApprobeComponent implements OnInit {
   @Input()
   jobProjection: JobProjection = new JobProjection();
   @Output()
   approve: EventEmitter<JobProjection> = new EventEmitter<JobProjection>();
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();
   positions: Positions = new Positions();
   constante: Constante = new Constante();
   header = 'Editando Proyección';
   msgs: Message[] = [];
   year: Number;
   aprobacion: boolean;

   constructor( private jobProjectionService: JobProjectionService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.jobProjectionService.getPositionsById( this.jobProjection.idCargo ).subscribe( rest => {
         this.positions = rest;
      } );
   }

   onCreate() {
      if ( this.aprobacion === true ) {
         this.jobProjection.idEstadoProyeccion = 2;
         this.jobProjection.estadoProyeccion = 'Aprobada';
      } else {
         this.jobProjection.idEstadoProyeccion = 3;
         this.jobProjection.estadoProyeccion = 'No Aprobado';
      }
      this.jobProjectionService.update( this.jobProjection ).subscribe( rest => {
         this.approve.emit( this.jobProjection );
      } );
   }

   goBack(): void {
      this.dismiss.emit( 1 );
   }

}
