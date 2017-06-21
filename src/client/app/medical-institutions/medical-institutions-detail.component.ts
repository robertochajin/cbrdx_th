import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitution } from '../_models/medical-institutions';
import { Localizaciones } from '../_models/localizaciones';
import { MedicalInstitutionStructure } from '../_models/medical-institutions-structure';
import { LocateService } from '../_services/locate.service';
import { PhysicStructureService } from '../_services/physic-structure.service';

@Component( {
               moduleId: module.id,
               selector: 'medical-institutions-detail',
               templateUrl: 'medical-institutions-detail.component.html'
            } )

export class MedicalInstitutionDetailComponent implements OnInit {

   medicalInstitution: MedicalInstitution = new MedicalInstitution();
   medicalInstitutionStructure: MedicalInstitutionStructure = new MedicalInstitutionStructure();
   listMedicalInstitutionStructure: MedicalInstitutionStructure[];
   localizacion: Localizaciones = new Localizaciones();
   physicStructure: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number = 0;
   totalExamenes: number = 0;
   addinglocation: boolean = true;
   submitted: boolean;
   addingStructure: boolean = true;
   editing: boolean = false;

   constructor( private medicalInstitutionService: MedicalInstitutionService,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private location: Location,
      private _nav: NavService,
      private physicStructureService: PhysicStructureService,
      private locateService: LocateService,
      private confirmationService: ConfirmationService, ) {

   }

   ngOnInit(): void {
      this.route.params.switchMap( ( params: Params ) => this.medicalInstitutionService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.medicalInstitution = data;
         this.totalExamenes=data.valorExamenVisiometria+data.valorExamenOsteosmuscular+data.valorExamenOptometria;
         this.medicalInstitutionService.getStructureByIdMedicalInstitution( this.medicalInstitution.idInstitucionMedica )
         .subscribe( rest => {
            this.listMedicalInstitutionStructure = rest;
         } );
      } );

   }

   goBack(): void {
      this.location.back();
   }

}

