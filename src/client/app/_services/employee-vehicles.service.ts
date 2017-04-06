import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { EmployeeVehicle } from '../_models/employee-vehicle';

@Injectable()
export class EmployeeVehicleService {
  private serviceURL = '<%= SVC_TH_URL %>/api/';

  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get(this.serviceURL+'tercerosVehiculos').map((res:Response) => res.json());
  }

  getById(id: number) {
    return this.http.get(this.serviceURL+'tercerosVehiculos/'+ id).map((res:Response) => res.json() as EmployeeVehicle);
  }
  getByIdTercero(id: number) {
    return this.http.get(this.serviceURL+'tercerosVehiculos/buscarTerceros/'+ id).map((res:Response) => res.json() as EmployeeVehicle[]);
  }

  add(c: EmployeeVehicle) {
    return this.http.post(this.serviceURL+'tercerosVehiculos',c).map((res:Response) => res.json());
  };

  update(c: EmployeeVehicle) {
    return this.http.put(this.serviceURL+'tercerosVehiculos',c).map((res:Response) => res);
  }
  
}
