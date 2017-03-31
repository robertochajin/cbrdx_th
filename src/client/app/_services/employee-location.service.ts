import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmployeesLocation } from '../_models/employee-location';
import { Employee } from "../_models/employees";

@Injectable()
export class LocationService {

  private serviceURL = '<%= SVC_TH_URL %>';
  // private serviceURL = 'http://localhost:8448';

  constructor(private http: Http) {
  }

  get(id: Number){
    return this.http.get(this.serviceURL + '/api/tercerosLocalizaciones/loc/' + id)
      .map((res: Response) => res.json());
  }

  getAllByEmployee(id: number) {
    return this.http.get(this.serviceURL + '/api/tercerosLocalizaciones/' + id)
      .map((res: Response) => res.json());
  }

  getPrincipalNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/principal')
      .map((res: Response) => res.json());
  }

  getComplementaryNomenclatureList() {
    return this.http.get(this.serviceURL + '/nomenclatures/complementary')
      .map((res: Response) => res.json());
  }

  getAddressTypeList() {
    return this.http.get(this.serviceURL + '/nomenclatures/addressType')
      .map((res: Response) => res.json());
  }

  add(f: any) {
    return this.http.post(this.serviceURL + '/api/tercerosLocalizaciones', f)
      .map((res: Response) => res.json());
  };

  update(f: any) {
    return this.http.put(this.serviceURL + '/api/tercerosLocalizaciones', f)
      .map((res: Response) => res);
  }

  delete(f: any) {
    return this.http.put(this.serviceURL + '/api/tercerosLocalizaciones', f)
      .map((res: Response) => res);
  }
}
