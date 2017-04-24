import { Component,OnInit,Input} from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { Rol } from '../_models/rol';
import {Widgets} from "../_models/widgets";
import {WidgetServices} from "../_services/widget.service";
import { SelectItem, Message, ConfirmationService} from 'primeng/primeng';
import { RolWidgets } from "../_models/rolWidgets";
import { RolWidgetsServices } from "../_services/rolWidgets.service";

@Component({
    moduleId: module.id,
    templateUrl: 'rol-widgets.component.html',
    selector: 'rol-widges',
    providers:  [ConfirmationService]
})
export class RolWidgetsComponent{
    
    @Input() rol:Rol;
    
    rolWidget: RolWidgets = new RolWidgets();
    lfrolWidget: RolWidgets = new RolWidgets();
    dialogObjet: RolWidgets = new RolWidgets();
   rolWidgets: RolWidgets[];
    show_form: boolean = false;
    msgs: Message[] = [];
    widgets: SelectItem[] = [];
    listWidgets: Widgets[] = [];
    
    constructor(private rolWidgetsServices: RolWidgetsServices,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private widgetServices: WidgetServices,
    ) {
      this.widgetServices.getAllEnabled().subscribe(
         widgets => {
            this.listWidgets = widgets;
          this.widgets.unshift({label: 'Seleccione', value: null});
            widgets.map((s: any) => {
               this.widgets.push({label: s.menu, value: s.idMenu});
          });
        }
      );
    }

    ngOnInit() {

        this.rolWidgetsServices.getAllByRol(this.rol.idRol).subscribe(
           rolWidgets => this.rolWidgets = rolWidgets
        );
        
    }
    
    onSubmit() {
        this.msgs = [];
        this.show_form  = false;
        this.rolWidget.idRol = this.rol.idRol;
        if(this.rolWidget.idRolWidgets == null || this.rolWidget.idRolWidgets == 0) {
            this.rolWidgetsServices.add(this.rolWidget)
            .subscribe(data => {
               this.widgets.splice(this.widgets.indexOf(this.widgets.find(m => m.value == this.rolWidget.idWidget)),1);
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.rolWidgetsServices.getAllByRol(this.rol.idRol).subscribe(
                   rolWidgets => this.rolWidgets = rolWidgets
                );
            }, error => {
              this.show_form  = true;
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
        }else{
            this.rolWidgetsServices.update(this.rolWidget)
            .subscribe(data => {
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.rolWidgetsServices.getAllByRol(this.rol.idRol).subscribe(
                   rolWidgets => this.rolWidgets = rolWidgets
                );
            }, error => {
              this.show_form  = true;
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
        }
      
    }
   
    add(){
      this.msgs = [];
      this.rol = new Rol();
      this.show_form  = true;
    }
    
    update(f: Rol) {
      this.msgs = [];
      this.rol = f;
      this.show_form  = true;
    }
    
    goBackUpdate(){
      this.msgs = [];
      this.show_form  = false;
    }
    
}
