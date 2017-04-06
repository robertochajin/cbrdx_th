import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {TerceroResidencias} from "../_models/terceroResidencias";

@Injectable()
export class TercerosResidenciasServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/tercerosResidencias/';
  private detailService = '<%= SVC_TH_URL %>/api/tercerosResidencias/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  add(f: TerceroResidencias) {
    return this.http.post(this.masterService, f, {headers: this.headers})
      .map((res: Response) => res.json());
  };

  update(f: TerceroResidencias) {
    return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  get(id: number) {
    return this.http.get(this.masterService + '/buscarId/' + id, {headers: this.headers})
      .map((res: Response) => res.json() as TerceroResidencias);
  }

  getByTerceroLocalizacion(id: number) {
    return this.http.get(this.masterService + '/buscarId/' + id, {headers: this.headers})
      .map((res: Response) => res.json() as TerceroResidencias);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }
}

