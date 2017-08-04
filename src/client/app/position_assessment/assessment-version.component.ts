import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { AssessmentVersionServices } from '../_services/assessmentVersion.services';
import { AssessmentVersion } from '../_models/assessmentVersion';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               selector: 'assessment-version',
               templateUrl: 'assessment-version.component.html',
               providers: [ ConfirmationService ]
            } )
export class AssessmentVersionComponent implements OnInit {

   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   assessmentVersions: AssessmentVersion[] = [];
   private busqueda: string;

   constructor( private assessmentVersionServices: AssessmentVersionServices,
      private router: Router,
      private adjuntosService: AdjuntosService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

      this.busqueda = this._nav.getSearch( 'assessment-version.component' );
   }

   ngOnInit() {
      this.assessmentVersionServices.getAll().subscribe( list => {
         this.assessmentVersions = list;
      } );
   }

   setSearch() {
      this._nav.setSearch( 'assessment-version.component', this.busqueda );
   }

   generateNewRiskMap() {
      this.confirmationService.confirm( {
          message: `¿Está seguro que desea Generar una nueva versión?`,
          header: 'Confirmación',
          icon: 'fa fa-question-circle',

          accept: () => {
             let token = localStorage.getItem( 'token' );
             if ( token !== null && token !== undefined ) {
                this.tokendecoded = this.jwtHelper.decodeToken( token );

                this.assessmentVersionServices.generateNewRiskMap( this.tokendecoded.usuario.idUsuario )
                .subscribe( res => {
                       saveAs( res, 'Matriz_de_priorizacion_de_riesgos.xlsx' );
                      this.assessmentVersionServices.getAll().subscribe( list => {
                         this.assessmentVersions = list;
                      } );
                }, error => {
                   this._nav.setMesage( 3 );
                } );
             }
          }
       } );
   }

   download( d: AssessmentVersion ) {
      this.adjuntosService.downloadFile( d.idAdjunto ).subscribe( res => {
         this.adjuntosService.getFileName( d.idAdjunto ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

}