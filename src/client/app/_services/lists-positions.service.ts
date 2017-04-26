import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class ListPositionsService {
   
   public headers = new Headers( { 'Content-Type': 'application/json' } );
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private http: Http,
                private authenticationService: AuthenticationService ) {
      this.headers = new Headers( {
         'Content-Type': 'application/json', 'Authorization': this.authenticationService.token
      } );
   }
   
   getCategoryTypes() {
      return this.http.get( this.serviceURL + "categorias/enabled", { headers: this.headers } ).map( ( res: Response ) => res.json() );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
}

