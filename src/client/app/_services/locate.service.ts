import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Localizaciones} from "../_models/localizaciones";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class LocateService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private masterService = '<%= SVC_TH_URL %>/api/localizaciones/';

  constructor( private authHttp: AuthHttp
  ) {
  }

  getAll()  {
    return this.authHttp.get(this.masterService).map((res:Response) => res.json());
  }

  getById(id: number)  {
    return this.authHttp.get(this.masterService+'/buscarId/'+id).map((res:Response) => res.json() as Localizaciones);
  }

  add(f: Localizaciones) {
    return this.authHttp.post(this.masterService, f)
      .map((res:Response) => res.json());
  };

  update(f: Localizaciones) {
    return this.authHttp.put(this.masterService, JSON.stringify(f)).catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }
}

