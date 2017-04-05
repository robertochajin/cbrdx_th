import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {DiagnosticosCIE} from "../_models/diagnosticosCIE";

@Injectable()
export class DiagnosticCIEServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/diagnosticosCie/';
  private detailService  = '<%= SVC_TH_URL %>/api/diagnosticosCie/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getByWildCard(qr: any)  {
    return this.http.get(this.masterService+'codigoNombre/'+qr+'/').map((res:Response) => res.json() as DiagnosticosCIE[]);
  }

  getById(id: number) {
    return this.http.get(this.masterService+'buscarId/'+id).map((res:Response) => res.json() as DiagnosticosCIE);
  }

}

