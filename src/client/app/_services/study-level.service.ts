import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {StudyLevels} from "../_models/studyLevels";

@Injectable()
export class StudyLevelServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/nivelesEstudios/';
  private detailService  = '<%= SVC_TH_URL %>/api/nivelesEstudios/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled() {
    return this.http.get(this.masterService+'enabled/', { headers: this.headers }).map((res:Response) => res.json() as StudyLevels[]);
  }

}

