import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import moment = require('moment');
import { PublicationsService } from '../_services/publications.service';
import { Publications } from '../_models/publications';
import { ConstanteService } from '../_services/constante.service';
import { Constante } from '../_models/constante';
import { EmployeesPublications } from '../_models/employeesPublications';
import { EmployeesService } from '../_services/employees.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'apply-detail.component.html'
            } )
export class VacancyApplyComponent implements OnInit {
   publication: Publications = new Publications();
   requirement: PersonnelRequirement = new PersonnelRequirement();
   employeesPublication: EmployeesPublications;
   txtSalary: string = '';
   txtBono: string = '';

   constructor( private route: ActivatedRoute,
      private employeesService: EmployeesService,
      private location: Location,
      private publicationsService: PublicationsService,
      private constanteService: ConstanteService,
      private router: Router,
      private vacanciesService: VacanciesService ) {

      this.route.params
      .subscribe( ( params: Params ) => {
         vacanciesService.getPublication( +params[ 'idPublication' ] ).subscribe( res => {
            this.requirement = res;
         } );

         this.publicationsService.getById( +params[ 'idPublication' ] ).subscribe( data => {
            this.publication = data;
            if ( this.publication.indicadorSalario ) {
               // consultamos el texto que debe mostrar
               constanteService.getByCode( 'APLNMO' ).subscribe( ( x: Constante ) => {
                  this.txtSalary = x.descripcion;
               } );
            } else {
               this.txtSalary = '';
            }
            if ( this.publication.indicadorBonificacion ) {
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

   goNext(): void {
      this.employeesService.getPublication( this.publication.idPublicacion ).subscribe( data => {
         if ( data.length > 0 ) {
            this.employeesPublication = data[ 0 ];
            this.router.navigate( [ 'apply-vacancy/employee-profile/' + this.employeesPublication.idTercerosPublicaciones ] );
         } else {
            this.employeesPublication = new EmployeesPublications();
            this.employeesPublication.idPublicacion = this.publication.idPublicacion;
            this.employeesPublication.paso = 1;
            this.employeesService.addPublication( this.employeesPublication ).subscribe( data => {
               this.employeesPublication = data;
               this.router.navigate( [ 'apply-vacancy/employee-profile/' + this.employeesPublication.idTercerosPublicaciones ] );

            } );
         }
      } );
   }

}
