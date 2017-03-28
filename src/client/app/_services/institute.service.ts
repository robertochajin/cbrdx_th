import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Institutes} from "../_models/institutes";

@Injectable()
export class InstituteServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/listasInstituciones/';
  private detailService  = '<%= SVC_TH_URL %>/api/listasInstituciones/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }
  getByWildCard(qr: any)  {
    return this.http.get(this.masterService+'enabled/').map((res:Response) => res.json() as Institutes[]);
  }

}

