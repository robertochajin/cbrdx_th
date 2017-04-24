import { Component,OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Rol } from '../_models/rol';
import { RolFuncionalities } from '../_models/rolFuncionalities';
import {  RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { RolFunctionalityControl } from "../_models/rolFunctionalityControl";
import { FunctionalityControl } from "../_models/functionalityContorl";
import { FormManagerService } from "../_services/form-manager.service";
import { SelectItem, Message, ConfirmationService} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'rol-functionalities-config.component.html',
    selector: 'rol-fucionalities-config',
    providers:  [ConfirmationService]
})
export class RolFuncionalitiesConfigComponent{
   
    rolFuncionality: RolFuncionalities;
    listaFuncionalityControl: RolFunctionalityControl[];
    funcionalityControl: RolFunctionalityControl = new RolFunctionalityControl();
    lfuncionalityControl: RolFunctionalityControl = new RolFunctionalityControl();
    show_form: boolean = false;
    msgs: Message[] = [];
    fControles: RolFunctionalityControl;
    secciones: RolFunctionalityControl[] = [];
    controles: RolFunctionalityControl[] = [];
    
    constructor(private rolFuncionalitiesService: RolFuncionalitiesServices,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private formManagerService: FormManagerService,
    ) {
       this.route.params.subscribe( ( params: Params ) => {
          this.rolFuncionalitiesService.get( +params[ 'id' ] ).subscribe( rolFuncionality => {
             this.rolFuncionality = rolFuncionality;
          });
          this.rolFuncionalitiesService.getControlByFuncionality( +params[ 'id' ] ).subscribe( listaFuncionalityControl => {
             this.listaFuncionalityControl = listaFuncionalityControl;
      
          });
       });
    }

    ngOnInit() {
       this.formManagerService.getFuncionalidadesControlesEnabled().subscribe(
          fControles => {
             fControles.map((s: any) => {
                this.fControles = new RolFunctionalityControl();
                if(this.listaFuncionalityControl.find(d => d.idFuncionalidadControl = s.idFuncionalidadControl)){
                   this.fControles = this.listaFuncionalityControl.find(d => d.idFuncionalidadControl = s.idFuncionalidadControl)
                }else {
                   this.fControles.idFuncionalidadControl = s.idFuncionalidadControl;
                   this.fControles.idRol = this.rolFuncionality.idRol;
                   this.fControles.rol = this.rolFuncionality.rol;
                   this.fControles.control = s.control;
                   this.fControles.indicadorHabilitado = false;
                   this.fControles.indicadorEditar = false;
                   this.fControles.indicadorSeccion = false;
                }
                if(s.indicadorSeccion == true ){
                   this.secciones.push(this.fControles);
                }else{
                   this.controles.push(this.fControles);
                }
             });
          }
       );
       this.route.params.subscribe( ( params: Params ) => {
         
       });
       
    }
    
    onSubmit() {
        this.msgs = [];
        this.show_form  = false;
        /*this.funcionality.idRol = this.rol.idRol;
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
        }*/
      
    }
   
   changeControl(fc:RolFunctionalityControl){
       
   }
    
}
