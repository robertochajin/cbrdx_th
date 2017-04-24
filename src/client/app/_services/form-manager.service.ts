import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Functionality} from "../_models/functionality";
import {FunctionalityControl} from "../_models/functionalityContorl";
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class FormManagerService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }
   add(r: Functionality) {
      return this.http.post(this.serviceURL + 'funcionalidades', r, {headers: this.headers}).map((res: Response) => res.json());
   };
   update(r: Functionality) {
      return this.http.put(this.serviceURL + 'funcionalidades', r,{headers: this.headers}).catch(this.handleError);
   };
   addSection(r: FunctionalityControl) {
      return this.http.post(this.serviceURL + 'funcionalidadesControles', r,{headers: this.headers}).map((res: Response) => res.json());
   };
   addField(r: FunctionalityControl) {
      return this.http.post(this.serviceURL + 'funcionalidadesControles', r,{headers: this.headers}).map((res: Response) => res.json());
   };
   updateField(r: FunctionalityControl) {
      return this.http.put(this.serviceURL + 'funcionalidadesControles', r,{headers: this.headers}).catch(this.handleError);
   };
   updateSection(r: FunctionalityControl) {
      return this.http.put(this.serviceURL + 'funcionalidadesControles', r,{headers: this.headers}).catch(this.handleError);
   };
   getAllFunctionalityControl(){
      return this.http.get(this.serviceURL + 'funcionalidadesControles',{headers: this.headers}).map((res: Response) => res.json() as FunctionalityControl[]);
   }
   getAllFunctionality() {
      return this.http.get(this.serviceURL + 'funcionalidades',{headers: this.headers}).map((res: Response) => res.json() as Functionality[]);
   }
   getFunctionalityById(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidades/id/'+id,{headers: this.headers}).map((res: Response) => res.json() as Functionality);
   }

   getFunctionality() {
      return this.http.get(this.serviceURL + 'menus/idPadreDifCero' ,{headers: this.headers}).map((res: Response) => res.json());
   }

   getSectionByIdFuncionalidad(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+id+'/true' ,{headers: this.headers}).map((res: Response) => res.json());
   }
   getFieldByIdFuncionalidad(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+id+'/false' ,{headers: this.headers}).map((res: Response) => res.json());
   }
   getFieldByIdFather(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/buscarPadre/'+id ,{headers: this.headers}).map((res: Response) => res.json());
   }
   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }
   
   getAllEnabled() {
      return this.http.get(this.serviceURL + 'funcionalidades/enabled' ,{headers: this.headers}).map((res: Response) => res.json() as Functionality[]);
   }
   getFuncionalidadesControlesEnabled() {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/enabled', {headers: this.headers}).map((res: Response) => res.json() as FunctionalityControl[]);
   }

}
