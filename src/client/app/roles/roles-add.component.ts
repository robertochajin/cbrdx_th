/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 26/02/2017.
 */
import {Component} from "@angular/core";
import {Rol} from "../_models/rol";
import {RolesService} from "../_services/roles.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {VRolMenuElemento} from "../_models/vRolMenuElemento";
import {MenuElementoService} from "../_services/menuElemento.service";
import {MenuElemento} from "../_models/menuElemento";
@Component({
    moduleId: module.id,
    templateUrl: 'roles-add.component.html'
})
export class RolesAddComponent {

    rol: Rol = new Rol();
    roles: Rol[];
    asignedRoles: VRolMenuElemento[];
    currentDate: Date = new Date(Date.now());
    startDate: Date = this.rol.fechaInicio;
    codeExists: boolean = false;
    masterCreated: boolean = false;
    isAdding: boolean = false;
    elementosMenu: MenuElemento[];


    constructor(private rolesService: RolesService, private router: Router, private menuElementoService: MenuElementoService) {
        rolesService.listRoles().subscribe(res => {
            this.roles = res;
        });
    }

    createMaster(f: NgForm) {
        this.rolesService.addRole(this.rol).then(res => {
            f.resetForm();
            this.masterCreated = true;
            this.rol = res;
        });
    }

    validateCode() {
        this.codeExists = this.roles.filter(t => t.codigoRol === this.rol.codigoRol).length > 0;
    }

    inputCleanUp(value: string) {
        this.rol.codigoRol = value.toUpperCase().replace(' ', '').trim();
    }

    goBack(): void {
        this.router.navigate(['roles']);
    }

    addFunction() {
        this.menuElementoService.listMenuElemento().subscribe(res => {
            this.elementosMenu = res;
            this.isAdding = true;
        });
    }

    createDetail() {
        this.rolesService.getAssignedFunctions(this.rol.idRol).subscribe(res => {
            this.asignedRoles = res;
            this.isAdding = false;
        });
    }
}