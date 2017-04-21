import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormSharedModule} from "../shared/form-shared.module";
import {WidgetsComponent} from "./widgets.component";
import {WidgetsAddComponent} from "./widgets-add.component";
import {WidgetsUpdateComponent} from "./widgets-update.component";
import {WidgetServices} from "../_services/widget.service";

@NgModule({
  imports: [CommonModule,
    SharedModule,
    FormSharedModule
  ],
  declarations: [WidgetsComponent,WidgetsAddComponent,WidgetsUpdateComponent],
  bootstrap: [WidgetsComponent],
  providers: [WidgetServices],
  exports: [WidgetsComponent]
})

export class WidgetModule {

}
