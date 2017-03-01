import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class InstituteServices {

  constructor(private http: Http) {}

  getByWildCard(qr: any)  {
    return this.http.get('/api/institute/s/'+ qr).map((res:Response) => res.json().data);
  }

}

