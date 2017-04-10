import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {StudyStates} from "../_models/studyStates";

@Injectable()
export class StudyStateServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/listasEstadosEstudios/';
  private detailService  = '<%= SVC_TH_URL %>/api/listasEstadosEstudios/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled()  {
    return this.http.get(this.masterService+'enabled/').map((res:Response) => res.json() as StudyStates[]);
  }

}

