import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Noformalstudies } from './no-formal-studies';
import { AcademicEducationService } from '../_services/academic-education.service';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'no-formal-studies.component.html',
               selector: 'academic-education-no-formal',
               providers: [ ConfirmationService ]
            } )
export class NoFormalStudiesComponent implements OnInit {

   @Input()
   employee: Employee;
   study: Noformalstudies = new Noformalstudies();
   dialogObjet: Noformalstudies = new Noformalstudies();
   nfstudies: Noformalstudies[];

   constructor( private academicEducationService: AcademicEducationService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.academicEducationService.getAllNoFormalByEmployee( this.employee.idTercero ).subscribe(
         nfstudies => this.nfstudies = nfstudies
      );
      let prue = this.nfstudies;
   }

   delete( f: Noformalstudies ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.academicEducationService.updateNoFormal( this.dialogObjet ).subscribe( x => {
                                                 this.nfstudies.splice( this.nfstudies.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/no-formal-studies/add' ] );
   }

   detail( c: Noformalstudies ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/no-formal-studies/detail/' + c.idTerceroEstudioNoFormal ] );
   }

   update( c: Noformalstudies ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/no-formal-studies/update/' + c.idTerceroEstudioNoFormal ] );
   }
}
