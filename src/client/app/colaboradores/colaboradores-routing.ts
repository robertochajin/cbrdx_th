/**
 * Created by TracesMaker on 06/02/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './colaboradores.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'colaboradores', component: ColaboradoresComponent }
        ])
    ],
    exports: [RouterModule]
})
export class ColaboradoresRoutingModule { }
