import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmployeesLocation } from './employees-location';
import {API_URL} from "../global";
import {Employee} from "../employees/employees";

@Injectable()
export class LocationService {

  constructor(private http:Http) {
  }

  getAllByEmployee(id: number) {
    return this.http.get(API_URL + '/employeesLocations/employees/' + id)
      .map((res:Response) => res.json());
  }

  getPrincipalNomenclatureList() {
    return this.http.get(API_URL + '/nomenclatures/principal')
      .map((res:Response) => res.json());
  }

  getComplementaryNomenclatureList() {
    return this.http.get(API_URL + '/nomenclatures/complementary')
      .map((res:Response) => res.json());
  }

  getAddressTypeList() {
    return this.http.get(API_URL + '/nomenclatures/addressType')
      .map((res:Response) => res.json());
  }

  getAllCities(qr:any) {
    return this.http.get(API_URL + '/divisionPolitica/cities/s/' + qr)
<<<<<<< HEAD
      .map((res:Response) => res.json());
  }

  getAllHoods(qr:any) {
    return this.http.get(API_URL + '/divisionPolitica/hoods/s/' + qr)
=======
>>>>>>> origin/cbrdx_th_stable_master
      .map((res:Response) => res.json());
  }

  add(f: any) {
    return this.http.post(API_URL + '/employeesLocations', f)
      .map((res:Response) => res.json());
  };

  update(f:EmployeesLocation) {
    return this.http.put(API_URL + '/employeesLocations/' + f.idUbicacion, f)
      .map((res:Response) => res.json());
  }

  get(id:number) {
    return this.http.get(API_URL + '/employeesLocations/location/' + id)
      .map((res:Response) => res.json());
  }

  delete(f:EmployeesLocation) {
    const respuesta = this.http.delete(API_URL + '/employeesLocations/' + f.idUbicacion);
    return respuesta.map((res:Response) => res.json());
  }
}
