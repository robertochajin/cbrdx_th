import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "../_services/authentication.service";
import {PositionResponsabilities} from "../_models/positionResponsabilities";
import {Observable} from "rxjs";

@Injectable()
export class PositionResponsabilitiesService {

  headers = new Headers({'Content-Type': 'application/json'});
  private serviceURL = '<%= SVC_TH_URL %>/api/cargosResponsabilidades/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll() {
    return this.http.get(this.serviceURL).map((res: Response) => res.json() as PositionResponsabilities[]);
  }

  getAllByPosition(id: number): Observable<PositionResponsabilities[]> {
    return this.http.get(this.serviceURL + 'buscarCargo/' + id).map((res: Response) => res.json() as PositionResponsabilities[]);
  }

  add(f: PositionResponsabilities) {
    return this.http.post(this.serviceURL, f, {headers: this.headers})
      .map((res: Response) => res.json());
  };

  update(f: PositionResponsabilities) {
    return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + 'buscarId/' + id)
      .map((res: Response) => res.json() as PositionResponsabilities);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}
