import 'rxjs/add/operator/switchMap';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
               templateUrl: 'job-projection-positions-form.component.html',
               selector: 'projections-update',
               providers: [ ConfirmationService ]
            } )

export class JobProjectionUpdateComponent {
   @Input()
   jobProjection: JobProjection = new JobProjection();
   @Output()
   update: EventEmitter<JobProjection> = new EventEmitter<JobProjection>();
   positions: Positions = new Positions();
   constante: Constante = new Constante();
   header: string = 'Editando Proyección';
   msgs: Message[] = [];
   year: Number;
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private jobProjectionService: JobProjectionService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {
      this.jobProjection;
   }

   ngOnInit() {
      this.jobProjectionService.getConstantes().subscribe( rest => {
         for ( let c of rest ) {
            if ( c.constante === "AUMSUE" ) {
               this.constante = c;
               break;
            }
         }
      } );
      this.jobProjectionService.getPositionsById( this.jobProjection.idCargo ).subscribe( rest => {
         this.positions = rest;
         this.jobProjection.cargo = rest.cargo;
      } );

   }

   calculate() {
      let salario = ((this.jobProjection.plazasProyectadas * this.positions.salario) * (Number(
            this.constante.valor ) / 100)) + (this.jobProjection.plazasProyectadas * this.positions.salario);
      this.jobProjection.costoProyectado = salario;
   }

   onCreate() {
      this.jobProjection.idEstadoProyeccion = 4;
      this.jobProjection.estadoProyeccion = "Pendiente Por Aprobar";
      this.jobProjectionService.update( this.jobProjection ).subscribe( rest => {
         this.update.emit( this.jobProjection );
      } );

   }

   goBack(): void {
      this.dismiss.emit( 1 );
   }

   inputNumber() {
      let plazas = this.jobProjection.plazasProyectadas + "";
      if ( this.jobProjection.plazasProyectadas !== null ) {
         this.jobProjection.plazasProyectadas = Number( plazas.replace( /[^0-9]/g, '' ) );
      }
   }
}
