import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {GroupCompetencies} from "../_models/groupCompetencies";
import {Observable} from "rxjs/Rx";

@Injectable()
export class GroupCompetenciesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/gruposCompetencias/';
  private detailService = '<%= SVC_TH_URL %>/api/gruposCompetencias/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled(): Observable<GroupCompetencies[]> {
    return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as GroupCompetencies[]);
  }

  getAllEnabledByPosition(idPosition: number): Observable<GroupCompetencies[]> {
    return this.http.get(this.masterService + 'noAsignadas/'+idPosition).map((res: Response) => res.json() as GroupCompetencies[]);
  }


   add(f: GroupCompetencies) {
      return this.http.post(this.masterService, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: GroupCompetencies) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.masterService + 'buscarId/' + id)
         .map((res: Response) => res.json() as GroupCompetencies);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

}

