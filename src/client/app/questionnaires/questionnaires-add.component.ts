import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnairesService } from '../_services/questionnaires.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires-add.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class QuestionnairesAddComponent implements OnInit {

   cuestionario: Questionnaries = new Questionnaries();
   allQuest: Questionnaries[] = [];
   idCuestionario: number;
   msgs: Message[] = [];
   codeExists: boolean = false;
   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      /*this.questionnairesService.getAll( ).subscribe(
       res => {
       this.allQuest = res;
       } );*/
      /*
       this.route.params.subscribe( params => {
       this.idCuestionario = +params[ 'id' ];
       if ( Number( this.idCuestionario ) > 0 ) {
       this.questionnairesService.get( this.idCuestionario ).subscribe(
       res => {
       this.cuestionario = res;
       } );
       }
       }
       );
       */
   }

   ngOnInit() {
      console.info( this.cuestionario.idCuestionario );
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
      if ( !this.codeExists ) {
         this.questionnairesService.add( this.cuestionario ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.location.back();
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.cuestionario.codigo !== '' && this.cuestionario.codigo !== null ) {
         this.codeExists = this.allQuest.filter(
               t => (t.codigo === this.cuestionario.codigo && t.idCuestionario !== this.cuestionario.idCuestionario ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }
}
