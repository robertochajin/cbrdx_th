import {NgModule}      from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {CarComponent}  from './car.component';
import {CarService} from './carservice';
import {InputTextModule,DataTableModule,ButtonModule,DialogModule} from 'primeng/primeng';

@NgModule({
  imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule],
  declarations: [CarComponent],
  bootstrap:    [CarComponent],
  providers:    [CarService],
  exports: 		[CarComponent]
})
export class CarModule { }
