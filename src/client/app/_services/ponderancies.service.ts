import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Ponderancies} from "../_models/ponderancies";
import {Observable} from "rxjs/Rx";

@Injectable()
export class PonderanciesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/ponderaciones/';
  private detailService = '<%= SVC_TH_URL %>/api/ponderaciones/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled(): Observable<Ponderancies[]> {
    return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as Ponderancies[]);
  }

  getAllEnabledByPosition(idPosition: number): Observable<Ponderancies[]> {
    return this.http.get(this.masterService + 'noAsignadas/'+idPosition).map((res: Response) => res.json() as Ponderancies[]);
  }

}

