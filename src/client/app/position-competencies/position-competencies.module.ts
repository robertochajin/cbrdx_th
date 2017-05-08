import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PositionCompetenciesComponent } from './position-competencies.component';
import { PositionCompetenciesServices } from '../_services/position-competencies.services';
import { CompetenciesServices } from '../_services/competencies.service';
import { PonderanciesServices } from '../_services/ponderancies.service';
import { GroupCompetenciesServices } from '../_services/groupCompetencies.service';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ PositionCompetenciesComponent ],
              bootstrap: [ PositionCompetenciesComponent ],
              providers: [ PositionCompetenciesServices, PonderanciesServices, GroupCompetenciesServices, CompetenciesServices ],
              exports: [ PositionCompetenciesComponent ]
           } )

export class PositionCompetenciesModule {

}
