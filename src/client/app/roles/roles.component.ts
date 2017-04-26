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

    add() {
        this.router.navigate(['roles/add']);
    }
   
   update(r: Rol) {
        this.router.navigate(['roles/update/'+r.idRol]);
    }
}