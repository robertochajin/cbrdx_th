import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Noformalstudies } from './no-formal-studies';
import { AcademicEducationService } from '../_services/academic-education.service';
import { ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';

@Component( {
               moduleId: module.id,
               selector: 'academic-education',
               templateUrl: 'no-formal-studies-detail.component.html',
               providers: [ ConfirmationService ]
            } )

export class NoFormalStudiesDetailComponent implements OnInit {
   @Input()

   study: Noformalstudies = new Noformalstudies();
   studysType: string;

   constructor( private academicEducationService: AcademicEducationService,
      private confirmationService: ConfirmationService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location ) {
   }

   ngOnInit(): void {
      this.route.params
      .switchMap( ( params: Params ) => this.academicEducationService.getNoFormal( +params[ 'id' ] ) )
      .subscribe( study => {
         this.study = study;
         this.studysType = this.study.idTipoEstudio === null ? this.study.otroEstudio : this.study.tipoEstudio;
      } );
   }

   goBack(): void {
      this.location.back();
   }
}

