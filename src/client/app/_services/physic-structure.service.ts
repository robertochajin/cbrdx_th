import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {PhysicStructure} from "../_models/physic-structure";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class PhysicStructureService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});
   
   constructor( private http: Http,
                private authenticationService: AuthenticationService ) {
      this.headers = new Headers( {
         'Content-Type': 'application/json', 'Authorization': this.authenticationService.token
      } );
   }

   getAll() {
      return this.http.get(this.serviceURL + 'estructuraFisica',{headers: this.headers}).map((res: Response) => res.json() as PhysicStructure[]);
   }

   getById(id: number) {
      return this.http.get(this.serviceURL + 'estructuraFisica/' + id,{headers: this.headers}).map((res: Response) => res.json() as PhysicStructure);
   }

   add(r: PhysicStructure) {
      return this.http.post(this.serviceURL + 'estructuraFisica', r , {headers: this.headers}).map((res: Response) => res.json());
   };

   update(r: PhysicStructure) {
      return this.http.put(this.serviceURL + 'estructuraFisica', r, {headers: this.headers}).map((res: Response) => res);
   }

}
