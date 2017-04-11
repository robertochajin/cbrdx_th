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

}

