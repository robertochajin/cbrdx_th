import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class PoliticalDivisionService {

  private serviceURL = '<%= SVC_SP_URL %>/divisionPolitica/';
  constructor(private http: Http) {}

  getHoodsByWildCard(qr: any) {
    return this.http.get(this.serviceURL + 'cities/s/' + qr)
      .map((res: Response) => res.json());
  }

  getAllCities(qr: any) {
    return this.http.get(this.serviceURL + 'cities/s/' + qr)
      .map((res: Response) => res.json());
  }

  getAllHoods(qr: any) {
    //
    return this.http.get(this.serviceURL + 'hoods/s/' + qr)
      .map((res: Response) => res.json());
  }
}

