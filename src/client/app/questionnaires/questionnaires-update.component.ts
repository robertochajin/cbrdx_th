import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnairesService } from '../_services/questionnaires.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class QuestionnairesUpdateComponent implements OnInit {

   quest: Questionnaries = new Questionnaries();
   idCuestionario: number;
   msgs: Message[] = [];

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {

      /*
      this.route.params.subscribe( params => {
       this.idCuestionario = +params[ 'id' ];
       if ( Number( this.idCuestionario ) > 0 ) {
       this.questionnairesService.get( this.idCuestionario ).subscribe(
       res => {
       this.quest = res;
       } );
       }
       }
       );
       */
   }

   ngOnInit() {

   }

   goBack(fDirty : boolean): void {
      if (fDirty){
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
      }else{
         this.location.back();
      }
   }

   onSubmit() {
      this.questionnairesService.add( this.quest ).subscribe( res => {
         this.navService.setMesage( 1, this.msgs );
         this.location.back();
      }, error => {
         this.navService.setMesage( 3, this.msgs );
      } );
   }
}
