import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Risk } from '../_models/position-risks';
import { Exam } from '../_models/position-exam';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class RiskService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getTypeRisk() {
      return this.authHttp.get( this.serviceURL + 'riesgosTipos' ).map( ( res: Response ) => res.json() );
   }

   getExamByIdCargo( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosExamenes/buscarCargo/' + id ).map( ( res: Response ) => res.json() as Exam[] );
   }

   getSubypeRisk() {
      return this.authHttp.get( this.serviceURL + 'riesgosSubTipos' ).map( ( res: Response ) => res.json() );
   }

   getTypeRiskById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgosTipos/' + id ).map( ( res: Response ) => res.json() );
   }

   getSubypeRiskById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgosSubTipos/' + id ).map( ( res: Response ) => res.json() );
   }

   getRisk() {
      return this.authHttp.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() );
   }

   getRiskById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgos/' + id ).map( ( res: Response ) => res.json() );
   }

   getRiskByIdCargo( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosRiesgos/buscarCargo/' + id ).map( ( res: Response ) => res.json() as Risk[] );
   }

   add( c: Risk ) {
      return this.authHttp.post( this.serviceURL + 'cargosRiesgos', c ).map( ( res: Response ) => res.json() );
   };

   addPositionExam( c: Exam ) {
      return this.authHttp.post( this.serviceURL + 'cargosExamenes', c ).map( ( res: Response ) => res.json() );
   };

   updatePositionExam( c: Exam ) {
      return this.authHttp.put( this.serviceURL + 'cargosExamenes', c ).map( ( res: Response ) => res );
   };

   update( c: Risk ) {
      return this.authHttp.put( this.serviceURL + 'tercerosContactos', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosContactos/' + id ).map( ( res: Response ) => res.json() as Risk );
   }

}
