import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {EvaluationCriterias} from "../_models/evaluationCriterias";

@Injectable()
export class EvaluationCriteriasServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/criterios/';
  private detailService  = '<%= SVC_TH_URL %>/api/criterios/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled()  {
    return this.http.get(this.masterService+'enabled/').map((res:Response) => res.json() as EvaluationCriterias[]);
  }

}
