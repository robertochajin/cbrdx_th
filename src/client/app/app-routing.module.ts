import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//historia de employees
import { EmployeesDetailComponent } from './employees/employees-detail.component';
import { EmployeesAddComponent } from './employees/employees-add.component';
import { EmployeesUpdateComponent } from './employees/employees-update.component';
import { EmployeesComponent } from './employees/employees.component';

//Información familiar de employees
import { FamilyInformationComponent } from './employees-family-information/family-information.component';
import { FamilyInformationAddComponent } from './employees-family-information/family-information-add.component';
import { FamilyInformationUpdateComponent } from './employees-family-information/family-information-update.component';
import { FamilyInformationDetailComponent } from './employees-family-information/family-information-detail.component';

//employees location
import { LocationComponent } from './employees-location/location.component';
import { LocationUpdateComponent } from './employees-location/location-update.component';
import { LocationAddComponent } from './employees-location/location-add.component';
import { LocationDetailComponent } from './employees-location/location-detail.component';

//Información de referencia de employees
import { ReferencesComponent } from './employees-references/references.component';
import { ReferencesDetailComponent } from './employees-references/references-detail.component';
import { ReferencesAddComponent } from './employees-references/references-add.component';
import { ReferencesUpdateComponent } from './employees-references/references-update.component';

//Información de formacion academica
import { FormalStudiesComponent } from './employees-academic-education/formal-studies.component';
import { FormalStudiesDetailComponent } from './employees-academic-education/formal-studies-detail.component';
import { FormalStudiesAddComponent } from './employees-academic-education/formal-studies-add.component';
import { FormalStudiesUpdateComponent } from './employees-academic-education/formal-studies-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  //historia de employees
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/add', component: EmployeesAddComponent },
  { path: 'employees/detail/:id', component: EmployeesDetailComponent },
  { path: 'employees/update/:id', component: EmployeesUpdateComponent },

  //Información familiar de employees
  { path: 'employees-family-information', component: FamilyInformationComponent },
  { path: 'employees-family-information/add', component: FamilyInformationAddComponent },
  { path: 'employees-family-information/update/:id', component: FamilyInformationUpdateComponent },
  { path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent },

  //Información de referencia de employees
  { path: 'employees-references', component: ReferencesComponent },
  { path: 'employees-references/add', component: ReferencesAddComponent },
  { path: 'employees-references/detail/:id', component: ReferencesDetailComponent },
  { path: 'employees-references/update/:id', component: ReferencesUpdateComponent },

  //Información de formacion academica
  { path: 'employees-formal-studies', component: FormalStudiesComponent },
  { path: 'employees-formal-studies/add', component: FormalStudiesAddComponent },
  { path: 'employees-formal-studies/detail/:id', component: FormalStudiesDetailComponent },
  { path: 'employees-formal-studies/update/:id', component: FormalStudiesUpdateComponent },
  { path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent },

  //employees-location
  { path: 'employees-location', component: LocationComponent },
  { path: 'employees-location/add', component: LocationAddComponent },
  { path: 'employees-location/update/:id', component: LocationUpdateComponent },
  { path: 'employees-location/detail/:id', component: LocationDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

