import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CitiesServices {

  constructor(private http: Http) {}

  getAllCities(qr: any)  {
    return this.http.get('/api/cities/s/'+ qr).map((res:Response) => res.json().data);
  }

}

