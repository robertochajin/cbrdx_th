import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {Widgets} from "../_models/widgets";

@Injectable()
export class WidgetServices {

   public headers = new Headers({'Content-Type': 'application/json'});
   private masterService = '<%= SVC_TH_URL %>/api/widgets';

   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

   getAll(): Observable<Widgets[]> {
      return this.http.get(this.masterService, { headers: this.headers }).map((res: Response) => res.json() as Widgets[]);
   }

   getAllEnabled(): Observable<Widgets[]> {
       return this.http.get(this.masterService + '/enabled/', { headers: this.headers }).map((res: Response) => res.json() as Widgets[]);
   }

   add(f: Widgets) {
      return this.http.post(this.masterService, f, {headers: this.headers}).map((res: Response) => res.json());
   };

   update(f: Widgets) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   getById(id: number) {
      return this.http.get(this.masterService + '/' + id, { headers: this.headers }).map((res: Response) => res.json() as Widgets);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }
   
   getByUsuario(id: number): Observable<Widgets[]> {
      return this.http.get(this.masterService + '/buscarUsuario/'+ id, { headers: this.headers }).map((res: Response) => res.json() as Widgets[]);
   }

}

