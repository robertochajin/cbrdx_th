/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 26/02/2017.
 */
import {Component} from "@angular/core";
import {Rol} from "../_models/rol";
import {RolesService} from "../_services/roles.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    templateUrl: 'roles.component.html'
})
export class RolesComponent {

    roles: Rol[];

    constructor(private rolesService: RolesService, private router: Router) {
        rolesService.listRoles().subscribe(res => {
            this.roles = res;
        });
    }

    addRole() {
        this.router.navigate(['roles/add']);
    }

    viewRole(r: Rol) {
        this.router.navigate(['roles/view/'], r.idRol);
    }

    editRole(r: Rol) {
        this.router.navigate(['roles/edit'], r.idRol);
    }
}