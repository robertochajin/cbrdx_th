import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { PublicationsQuestionnaries } from '../_models/publicationsQuestionnnaries';

@Injectable()
export class PublicationQuestionnairesService {

   private serviceURL = '<%= SVC_TH_URL %>/api/publicacionesCuestionarios';
   private jwtHelper: JwtHelper = new JwtHelper();
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         let usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as PublicationsQuestionnaries[] );
   }

   getAllByPublication(idPublication: number) {
      return this.authHttp.get( this.serviceURL + '/publicacion/' + idPublication).map( ( res: Response ) => res.json() as PublicationsQuestionnaries[] );
   }

   getAllByPublicationEnabled( idPublication: number ) {
      return this.authHttp.get( this.serviceURL + '/publicacion/' + idPublication + '/enabled' )
      .map( ( res: Response ) => res.json() as PublicationsQuestionnaries[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( ( res: Response ) => res.json() as PublicationsQuestionnaries );
   }

   add( c: PublicationsQuestionnaries ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL , c ).map( ( res: Response ) => res.json() );
   };

   update( c: PublicationsQuestionnaries ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL , c ).map( ( res: Response ) => res );
   }

}
