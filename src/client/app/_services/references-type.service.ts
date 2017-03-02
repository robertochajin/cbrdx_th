import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ReferencesTypesServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/references-types').map((res:Response) => res.json().data);
  }

}

