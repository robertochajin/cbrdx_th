import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ColaboradorDetailComponent } from './colaboradores/colaborador-detail.component';
import { ColaboradorAddComponent } from './colaboradores/colaborador-add.component';
import { ColaboradorUpdateComponent } from './colaboradores/colaborador-update.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { FamilyInformationComponent } from './employees-family-information/family-information.component';
import { FamilyInformationAddComponent } from './employees-family-information/family-information-add.component';
import { FamilyInformationUpdateComponent } from './employees-family-information/family-information-update.component';
import { FamilyInformationDetailComponent } from './employees-family-information/family-information-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'colaboradores/detail/:id', component: ColaboradorDetailComponent },
  { path: 'colaboradores/add', component: ColaboradorAddComponent },
  { path: 'colaboradores/update/:id', component: ColaboradorUpdateComponent },
  { path: 'employees-family-information', component: FamilyInformationComponent },
  { path: 'employees-family-information/add', component: FamilyInformationAddComponent },
  { path: 'employees-family-information/update/:id', component: FamilyInformationUpdateComponent },
  { path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

