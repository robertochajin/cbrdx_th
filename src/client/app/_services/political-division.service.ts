import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {DivisionPolitica} from "../_models/divisionPolitica";

@Injectable()
export class PoliticalDivisionService {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/divisionPolitica/';
  private detailService  = '<%= SVC_TH_URL %>/api/divisionPolitica/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getHoodsByWildCard(qr: any) {
    return this.http.get(this.masterService + 'buscarLocalizaciones/' + qr + '/',{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getAllCities(qr: any) {
    return this.http.get(this.masterService + 'buscarCiudad/' + qr + '/',{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getById(id: number) {
    return this.http.get(this.masterService + 'buscarId/' + id,{headers: this.headers})
      .map((res: Response) => res.json() as DivisionPolitica);
  }

  getLocation(id: number) {
    return this.http.get(this.masterService + 'buscarLocalizacion/' + id ,{headers: this.headers})
      .map((res: Response) => res.json());
  }
}

