import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
   sessionStart: boolean = false;

   constructor( private http: Http ) {
   }

   getSession() {
      return this.sessionStart;
   }

   setSession( s: boolean ) {
      this.sessionStart = s;
   }
}
