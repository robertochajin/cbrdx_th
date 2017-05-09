import { Workexperience } from '../_models/work-experience';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { WorkExperienceService } from '../_services/work-experience.service';
import * as moment from 'moment/moment';
import 'rxjs/add/operator/switchMap';

@Component( {
               moduleId: module.id,
               selector: 'work-experience',
               templateUrl: 'work-experience-detail.component.html',
            } )

export class WorkExperienceDetailComponent implements OnInit {
   @Input()

   experience: Workexperience = new Workexperience();
   private companySectorList: any;
   private companySubSectorList: any;
   private cityList: any;

   constructor( private workExperienceService: WorkExperienceService,
      private route: ActivatedRoute,
      private location: Location, ) {
   }

   ngOnInit(): void {
      let este$ = this.route.params
      .switchMap( ( params: Params ) => this.workExperienceService.get( +params[ 'id' ] ) );
      este$.subscribe( experience => {
         this.experience = experience;
         if ( this.experience.indicadorActualmente ) {
            this.experience.tiempoExperiencia = moment( this.experience.fechaIngresa, 'YYYY-MM-DD' ).toNow( true ).toString();
         } else {
            this.experience.tiempoExperiencia = moment( this.experience.fechaTermina, 'YYYY-MM-DD' )
                                                .diff( moment( this.experience.fechaIngresa, 'YYYY-MM-DD' ), 'days' ).toString() + ' Días';
         }
      } );
   }

   goBack(): void {
      this.location.back();
   }
}

