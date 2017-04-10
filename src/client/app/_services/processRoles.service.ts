import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {ProcessRoles} from "../_models/processRoles";

@Injectable()
export class ProcessRolesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/listasRolesProceso/';
  private detailService = '<%= SVC_TH_URL %>/api/listasRolesProceso/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled(): Observable<ProcessRoles[]> {
    // let fake : ProcessRoles[] = [];
    // fake.push(new ProcessRoles(1,'este'));
    // fake.push(new ProcessRoles(2,'oyto'));
    // fake.push(new ProcessRoles(3,'sadfa'));
    // fake.push(new ProcessRoles(4,'juame'));
    // return Observable.of(new Object()).map(s => fake);
    return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as ProcessRoles[]);
  }
}

