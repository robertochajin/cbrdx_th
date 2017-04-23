import {Http, Response, Headers} from "@angular/http";
import {Lista} from "../_models/lista";
import {ListaItem} from "../_models/listaItem";
import {ListaTipoDato} from "../_models/listaTipoDato";
import {Injectable} from "@angular/core";
import any = jasmine.any;
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class ListaService {

  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_TH_URL %>/api/listas/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getDetail(tableName: string, code: string) {
    return this.http.get(this.masterService + 'tabla/' + tableName + '/code/' + code + '/', {headers: this.headers}).map(res => res.json() as ListaItem);
  }

  getMaster(id: number) {
    return this.http.get(this.masterService + '/buscarId/' + id, {headers: this.headers}).map(res => res.json() as Lista);
  }

  getMasterList() {
    return this.http.get(this.masterService, {headers: this.headers}).map((res: Response) => res.json() as Lista[]);
  }

  getMasterByCodigo(codigo: string) {
    return this.http.get(this.masterService + "codigo/" + codigo, {headers: this.headers}).map(res => res.json() as Lista);
  }

  createMaster(l: Lista): Promise<Lista> {
    return this.http.post(this.masterService, JSON.stringify(l), {headers: this.headers}).toPromise().then(res => res.json() as Lista).catch(this.handleError);
  }

  getMasterDetails(tableName: string) {
    return this.http.get(this.masterService + 'tabla/' + tableName + '/', {headers: this.headers}).map((res: Response) => res.json() as ListaItem[]);
  }

  getMasterDetailsByCode(tableName: string, code:string) {
    return this.http.get(this.masterService + 'tabla/' + tableName + '/code/' + code + '/', {headers: this.headers}).map((res: Response) => res.json() as ListaItem[]);
  }

  getMasterDetailsByWildCard(tableName: string, query:string) {
    return this.http.get(this.masterService + 'tabla/' + tableName + '/name/' + query + '/', {headers: this.headers}).map((res: Response) => res.json() as ListaItem[]);
  }

  getMasterDetailsByIdItem(tableName: string, idItem:number) : Observable<ListaItem>{
    return this.http.get(this.masterService + 'tabla/' + tableName + '/idItem/' + idItem + '/', {headers: this.headers}).map((res: Response) => res.json() as ListaItem);
  }

  createDetail(li: ListaItem, tableName: string) {
    return this.http.post(this.masterService + 'tabla/' + tableName + '/', JSON.stringify(li), {headers: this.headers}).toPromise().then(res => res.json() as ListaItem).catch(this.handleError);
  }

  clearDetail(li: number) {
    return this.http.get(this.masterService + "clear/" + li, {headers: this.headers});
  }

  updateMaster(l: Lista) {
    return this.http.put(this.masterService, JSON.stringify(l), {headers: this.headers}).toPromise().catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

  updateDetail(d: ListaItem, tableName: string) {
    return this.http.put(this.masterService + 'tabla/' + tableName + '/', JSON.stringify(d), {headers: this.headers}).toPromise().catch(this.handleError);
  }

  getTipoDato(id: number) {
    return this.http.get(this.masterService + "listasTiposDatos/" + id, {headers: this.headers}).map(res => res.json() as ListaTipoDato);
  }
}
