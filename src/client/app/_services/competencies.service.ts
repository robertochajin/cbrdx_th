import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {Competencies} from "../_models/competencies";

@Injectable()
export class CompetenciesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/competencias/';
  private detailService = '<%= SVC_TH_URL %>/api/competencias/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabledByGroup(idGrupo: number): Observable<Competencies[]> {
    return this.http.get(this.masterService + 'enabled/' + idGrupo).map((res: Response) => res.json() as Competencies[]);
  }

}

