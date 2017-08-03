import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';

import { EmployeesDetailComponent } from '../employees/employees-detail.component';
import { EmployeesAddComponent } from '../employees/employees-add.component';
import { EmployeesUpdateComponent } from '../employees/employees-update.component';
import { EmployeesComponent } from '../employees/employees.component';
import { EmployeesViewDetailComponent } from '../employees/employees-view-detail.component';
import { EmployeesCurriculumVitaeComponent } from '../employees/employees-curriculum-vitae.component';

const employeesRoutes: Routes = [
   {
      path: '',
      component: EmployeesComponent,
      children: [
         { path: '/employees/add', component: EmployeesAddComponent, canActivate: [ AuthGuard ] },
         { path: '/employees/view/detail/:id', component: EmployeesViewDetailComponent, canActivate: [ AuthGuard ] }, // solo ver
         { path: '/employees/detail/:id', component: EmployeesDetailComponent, canActivate: [ AuthGuard ] }, // ver editar
         { path: '/employees/update/:id', component: EmployeesUpdateComponent, canActivate: [ AuthGuard ] }, // ver editar
         { path: '/employees/curriculum/:id', component: EmployeesCurriculumVitaeComponent, canActivate: [ AuthGuard ] }, // hoja de vida
      ]
   }
];

export const EmployeesRouting: ModuleWithProviders = RouterModule.forChild(employeesRoutes);
