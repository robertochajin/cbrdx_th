import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../_models/employees';
import { Workexperience } from '../_models/work-experience';
import { WorkExperienceService } from '../_services/work-experience.service';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'work-experience.component.html',
               selector: 'work-experience',
               providers: [ ConfirmationService ]
            } )
export class WorkExperienceComponent implements OnInit {
   @Input() employee: Employee;
   experience: Workexperience = new Workexperience();
   dialogObjet: Workexperience = new Workexperience();
   experiences: Workexperience[];

   constructor( private workExperienceService: WorkExperienceService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.workExperienceService.getByEmployee( this.employee.idTercero ).subscribe(
         fstudies => this.experiences = fstudies
      );
   }

   delete( f: Workexperience ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.workExperienceService.update( this.dialogObjet ).subscribe( r => {
                                                 this.experiences.splice( this.experiences.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'employees/detail/'+this.employee.idTercero+'/work-experience/add' ] );
   }

   detail( c: Workexperience ) {
      this.router.navigate( [ 'employees/detail/'+this.employee.idTercero+'/work-experience/detail/' + c.idTerceroExperienciaLaboral ] );
   }

   update( c: Workexperience ) {
      this.router.navigate( [ 'employees/detail/'+this.employee.idTercero+'/work-experience/update/' + c.idTerceroExperienciaLaboral  ] );
   }
}
