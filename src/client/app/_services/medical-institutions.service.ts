import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { MedicalInstitution } from '../_models/medical-institutions';
import { MedicalInstitutionStructure } from '../_models/medical-institutions-structure';

@Injectable()
export class MedicalInstitutionService {

   serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'institucionesMedicas/enabled' ).map( ( res: Response ) => res.json() );
   }
   getById(id: number) {
      return this.authHttp.get( this.serviceURL + 'institucionesMedicas/'+id ).map( ( res: Response ) => res.json() );
   }

   getByIdPublic( id: number ) {
      return this.authHttp.get( this.serviceURL + 'institucionesMedicas/publicacion/' + id ).map( ( res: Response ) => res.json() );
   }
   getStructureByIdMedicalInstitution(id: Number) {
      return this.authHttp.get( this.serviceURL + 'institucionesMedicasEstructurasFisicas/institucionMedica/'+id ).map( ( res: Response ) => res.json() as MedicalInstitutionStructure[] );
   }
   add( c: MedicalInstitution ) {
      c.auditoriaUsuario= this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'institucionesMedicas', c ).map( ( res: Response ) => res.json() );
   };

   update( c: MedicalInstitution ) {
      c.auditoriaUsuario= this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'institucionesMedicas', c ).map( ( res: Response ) => res );
   }
   addStructure( c: MedicalInstitutionStructure ) {
      c.auditoriaUsuario= this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'institucionesMedicasEstructurasFisicas', c ).map( ( res: Response ) => res.json() );
   };
   updateStructure( c: MedicalInstitutionStructure ) {
      c.auditoriaUsuario= this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'institucionesMedicasEstructurasFisicas', c ).map( ( res: Response ) => res );
   }


   // delete( c: MedicalInstitution ) {
   //    const respuesta = this.authHttp.delete( this.serviceURL + '/' + c.idInstitucionMedica );
   //    return respuesta.map( ( res: Response ) => res.json() );
   // }
   // getByEmployee( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'institucionesMedicas/buscarTercero/' + id )
   //    .map( ( res: Response ) => res.json() as MedicalInstitution[] );
   // }

   // getById( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'institucionesMedicas/' + id ).map( ( res: Response ) => res.json() as MedicalInstitution );
   // }

   // getByIdTercero( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'institucionesMedicas/buscarTercero/' + id )
   //    .map( ( res: Response ) => res.json() as MedicalInstitution );
   // }

}
