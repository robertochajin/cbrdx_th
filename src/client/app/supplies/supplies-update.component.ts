import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Supplies } from '../_models/supplies';
import { SuppliesService } from '../_services/supplies.service';
import { ListaService } from '../_services/lista.service';
import { SuppliesGroups } from '../_models/suppliesGroups';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class SuppliesUpdateComponent implements OnInit {

   suppliesGroup: SuppliesGroups = new SuppliesGroups();
   allGroups: SuppliesGroups[] = [];
   supplies: Supplies[] = [];
   supply: Supplies = new Supplies();
   msgs: Message[] = [];
   codeExists: boolean = false;
   codeExistsS: boolean = false;
   formGroup: boolean = false;
   formSupply: boolean = false;
   idGrupoDotacion: number;
   constructor( private suppliesService: SuppliesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {

      this.route.params.subscribe( params => {
         this.idGrupoDotacion = +params[ 'id' ];
         if ( Number( this.idGrupoDotacion ) > 0 ) {
            this.suppliesService.get( this.idGrupoDotacion ).subscribe(
               res => {
                  this.suppliesGroup = res;
                  this.getSupplies();
               } );
         }
      } );

      this.suppliesService.getAll().subscribe(
         res => {
            this.allGroups = res;
         }
      );

      /* listaService.getMasterDetails( 'ListasTiposPreguntas' ).subscribe( res => {
         this.questionsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.questionsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
       } );*/
   }
   ngOnInit() {
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

   onSubmit() {
      if ( !this.codeExists ) {
         this.suppliesGroup.codigo = this.suppliesGroup.codigo.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
         this.suppliesService.update( this.suppliesGroup ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.formGroup = true;
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.suppliesGroup.codigo !== '' && this.suppliesGroup.codigo !== null ) {
         this.codeExists = this.allGroups.filter(
               t => (t.codigo === this.suppliesGroup.codigo && t.idGrupoDotacion !== this.suppliesGroup.idGrupoDotacion ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }

   inputCleanCode( event: any ) {
      let input = event.target.value;
      if ( input.length > 0 ) {
         event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
      }
   }

   getSupplies() {
      if ( Number( this.idGrupoDotacion ) > 0 ) {
         this.suppliesService.getSupplies( this.idGrupoDotacion ).subscribe(
            res => {
               this.supplies = res;
            } );
      }
   }

   addSupplies() {
      this.formSupply = true;
      this.supply = new Supplies();
   }

   updateSupplies( supply: Supplies ) {
      this.formSupply = true;
      this.supply = supply;
   }

   goBackSupplies( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.formSupply = false;
                                                 this.supply = new Supplies();
                                              }
                                           } );
      } else {
         this.formSupply = false;
         this.supply = new Supplies();
      }
   }

   /* onSubmitSupplies() {
    if ( !this.codeExistsS ) {
    if ( this.supply.idDotacion === null || this.supply.idDotacion === undefined || this.supply.idDotacion === 0 ) {
    this.supply.idGrupoDotacion = this.idGrupoDotacion;
    this.supply.codigoPregunta = this.supply.codigoPregunta.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
    this.suppliesService.addQuestion( this.supply ).subscribe( res => {
               this.formQuestion = false;
               this.showAnswers = false;
    this.supply = new Supplies();
               this.getQuestions();
               this.navService.setMesage( 1, this.msgs );
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
    this.suppliesService.updateQuestion( this.supply ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.formQuestion = false;
               this.showAnswers = false;
    this.supply = new Supplies();
               this.getQuestions();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         }
      }
   }

    validateCodeS() {
    if ( this.supply.codigoPregunta !== '' && this.supply.codigoPregunta !== null ) {
    this.codeExistsP = this.supplys.filter(
    t => (t.codigoPregunta === this.supply.codigoPregunta && t.idCuestionarioPregunta !== this.supply.idCuestionarioPregunta ) ).length > 0;
      } else {
         this.codeExistsP = false;
      }
    }*/

}
