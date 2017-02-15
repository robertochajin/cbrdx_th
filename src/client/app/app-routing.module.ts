import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//historia de colaboradores
import { ColaboradorDetailComponent } from './colaboradores/colaborador-detail.component';
import { ColaboradorAddComponent } from './colaboradores/colaborador-add.component';
import { ColaboradorUpdateComponent } from './colaboradores/colaborador-update.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';

//Información familiar de colaboradores
import { FamilyInformationComponent } from './employees-family-information/family-information.component';
import { FamilyInformationAddComponent } from './employees-family-information/family-information-add.component';
import { FamilyInformationUpdateComponent } from './employees-family-information/family-information-update.component';
import { FamilyInformationDetailComponent } from './employees-family-information/family-information-detail.component';

//Información de referencia de colaboradores
import { ReferencesComponent } from './employees-references/references.component';
import { ReferencesDetailComponent } from './employees-references/references-detail.component';
import { ReferencesAddComponent } from './employees-references/references-add.component';
import { ReferencesUpdateComponent } from './employees-references/references-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },

  //historia de colaboradores
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'colaboradores/add', component: ColaboradorAddComponent },
  { path: 'colaboradores/detail/:id', component: ColaboradorDetailComponent },
  { path: 'colaboradores/update/:id', component: ColaboradorUpdateComponent },

  //Información familiar de colaboradores
  { path: 'employees-family-information', component: FamilyInformationComponent },
  { path: 'employees-family-information/add', component: FamilyInformationAddComponent },
  { path: 'employees-family-information/update/:id', component: FamilyInformationUpdateComponent },
  { path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent },

  //Información de referencia de colaboradores
  { path: 'employees-references', component: ReferencesComponent },
  { path: 'employees-references/add', component: ReferencesAddComponent },
  { path: 'employees-references/detail/:id', component: ReferencesDetailComponent },
  { path: 'employees-references/update/:id', component: ReferencesUpdateComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

