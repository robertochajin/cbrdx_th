import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Localizaciones} from "../_models/localizaciones";

@Injectable()
export class LocateService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private masterService = '<%= SVC_TH_URL %>/api/localizaciones/';
  private detailService  = '<%= SVC_TH_URL %>/api/localizaciones/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll()  {
    return this.http.get(this.masterService,{headers: this.headers}).map((res:Response) => res.json());
  }

  getById(id: number)  {
    return this.http.get(this.masterService+'/buscarId/'+id,{headers: this.headers}).map((res:Response) => res.json() as Localizaciones);
  }

  add(f: Localizaciones) {
    return this.http.post(this.masterService, f, {headers: this.headers})
      .map((res:Response) => res.json());
  };

  update(f: Localizaciones) {
    return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).toPromise().catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }
}

