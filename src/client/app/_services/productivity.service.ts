import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Productivity } from '../_models/productivity';
import {underline} from "chalk";
@Injectable()
export class ProductivityService {
  private serviceURL = '<%= SVC_TH_URL %>/api/';

  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getlistProductivity()  {
    return this.http.get(this.serviceURL+"productividades",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistProductivityByIdCargo(id: number){
    return this.http.get(this.serviceURL+"cargosProductividades/buscarId/"+id,{headers: this.headers})
      .map((res:Response) => {
      if(res.text()!='') {
        return res.json() as Productivity
      }else{
        return undefined;
      }
      });
  }
  add(c: Productivity) {
    return this.http.post(this.serviceURL+'cargosProductividades',c).map((res:Response) => res.json());
  };
  update(c: Productivity) {
    return this.http.put(this.serviceURL+'cargosProductividades',c).map((res:Response) => res);
  }
}
