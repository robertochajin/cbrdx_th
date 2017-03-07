import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export class NavService {

  private _navTab: number;

  constructor() {
  }
  setTab(number:number) {
    this._navTab = number;
  }
  getTab() {
    return this._navTab;
  }
}
