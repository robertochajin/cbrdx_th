import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { EmployeesContact } from "../_models/employeesContactList";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class EmployeesContactService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAll() {
      return this.authHttp.get( this.serviceURL + 'tercerosContactos' ).map( ( res: Response ) => res.json() );
   }
   
   getByEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosContactos/buscarTercero/' + id ).map( ( res: Response ) => res.json() as EmployeesContact[] );
   }
   
   add( c: EmployeesContact ) {
      return this.authHttp.post( this.serviceURL + 'tercerosContactos', c ).map( ( res: Response ) => res.json() );
   };
   
   update( c: EmployeesContact ) {
      return this.authHttp.put( this.serviceURL + 'tercerosContactos', c ).map( ( res: Response ) => res );
   }
   
   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosContactos/' + id ).map( ( res: Response ) => res.json() as EmployeesContact );
   }
   
}
