import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitution } from '../_models/medical-institutions';
import { Localizaciones } from '../_models/localizaciones';
import { MedicalInstitutionStructure } from '../_models/medical-institutions-structure';
import { LocateService } from '../_services/locate.service';
import { PhysicStructureService } from '../_services/physic-structure.service';

@Component( {
               moduleId: module.id,
               selector: 'medical-institution-add',
               templateUrl: 'medical-institutions-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class MedicalInstitutionAddComponent implements OnInit {

   medicalInstitution: MedicalInstitution = new MedicalInstitution();
   medicalInstitutionStructure: MedicalInstitutionStructure = new MedicalInstitutionStructure();
   listMedicalInstitutionStructure: MedicalInstitutionStructure[] = [];
   localizacion: Localizaciones = new Localizaciones();
   physicStructure: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number = 0;
   totalExamenes: number = 0;
   addinglocation: boolean = true;
   submitted: boolean;

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

   ngOnInit() {
   }

   onSubmit() {
      if ( this.medicalInstitution.direccion !== '' ) {
         this.submitted = true;
         this.locateService.add( this.localizacion ).subscribe( data => {
            this.medicalInstitution.idLocalizacion = data.idLocalizacion;
            this.medicalInstitutionService.add( this.medicalInstitution ).subscribe( res => {
               this.medicalInstitution = res;
               this.medicalInstitutionService.getStructureByIdMedicalInstitution( res.idInstitucionMedica ).subscribe( dt => {
                  this.listMedicalInstitutionStructure = dt;
               } );
               this._nav.setMesage( 1, this.msgs );
               this._nav.setTab(1);
               this.router.navigate( [ 'medical-institutions/update/' +res.idInstitucionMedica  ] );
            }, error => {
               this._nav.setMesage( 3, this.msgs );
            } );
         } );
      }
   }

   onSubmitEstructura() {
      this.medicalInstitutionStructure.idInstitucionMedica = this.medicalInstitution.idInstitucionMedica;
      this.medicalInstitutionStructure;
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();

   }

   bindLocation( event: any ) {
      this.localizacion = event;
      this.medicalInstitution.direccion = event.direccion;
      this.toggleform();
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

   calcularVaor() {
      console.log('calcularVaor');
      let tempExamOpto: number = 0;
      let tempExamVision: number = 0;
      let tempExamOsteo: number = 0;
      if ( this.medicalInstitution.valorExamenOptometria !== null && this.medicalInstitution.valorExamenOptometria !== undefined ) {
         tempExamOpto = Number( this.medicalInstitution.valorExamenOptometria );
      }
      if ( this.medicalInstitution.valorExamenVisiometria !== null && this.medicalInstitution.valorExamenVisiometria !== undefined ) {
         tempExamVision = Number( this.medicalInstitution.valorExamenVisiometria );
      }
      if ( this.medicalInstitution.valorExamenOsteosmuscular !== null && this.medicalInstitution.valorExamenOsteosmuscular !== undefined ) {
         tempExamOsteo = Number( this.medicalInstitution.valorExamenOsteosmuscular );
      }
      this.totalExamenes = tempExamOpto + tempExamOsteo + tempExamVision;
   }

   inputNumberOpto() {
      let temp = this.medicalInstitution.valorExamenOptometria + '';
      if ( this.medicalInstitution.valorExamenOptometria !== null ) {
         this.medicalInstitution.valorExamenOptometria = Number( temp.replace( /[^0-9]/g, '' ) );
      }
   }

   inputNumberOsteo() {
      let temp = this.medicalInstitution.valorExamenOsteosmuscular + '';
      if ( this.medicalInstitution.valorExamenOsteosmuscular !== null ) {
         this.medicalInstitution.valorExamenOsteosmuscular = Number( temp.replace( /[^0-9]/g, '' ) );
      }
   }

   inputNumberVision() {
      let temp = this.medicalInstitution.valorExamenVisiometria + '';
      if ( this.medicalInstitution.valorExamenVisiometria !== null ) {
         this.medicalInstitution.valorExamenVisiometria = Number( temp.replace( /[^0-9]/g, '' ) );
      }
   }

   inputNumber() {
      let temp = this.medicalInstitutionStructure.valorViaje + '';
      if ( this.medicalInstitutionStructure.valorViaje !== null ) {
         this.medicalInstitutionStructure.valorViaje = Number( temp.replace( /[^0-9]/g, '' ) );
      }
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      let temp =this.medicalInstitution.representanteLegal;
      if(this.medicalInstitution.representanteLegal!=null){
         this.medicalInstitution.representanteLegal= temp.replace(/[^a-zA-ZÑñÁáÉéóÓúÚíÍ \/ /]/g,'');
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }

}
