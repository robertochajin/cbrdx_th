import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarComponent } from './car.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'cars', component: CarComponent }
    ])
  ],
  exports: [RouterModule]
})
export class CarRoutingModule { }
