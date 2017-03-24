import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { API_URL } from "../global";

@Injectable()
export class PoliticalDivisionServices {

  constructor(private http: Http) {}

  getHoodsByWildCard(qr: any) {
    return this.http.get(API_URL + '/divisionPolitica/cities/s/' + qr)
      .map((res: Response) => res.json());
  }
}

