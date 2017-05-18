import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { VacanciesComponent } from './vacancies.component';
import { VacantesActionComponent } from './vacancies-action-component';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { VacanciesService } from '../_services/vacancies.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [
                 VacanciesComponent,VacantesActionComponent
              ],
              bootstrap: [ VacanciesComponent ],
              providers: [ VacanciesService, NavService ],
              exports: [ VacanciesComponent, VacantesActionComponent]
           } )
export class VacanciesModule {
}
