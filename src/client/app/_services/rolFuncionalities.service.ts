import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "../_services/authentication.service";
import {Observable} from "rxjs";
import { RolFuncionalities } from "../_models/rolFuncionalities";

@Injectable()
export class RolFuncionalitiesServices {

  headers = new Headers({'Content-Type': 'application/json'});
  private serviceURL = '<%= SVC_TH_URL %>/api/RolFuncionalidades/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll() {
    return this.http.get(this.serviceURL).map((res: Response) => res.json() as RolFuncionalities[]);
  }

  getAllByRol(id: number): Observable<RolFuncionalities[]> {
    return this.http.get(this.serviceURL + 'buscarRol/'+ id).map((res: Response) => res.json() as RolFuncionalities[]);
  }

  add(f: RolFuncionalities) {
    return this.http.post(this.serviceURL, f, {headers: this.headers})
      .map((res: Response) => res.json());
  };

  update(f: RolFuncionalities) {
    return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + 'buscarId/' + id)
      .map((res: Response) => res.json() as RolFuncionalities);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}
