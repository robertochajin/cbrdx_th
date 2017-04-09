import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Responsabilities} from "../_models/responsabilities";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ResponsabilitiesServices {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/responsabilidades/';
  private detailService = '<%= SVC_TH_URL %>/api/responsabilidades/';

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllEnabled(): Observable<Responsabilities[]> {
    let fakeRes: Responsabilities[] = [];

    fakeRes.push({
      idResponsabilidad: 1,
      responsabilidad: "res 1",
      descripcion: "res 1",
      indicadorHabilitado: true,
      auditoriaUsuario: 1,
      auditoriaFecha: ""
    });

    fakeRes.push({
      idResponsabilidad: 2,
      responsabilidad: "res 2",
      descripcion: "res 2",
      indicadorHabilitado: true,
      auditoriaUsuario: 1,
      auditoriaFecha: "",
    });

    fakeRes.push({
      idResponsabilidad: 3,
      responsabilidad: "res 3",
      descripcion: "res 3",
      indicadorHabilitado: true,
      auditoriaUsuario: 1,
      auditoriaFecha: "",
    });

    return Observable.of(new Object()).map(z => fakeRes);

    // return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as Responsabilities[]);
  }

}

