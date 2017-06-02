import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import moment = require('moment');
import { PublicationsService } from '../_services/publications.service';
import { Publications } from '../_models/publications';
import { ConstanteService } from '../_services/constante.service';
import { Constante } from '../_models/constante';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancy-detail.component.html'
            } )
export class VacancyDetailComponent implements OnInit {
   publication: Publications = new Publications();
   requirement: PersonnelRequirement = new PersonnelRequirement();
   txtSalary : string = '';
   txtBono: string = '';

   constructor( private route: ActivatedRoute,
      private location: Location,
      private publicationsService: PublicationsService,
      private constanteService: ConstanteService,
      private vacanciesService: VacanciesService ) {

      this.route.params
      .subscribe( ( params: Params ) => {
         vacanciesService.getPublication( +params[ 'idPublication' ] ).subscribe( res => {
            this.requirement = res;
         } );

         this.publicationsService.getById( +params[ 'idPublication' ] ).subscribe( data => {
            this.publication = data;
            if(this.publication.indicadorSalario){
               // consultamos el texto que debe mostrar
               constanteService.getByCode( 'APLNMO' ).subscribe( ( x: Constante ) => {
                  this.txtSalary = x.descripcion;
               } );
            } else {
               this.txtSalary = '';
            }
            if(this.publication.indicadorBonificacion){
               // consultamos el texto que debe mostrar
               constanteService.getByCode( 'APLBON' ).subscribe( ( x: Constante ) => {
                  this.txtBono = x.descripcion;
               } );
            } else {
               this.txtBono = '';
            }
         } );
      } );

   }

   ngOnInit() {
   }

   goBack(): void {
      this.location.back();
   }

}
