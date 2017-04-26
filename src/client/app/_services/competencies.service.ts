import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {Competencies} from "../_models/competencies";

@Injectable()
export class CompetenciesServices {

   public headers = new Headers({'Content-Type': 'application/json'});
   private masterService = '<%= SVC_TH_URL %>/api/competencias/';

   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization': this.authenticationService.token
      });
   }

   getAllEnabledByGroup(idGrupo: number): Observable<Competencies[]> {
      return this.http.get(this.masterService + 'enabled/' + idGrupo, {headers: this.headers}).map((res: Response) => res.json() as Competencies[]);
   }

   getAllByGroup(idGrupo: number): Observable<Competencies[]> {
      return this.http.get(this.masterService + 'buscarGrupo/' + idGrupo, {headers: this.headers}).map((res: Response) => res.json() as Competencies[]);
   }


   add(f: Competencies) {
      return this.http.post(this.masterService, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: Competencies) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.masterService + 'buscarId/' + id, {headers: this.headers})
         .map((res: Response) => res.json() as Competencies);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

}

