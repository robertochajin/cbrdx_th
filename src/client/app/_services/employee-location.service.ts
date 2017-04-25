import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { EmployeesLocation } from '../_models/employee-location';
import { Employee } from "../_models/employees";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class LocationService {

   private serviceURL = '<%= SVC_TH_URL %>';
   headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }
   
  get(id: Number){
    return this.http.get(this.serviceURL + '/api/tercerosLocalizaciones/loc/' + id,{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getAllByEmployee(id: number) {
    return this.http.get(this.serviceURL + '/api/tercerosLocalizaciones/' + id,{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getPrincipalNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/principal',{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getComplementaryNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/complementary',{headers: this.headers})
      .map((res: Response) => res.json());
  }

  getAddressTypeList() {
    return this.http.get(this.serviceURL + '/nomenclatures/addressType',{headers: this.headers})
      .map((res: Response) => res.json());
  }

  add(f: any) {
    return this.http.post(this.serviceURL + '/api/tercerosLocalizaciones', f,{headers: this.headers})
      .map((res: Response) => res.json());
  };

  update(f: any) {
    return this.http.put(this.serviceURL + '/api/tercerosLocalizaciones', f,{headers: this.headers})
      .map((res: Response) => res);
  }

  delete(f: any) {
    return this.http.put(this.serviceURL + '/api/tercerosLocalizaciones', f,{headers: this.headers})
      .map((res: Response) => res);
  }
}
