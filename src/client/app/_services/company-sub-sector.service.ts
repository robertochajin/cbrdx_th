import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CompanySubSectorService {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/companysubselector').map((res: Response) => res.json().data);
  }

}

