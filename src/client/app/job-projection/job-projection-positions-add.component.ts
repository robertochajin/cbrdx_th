import 'rxjs/add/operator/switchMap';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JobProjection } from '../_models/jobProjection';
import { Positions } from '../_models/positions';
import { Constante } from '../_models/constante';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { JobProjectionService } from '../_services/jobProjection.service';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'job-projection-positions-add.component.html',
               selector: 'projections',
               providers: [ ConfirmationService ]
            } )

export class JobProjectionAddComponent {
   jobProjectionAdd: JobProjection;
   @Input()
   id: number;
   @Input()
   anio: number;
   ListJobProjection: JobProjection[];
   positions: Positions = new Positions();
   ListPositions: SelectItem[] = [];
   constante: Constante = new Constante();
   header: string = 'Editando Proyección';
   msgs: Message[] = [];
   year: Number;
   @Output()
   create: EventEmitter<JobProjection> = new EventEmitter<JobProjection>();

   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private jobProjectionService: JobProjectionService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.jobProjectionAdd = new JobProjection();
      this.jobProjectionService.getListJobProjctionByArea( this.id ).subscribe( rest => {
         this.ListJobProjection = rest;
         this.jobProjectionAdd.observacion = null;
         this.jobProjectionAdd.idEstructuraOrganizacional = this.id;
         this.jobProjectionAdd.anio = this.anio;
         this.jobProjectionAdd.costoProyectado = null;
         this.jobProjectionAdd.plazasProyectadas = null;
         this.jobProjectionService.getPositions().subscribe( rest => {
            this.ListPositions.push( { label: "Seleccione", value: null } );
            for ( let dp of rest ) {
               let bandera = false;
               for ( let r of this.ListJobProjection ) {
                  if ( dp.idCargo === r.idCargo ) {
                     bandera = true;
                     break;
                  }
               }
               if ( !bandera ) {
                  this.ListPositions.push( {
                                              label: dp.cargo,
                                              value: dp.idCargo
                                           } );
               }

            }
         } );
      } );

      this.jobProjectionService.getConstantes().subscribe( rest => {
         for ( let c of rest ) {
            if ( c.constante === "AUMSUE" ) {
               this.constante = c;
               break;
            }
         }
      } );
      this.jobProjectionAdd.plazasActuales = 0;
      this.jobProjectionAdd.costoActual = 0;
   }

   changePosition() {
      this.jobProjectionService.getPositionsById( this.jobProjectionAdd.idCargo ).subscribe( rest => {
         this.positions = rest;
      } );
      this.jobProjectionAdd.plazasProyectadas = null;
      this.jobProjectionAdd.costoProyectado = null;

   }

   calculate() {
      let salario = ((this.jobProjectionAdd.plazasProyectadas * this.positions.salario) * (Number(
            this.constante.valor ) / 100)) + (this.jobProjectionAdd.plazasProyectadas * this.positions.salario);
      this.jobProjectionAdd.costoProyectado = salario;
   }

   createProjection() {

      this.jobProjectionAdd.idProyecccionLaboral = null;
      this.jobProjectionAdd.costoActual = 0;
      this.jobProjectionAdd.idEstadoProyeccion = 1;
      this.jobProjectionAdd.estadoProyeccion = "Solicitado";
      this.jobProjectionAdd.cargo = this.positions.cargo;
      this.create.emit( this.jobProjectionAdd );

   }

   discard(): void {
      this.dismiss.emit( 1 );
   }

   inputNumber() {
      let plazas = this.jobProjectionAdd.plazasProyectadas + '';
      if ( this.jobProjectionAdd.plazasProyectadas !== null ) {
         this.jobProjectionAdd.plazasProyectadas = Number( plazas.replace( /[^0-9]/g, '' ) );
      }
   }
}
