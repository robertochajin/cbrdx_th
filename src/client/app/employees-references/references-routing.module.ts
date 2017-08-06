import {RouterModule} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guard';

import { ReferencesComponent } from './references.component';
import { ReferencesDetailComponent } from './references-detail.component';
import { ReferencesAddComponent } from './references-add.component';
import { ReferencesUpdateComponent } from './references-update.component';

export const ReferencesRoutingModule = RouterModule.forChild([
   { path: 'employees/detail/:tercero/references', component: ReferencesComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/add', component: ReferencesAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/update/:id', component: ReferencesUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/detail/:id', component: ReferencesDetailComponent, canActivate: [ AuthGuard ] },
]);

