import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormSharedModule} from "../shared/form-shared.module";
import {WidgetsComponent} from "./widgets.component";
import {WidgetServices} from "../_services/widget.service";

@NgModule({
  imports: [CommonModule,
    SharedModule,
    FormSharedModule
  ],
  declarations: [WidgetsComponent],
  bootstrap: [WidgetsComponent],
  providers: [WidgetServices],
  exports: [WidgetsComponent]
})

export class WidgetModule {

}
