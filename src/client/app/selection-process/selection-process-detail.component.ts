/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Publications } from '../_models/publications';
import { PublicationsService } from '../_services/publications.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { RequirementReferral } from '../_models/requirementReferral';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { PublicationsQuestionnaries } from '../_models/publicationsQuestionnnaries';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'selection-process-detail.component.html',
               selector: 'selecction-process-detail'
            } )
export class PublicationDetailComponent {

   publication: Publications = new Publications();
   requirementReferrals: RequirementReferral[] = [];
   publicationsQuestionnaires: PublicationsQuestionnaries[] = [];

   habilitado: string;
   virtual: string;

   constructor( private publicationsService: PublicationsService,
      private router: Router,
      private referralsServices: RequirementReferralsServices,
      private publicationQuestionnairesService: PublicationQuestionnairesService,
      private route: ActivatedRoute,
      private location: Location, ) {
      route.params.switchMap( ( params: Params ) => publicationsService.getById( +params[ 'idReq' ] ) )
      .subscribe( data => {
         this.publication=data;
         this.referralsServices.getAllRequirement(this.publication.idRequerimiento).subscribe(res=>{
            this.requirementReferrals= res;
         });
         this.publicationQuestionnairesService.getAllByPublication(this.publication.idPublicacion).subscribe(rest=>{
            this.publicationsQuestionnaires = rest;
         });
      } );
   }

   goBack(): void {
      this.location.back();
   }
}
