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
               selector: 'medical-institution-update',
               templateUrl: 'medical-institutions-update.component.html',
               providers: [ ConfirmationService ]
            } )

export class MedicalInstitutionUpdateComponent implements OnInit {

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

   ngOnInit() {
      this.physicStructure = [];
      this.route.params.switchMap( ( params: Params ) => this.medicalInstitutionService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.medicalInstitution = data;
         this.medicalInstitutionService.getStructureByIdMedicalInstitution( this.medicalInstitution.idInstitucionMedica )
         .subscribe( rest => {
            this.listMedicalInstitutionStructure = rest;
            this.physicStructureService.getAllEnabled().subscribe( data => {
               this.physicStructure.push( { label: 'Seleccione', value: null } );
               for ( let s of data ) {
                  let temp = this.listMedicalInstitutionStructure.find( x => x.idEstructuraFisica === s.idEstructuraFisica );
                  if ( !temp ) {
                     this.physicStructure.push( { label: s.estructuraFisica, value: s.idEstructuraFisica } );
                  }
               }
            } );
         } );
      } );
      this.acordion = this._nav.getTab();
   }

   onSubmit() {
      if ( this.medicalInstitution.direccion !== '' ) {
         this.submitted = true;
         this.locateService.add( this.localizacion ).subscribe( data => {
            this.medicalInstitution.idLocalizacion = data.idLocalizacion;
            this.medicalInstitutionService.update( this.medicalInstitution ).subscribe( res => {
               this.medicalInstitutionService.getStructureByIdMedicalInstitution( this.medicalInstitution.idInstitucionMedica )
               .subscribe( dt => {
                  this.listMedicalInstitutionStructure = dt;
               } );
               this._nav.setMesage( 1, this.msgs );
            }, error => {
               this._nav.setMesage( 3, this.msgs );
            } );
         } );
      }

   }

   onSubmitEstructura() {
      this.medicalInstitutionStructure.idInstitucionMedica = this.medicalInstitution.idInstitucionMedica;
      this.addingStructure = false;
      if(!this.medicalInstitutionStructure.indicadorViaja){
         this.medicalInstitutionStructure.valorViaje=0;
      }
      if(this.medicalInstitutionStructure.idInstitucionMedicaEstructuraFisica){
         this.medicalInstitutionService.updateStructure( this.medicalInstitutionStructure ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
            this.medicalInstitutionStructure.valorViaje=null;
            this.medicalInstitutionStructure.indicadorViaja=false;
            this.editing = false;
            this.listMedicalInstitutionStructure = [];
            this.physicStructure = [];
            this.medicalInstitutionService.getStructureByIdMedicalInstitution( this.medicalInstitution.idInstitucionMedica )
            .subscribe( rest => {
               this.addingStructure = true;
               this.listMedicalInstitutionStructure = rest;
               this.physicStructureService.getAllEnabled().subscribe( data => {
                  this.physicStructure.push( { label: 'Seleccione', value: null } );
                  for ( let s of data ) {
                     let temp = this.listMedicalInstitutionStructure.find( x => x.idEstructuraFisica === s.idEstructuraFisica );
                     if ( !temp ) {
                        this.physicStructure.push( { label: s.estructuraFisica, value: s.idEstructuraFisica } );
                     }
                  }
               } );
            } );
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }else {
         this.medicalInstitutionService.addStructure( this.medicalInstitutionStructure ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
            this.medicalInstitutionStructure.valorViaje=null;
            this.medicalInstitutionStructure.indicadorViaja=false;
            this.listMedicalInstitutionStructure = [];
            this.physicStructure = [];
            this.medicalInstitutionService.getStructureByIdMedicalInstitution( this.medicalInstitution.idInstitucionMedica )
            .subscribe( rest => {
               this.addingStructure = true;
               this.listMedicalInstitutionStructure = rest;
               this.physicStructureService.getAllEnabled().subscribe( data => {
                  this.physicStructure.push( { label: 'Seleccione', value: null } );
                  for ( let s of data ) {
                     let temp = this.listMedicalInstitutionStructure.find( x => x.idEstructuraFisica === s.idEstructuraFisica );
                     if ( !temp ) {
                        this.physicStructure.push( { label: s.estructuraFisica, value: s.idEstructuraFisica } );
                     }
                  }
               } );
            } );
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }

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
   }

   updateStructure(c:MedicalInstitutionStructure){
      if(c!==null){
         this.medicalInstitutionStructure = Object.assign( {}, c );
         this.editing=true;
         this.physicStructure.push( { label: c.estructuraFisica, value: c.idEstructuraFisica } );
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
   cancelEditing(fcDirty : boolean) {
      if ( fcDirty ){
         this.confirmationService.confirm( {
                                              message: `¿Está seguro que desea Cancelar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',

                                              accept: () => {
                                                 this.medicalInstitutionStructure = new MedicalInstitutionStructure();
                                                 this.editing = false;
                                                 let temp =this.physicStructure.length;
                                                 this.physicStructure.splice(temp-1);
                                              }
                                           } );
      }else {
         this.medicalInstitutionStructure = new MedicalInstitutionStructure();
         this.editing = false;
         let temp =this.physicStructure.length;
         this.physicStructure.splice(temp-1);
      }

   }

}
