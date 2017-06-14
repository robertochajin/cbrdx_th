import { Component, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Adjunto } from '../_models/adjuntos';

@Component( {
               moduleId: module.id,
               templateUrl: 'adjuntos.component.html',
               selector: 'adjuntos.component',
               providers: [ ConfirmationService ]
            } )

export class AdjuntosComponent implements OnInit {

   adjunto:Adjunto=new Adjunto();
   msgs: Message[] = [];
   busqueda: string;

   constructor( private risksService: RisksService,
      private router: Router,
      private navService:NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'adjuntos.component' );
   }

   ngOnInit() {


   }
   uploadingOk( event: any ) {
      // this.addingDoc = !this.addingDoc;
      // this.addingFile = !this.addingFile;
      // this.listInsuranceDocument=[];
      // this.insuranceDocumentService.getByIdInsurance( this.insurance.idAseguradora ).subscribe( rest => {
      //    this.listInsuranceDocument = rest;
      // } );
      // this._nav.setMesage( 1, this.msgs );
   }

   onBeforeSend( event: any ) {
      if( this.adjunto.nombre!==null &&this.adjunto.nombre!== undefined && this.adjunto.nombre!==''){
         this.onSubmit()
      }else{
         // this.navService.setMesage();
      }
      // event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      // //console.info(event);
      // event.formData.append( 'idAseguradoraDocumento', this.insuranceDocumentTemp.idAseguradoraDocumento );
   }
   onSubmit(){

   }
   update( r: Risks ) {

   }
   setSearch() {
      this.navService.setSearch( 'risks.component', this.busqueda );
   }

}
