/**
 * Created by TracesMaker on 06/02/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './colaboradores.component';
import { ColaboradorDetailComponent } from './colaborador-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
           /* { path: 'colaboradores', component: ColaboradoresComponent },
            { path: 'detail/:id', component: ColaboradorDetailComponent }*/
        ])
    ],
    exports: [RouterModule]
})
export class ColaboradoresRoutingModule { }
