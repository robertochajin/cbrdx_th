import { Component,OnInit,Input} from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { Rol } from '../_models/rol';
import { RolFuncionalities } from '../_models/rolFuncionalities';
import {  RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { MenuManager } from "../_models/menuManager";
import { MenuManagerService } from "../_services/menuManager.service";
import { SelectItem, Message, ConfirmationService} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'rol-functionalities.component.html',
    selector: 'rol-fucionalities',
    providers:  [ConfirmationService]
})
export class RolFuncionalitiesComponent{
    
    @Input() rol:Rol;
    
    funcionality: RolFuncionalities = new RolFuncionalities();
    lfuncionality: RolFuncionalities = new RolFuncionalities();
    dialogObjet: RolFuncionalities = new RolFuncionalities();
    funcionalities: RolFuncionalities[];
    show_form: boolean = false;
    msgs: Message[] = [];
    menus: SelectItem[] = [];
    listMenus: MenuManager[] = [];
    
    constructor(private rolFuncionalitiesService: RolFuncionalitiesServices,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private menuManagerService: MenuManagerService,
    ) {
      this.menuManagerService.getAllEnabled().subscribe(
         menus => {
            this.listMenus = menus;
          this.menus.unshift({label: 'Seleccione', value: null});
            menus.map((s: any) => {
               this.menus.push({label: s.menu, value: s.idMenu});
          });
        }
      );
    }

    ngOnInit() {

        this.rolFuncionalitiesService.getAllByRol(this.rol.idRol).subscribe(
           funcionalities => this.funcionalities = funcionalities
        );
        
    }
    
    onSubmit() {
        this.msgs = [];
        this.show_form  = false;
        this.funcionality.idRol = this.rol.idRol;
        if(this.funcionality.idRolFuncionalidad == null || this.funcionality.idRolFuncionalidad == 0) {
            this.rolFuncionalitiesService.add(this.funcionality)
            .subscribe(data => {
               this.menus.splice(this.menus.indexOf(this.menus.find(m => m.value == this.funcionality.idMenu)),1);
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.rolFuncionalitiesService.getAllByRol(this.rol.idRol).subscribe(
                   funcionalities => this.funcionalities = funcionalities
                );
            }, error => {
              this.show_form  = true;
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
        }else{
            this.rolFuncionalitiesService.update(this.funcionality)
            .subscribe(data => {
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.rolFuncionalitiesService.getAllByRol(this.rol.idRol).subscribe(
                   funcionalities => this.funcionalities = funcionalities
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
