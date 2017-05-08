import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { CompanyAssetsComponent } from './company-assets.component';
import { CompanyAssetsServices } from '../_services/company-assets.service';
import { CompanyAssetsTypesServices } from '../_services/list-company-assets.service';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ CompanyAssetsComponent ],
              bootstrap: [ CompanyAssetsComponent ],
              providers: [ CompanyAssetsServices, CompanyAssetsTypesServices ],
              exports: [ CompanyAssetsComponent ]
           } )

export class CompanyAssetsModule {

}
