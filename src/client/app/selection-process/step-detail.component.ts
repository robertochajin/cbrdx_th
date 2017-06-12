import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionStepService } from '../_services/selection-step.service';
import { RolesService } from '../_services/roles.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { ListaItem } from '../_models/listaItem';
import { SelectionProcess } from '../_models/selection-process';

@Component( {
               moduleId: module.id,
               selector: 'step-detail',
               templateUrl: 'step-detail.component.html',
               providers: [ ConfirmationService ]
            } )

export class StepDetailComponent implements OnInit {

   step: SelectionStep;
   public roles: SelectItem [] = [];
   public questionnaires: SelectItem [] = [];
   public convocatoryTypes: SelectItem [] = [];
   process: SelectionProcess;

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private rolesService: RolesService,
      private qs: QuestionnairesService,
      private _nav: NavService,
      private selectionStepService: SelectionStepService ) {

      this.rolesService.listRoles().subscribe( roles => {
         this.roles.push( { label: 'Seleccione', value: null } );
         roles.map( i => {
            this.roles.push( { label: i.codigoRol + ' - ' + i.descripcion, value: i.idRol } )
         } );
      } );

      this.qs.getAllEnabled().subscribe( qts => {
         this.questionnaires.push( { label: 'Seleccione', value: null } );
         qts.map( qt => {
            this.questionnaires.push( { label: qt.cuestionario, value: qt.idCuestionario } )
         } );
      } );

      this.listaService.getMasterDetails( 'ListasFormasReclutamientos' ).subscribe( res => {
         this.convocatoryTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.convocatoryTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         let idStep: number = params[ 'idStep' ];
         if ( idStep !== undefined ) {
            this.selectionStepService.get( idStep ).subscribe( step => {
               this.step = step;
            } );
         } else {
            this.router.navigate( [ 'step-list' ] );
         }
      } );

   }

   ngOnInit() {
   }

   goBack(): void {
      this.router.navigate( [ 'step-list' ] );
   }

}
