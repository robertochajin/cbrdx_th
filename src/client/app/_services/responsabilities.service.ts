import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Responsabilities} from "../_models/responsabilities";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ResponsabilitiesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/responsabilidades/';
  private detailService = '<%= SVC_TH_URL %>/api/responsabilidades/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled(): Observable<Responsabilities[]> {
    return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as Responsabilities[]);
  }

  getAllEnabledByPosition(idPosition: number): Observable<Responsabilities[]> {
    return this.http.get(this.masterService + 'noAsignadas/'+idPosition).map((res: Response) => res.json() as Responsabilities[]);
  }

}

