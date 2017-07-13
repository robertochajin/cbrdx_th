import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { ReferencesComponent } from './references.component';
import { ReferencesDetailComponent } from './references-detail.component';
import { ReferencesAddComponent } from './references-add.component';
import { ReferencesUpdateComponent } from './references-update.component';
import { ReferencesService } from '../_services/references.service';
import { LocateService } from '../_services/locate.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { LocationsModule } from '../locations/locations.module';
import { ListaService } from '../_services/lista.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';

@NgModule( {
              imports: [ CommonModule, FormsModule,
                 SharedModule, LocationsModule, FormSharedModule
              ],
              declarations: [ ReferencesComponent,
                 ReferencesDetailComponent,
                 ReferencesAddComponent,
                 ReferencesUpdateComponent
              ],
              bootstrap: [ ReferencesComponent ],
              providers: [ ReferencesService, LocateService, PoliticalDivisionService, ListaService, AdjuntosService, ConstanteService ],
              exports: [ ReferencesComponent ]
           } )
export class ReferencesModule {
}
