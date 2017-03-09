import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmployeesLocation } from './employees-location';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  api_url:string = "http://40.71.92.147:9095";

  constructor(private http:Http) {
  }

  getAll() {
    return this.http.get(this.api_url + '/employeesLocations')
      .map((res:Response) => res.json().data);
  }

  getPrincipalNomenclatureList() {
    return this.http.get(this.api_url + '/principalNomenclature')
      .map((res:Response) => res.json().data);
  }

  getComplementaryNomenclatureList() {
    return this.http.get(this.api_url + '/complementaryNomenclature')
      .map((res:Response) => res.json().data);
  }

  getAddressTypeList() {
    return this.http.get(this.api_url + '/addressTypes')
      .map((res:Response) => res.json().data);
  }

  getAllCities(qr:any) {
    return this.http.get(this.api_url + '/cities/s/' + qr).map((res:Response) => res.json().data);
  }

  add(f:EmployeesLocation) {
    return this.http.post(this.api_url + '/employeesLocations', f).map((res:Response) => res.json());
  };

  update(f:EmployeesLocation) {
    return this.http.put(this.api_url + '/employeesLocations/' + f.idUbicacion, f).map((res:Response) => res.json());
  }

  get(id:number) {
    return this.http.get(this.api_url + '/employeesLocations/' + id)
      .map((res:Response) => res.json().data as EmployeesLocation);
  }

  delete(f:EmployeesLocation) {
    const respuesta = this.http.delete(this.api_url + '/employees-location/' + f.idUbicacion);
    return respuesta.map((res:Response) => res.json());
  }

}
