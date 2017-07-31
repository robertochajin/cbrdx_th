import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { CompetenciesServices } from '../_services/competencies.service';
import { Competencies } from '../_models/competencies';
import { PositionCompetencies } from '../_models/positionCompetencies';
import { Positions } from '../_models/positions';
import { PositionCompetenciesServices } from '../_services/position-competencies.services';
import { PonderanciesServices } from '../_services/ponderancies.service';
import { GroupCompetenciesServices } from '../_services/groupCompetencies.service';
import { GroupCompetencies } from '../_models/groupCompetencies';
import { Ponderancies } from '../_models/ponderancies';
import {NavService} from "../_services/_nav.service";

@Component( {
               moduleId: module.id,
               templateUrl: 'position-competencies.component.html',
               selector: 'position-competencies',
               styleUrls: [ 'position-competencies.component.css' ],
               providers: [ ConfirmationService ]
            } )
export class PositionCompetenciesComponent implements OnInit {

   @Input()
   position: Positions;
   competencies: SelectItem[] = [];
   tr: PositionCompetencies = new PositionCompetencies();
   positionCompetencies: PositionCompetencies [] = [];
   ponderanciesList: SelectItem[] = [];
   msgs: Message[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   private groups: GroupCompetencies[] = [];
   private ponderancies: Ponderancies[];

   constructor( private router: Router,
      private positionCompetenciesService: PositionCompetenciesServices,
      private competenciesServices: CompetenciesServices,
      private ponderanciesServices: PonderanciesServices,
      private _nav: NavService,
      private groupCompetenciesServices: GroupCompetenciesServices,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.ponderanciesServices.getAllEnabled().subscribe( ponderancies => {
         this.ponderanciesList.push( { label: 'No Aplica', value: null } );
         ponderancies.map( p => {
            this.ponderanciesList.push( { label: p.ponderacion, value: p.idPonderacion } );
         } );
      } );

      this.positionCompetenciesService.getAllByPosition( this.position.idCargo ).subscribe( pcs => {
         this.positionCompetencies = pcs;
         this.groupCompetenciesServices.getAllEnabled().subscribe( groups => {
            groups.map( g => {
               this.competenciesServices.getAllEnabledByGroup( g.idGrupoCompetencia ).subscribe(
                  competencies => {

                     if ( competencies.length > 0 ) {
                        g.competencies = competencies;

                        g.competencies.map( c => {
                           let skill = this.positionCompetencies.find(
                              ( element: PositionCompetencies, index: number, array: PositionCompetencies[] ) => {
                                 if ( element.idCargo === this.position.idCargo && element.idCompetencia === c.idCompetencia ) {
                                    return true;
                                 } else {
                                    return false;
                                 }
                              } );

                           if ( skill !== undefined ) {
                              c.cargoCompetencia = skill;
                           } else {
                              c.cargoCompetencia = new PositionCompetencies();
                           }

                        } );
                        this.groups.push( g );
                     }
                  }
               );
            } );
         } );
      } );
   }

   update( competencie: Competencies, idGrupo: number ) {

      // verificar el idPonderación si llega nulo para definir si se debe actualizar o agregar
      let skill = competencie.cargoCompetencia;
      if ( skill.idCargoCompetencia !== null && skill.idCargoCompetencia !== undefined ) {
         this.positionCompetenciesService.update( skill ).subscribe( r => {
            return;
         } );
      } else {
         if ( skill.idPonderacion !== undefined && skill.idPonderacion !== null ) {
            skill.idCompetencia = competencie.idCompetencia;
            skill.idCargo = this.position.idCargo;
            this.positionCompetenciesService.add( skill ).subscribe( data => {
               if ( data.idCargoCompetencia ) {
                  this.groups[ idGrupo ].competencies.map( c => {
                     if ( c.idCompetencia === data.idCompetencia ) {
                        c.cargoCompetencia = data;
                     }
                  } );
               }
            } );
         }
      }
   }

   next() {
      this.msgs = [];
      let complete = false;
      for ( let group of this.groups ) {
         for ( let competencie of group.competencies ) {
            if ( competencie.cargoCompetencia !== undefined && competencie.cargoCompetencia.idCargoCompetencia !== undefined
                 && competencie.cargoCompetencia.idPonderacion !== null ) {
               complete = true;
               break;
            }
         }
         if ( complete ) {
            break;
         }
      }

      if ( complete ) {
         // emitir evento
         this.nextStep.emit( 10 );
      } else {
         // lanzar mensaje advirtiendo que un grupo no tiene asignado ningun factor
         this._nav.setMesage(4, {
            severity: 'warn', summary: 'Formulario incompleto',
            detail: 'Es necesario asignar ponderación a por lo menos una competencia.'
         })

      }
   }

}
