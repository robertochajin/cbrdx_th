import { Injectable } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { EmployeeVehicle } from "../_models/employee-vehicle";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class EmployeeVehicleService {
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   headers = new Headers( { 'Content-Type': 'application/json' } );
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAll() {
      return this.authHttp.get( this.serviceURL + 'tercerosVehiculos' ).map( ( res: Response ) => res.json() );
   }
   
   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosVehiculos/' + id ).map( ( res: Response ) => res.json() as EmployeeVehicle );
   }
   
   getByIdTercero( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosVehiculos/buscarTerceros/' + id ).map( ( res: Response ) => res.json() as EmployeeVehicle[] );
   }
   
   add( c: EmployeeVehicle ) {
      return this.authHttp.post( this.serviceURL + 'tercerosVehiculos', c ).map( ( res: Response ) => res.json() );
   };
   
   update( c: EmployeeVehicle ) {
      return this.authHttp.put( this.serviceURL + 'tercerosVehiculos', c ).map( ( res: Response ) => res );
   }
   
}
