import { Workexperience } from '../_models/work-experience';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { WorkExperienceService } from '../_services/work-experience.service';
import * as moment from 'moment/moment';
import 'rxjs/add/operator/switchMap';
import { PermissionsEmployees } from '../_models/permissionsEmployees';

@Component( {
               moduleId: module.id,
               selector: 'work-experience',
               templateUrl: 'work-experience-detail.component.html',
            } )

export class WorkExperienceDetailComponent implements OnInit {
   @Input() experience: Workexperience = new Workexperience();
   private companySectorList: any;
   private companySubSectorList: any;
   private cityList: any;
   tiempoExperiencia = 0;

   constructor( private workExperienceService: WorkExperienceService,
      private route: ActivatedRoute,
      private location: Location, ) {
   }

   ngOnInit(): void {
      let hoy = new Date();
      let dias = 0;
      let meses = 0;
      let años = 0;
      let año = '';
      let mes = '';
      let dia = '';
      let este$ = this.route.params
      .switchMap( ( params: Params ) => this.workExperienceService.get( +params[ 'id' ] ) );
      este$.subscribe( experience => {
         this.experience = experience;
         if ( this.experience.indicadorActualmente ) {
            this.tiempoExperiencia = moment( hoy, 'YYYY-MM-DD' ).diff( moment( this.experience.fechaIngresa ), 'days' );
            años = Math.floor( this.tiempoExperiencia / 360 );
            if ( años > 0 ) {
               año = años + ' ' + 'Años';
            }
            meses = Math.floor((this.tiempoExperiencia - años * 360) / 30);
            if ( meses > 0 ) {
               mes = meses + ' ' + 'Meses';
            }
            dias = Math.floor(this.tiempoExperiencia - años * 360 - meses * 30);
            if ( dias > 0 ) {
               dia = dias + ' ' + 'Días';
            }
            this.experience.tiempoExperiencia = año+' '+ mes+' '+ dia;
         } else {
            this.tiempoExperiencia = moment( this.experience.fechaTermina, 'YYYY-MM-DD' )
            .diff( moment( this.experience.fechaIngresa, 'YYYY-MM-DD' ), 'days' );
            años = Math.floor( this.tiempoExperiencia / 360 );
            if ( años > 0 ) {
               año = años + ' ' + 'Años';
            }
            meses = Math.floor((this.tiempoExperiencia - años * 360) / 30);
            if ( meses > 0 ) {
               mes = meses + ' ' + 'Meses';
            }
            dias = Math.floor(this.tiempoExperiencia - años * 360 - meses * 30);
            if ( dias > 0 ) {
               dia = dias + ' ' + 'Días';
            }
            this.experience.tiempoExperiencia = año+' '+ mes+' '+ dia;
         }

      } );
   }

   goBack(): void {
      this.location.back();
   }
}

