import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { CompetenciesServices } from '../_services/competencies.service';
import { GroupCompetenciesServices } from '../_services/groupCompetencies.service';
import { CompetenciesGroupsComponent } from './competencies-groups.component';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ CompetenciesGroupsComponent ],
              bootstrap: [ CompetenciesGroupsComponent ],
              providers: [ GroupCompetenciesServices, CompetenciesServices ],
              exports: [ CompetenciesGroupsComponent ]
           } )

export class CompetenciesGroupsModule {

}
