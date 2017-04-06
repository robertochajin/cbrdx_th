import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import { TiposPersonas }            from '../_models/tiposPersonas';

@Injectable()
export class ListEmployeesService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private serviceURL = '<%= SVC_TH_URL %>/api/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getListPersonTypes()  {
    return this.http.get(this.serviceURL+"tiposPersonas/",{headers: this.headers}).map((res:Response) => res.json() as TiposPersonas[]);
  }

  getDocumentTypes()  {
    return this.http.get(this.serviceURL+"tiposDocumentos/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getGenderTypes()  {
    return this.http.get(this.serviceURL+"generos/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getMaritalStatusTypes()  {
    return this.http.get(this.serviceURL+"estadosCiviles/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getRhRactorTypes()  {
    return this.http.get(this.serviceURL+"factorRh/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getHealthTypes()  {
    return this.http.get(this.serviceURL+"coberturasSalud/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getOccupationsTypes()  {
    return this.http.get(this.serviceURL+"tiposOcupaciones/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getAcademicLevelTypes()  {
    return this.http.get(this.serviceURL+"nivelesEstudios/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getAffiliationTypes()  {
    return this.http.get(this.serviceURL+"tiposAfiliacion/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getOfficeLevelTypes()  {
    return this.http.get(this.serviceURL+"listasNivelesCargos/enabled/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getTerType(val:string)  {
    return this.http.get(this.serviceURL+"listasTiposTerceros/buscarCodigo/"+val+"/",{headers: this.headers}).map((res:Response) => res.json());
  }

  getLateralityTypes()  {
    return this.http.get(this.serviceURL+"listasLateralidades/enabled",{headers: this.headers}).map((res:Response) => res.json());

  }
  getlistSizeShirt()  {
    return this.http.get(this.serviceURL+"listasTallas/enabled/CAM",{headers: this.headers}).map((res:Response) => res.json());

  }
  getlistSizeFootwear()  {
    return this.http.get(this.serviceURL+"listasTallas/enabled/ZAPA",{headers: this.headers}).map((res:Response) => res.json());

  }
  getlistSizePants()  {
    return this.http.get(this.serviceURL+"listasTallas/enabled/PAN",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistStratum()  {
    return this.http.get(this.serviceURL+"listasEstratos",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistTypeConstruction()  {
    return this.http.get(this.serviceURL+"listasTiposConstruccionViviendas",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistTypeEstate()  {
    return this.http.get(this.serviceURL+"listasTiposViviendas",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistClassEstate()  {
    return this.http.get(this.serviceURL+"listasClasesViviendas",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistLocation(c: number)  {
    return this.http.get(this.serviceURL+"/localizaciones/buscarTercero/"+c,{headers: this.headers}).map((res:Response) => res.json());
  }
  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

  getlistTypeVehicle()  {
    return this.http.get(this.serviceURL+"listasTiposVehiculos",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistTypeService()  {
    return this.http.get(this.serviceURL+"listasTiposServiciosVehiculos",{headers: this.headers}).map((res:Response) => res.json());
  }
  getlistBrand()  {
    return this.http.get(this.serviceURL+"listasMarcasVehiculos",{headers: this.headers}).map((res:Response) => res.json());
  }

}

