import {Component, OnInit} from "@angular/core";
import {TipoDeArea} from "../_models/tipoDeArea";
import {TipoDeAreaService} from "../_services/tipoDeArea.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'tipoDeArea-edit.component.html',
    selector: 'tipoDeArea-edit'
})
export class TipoDeAreaEditComponent {

    areas: TipoDeArea = new TipoDeArea();
    areasExistentes: TipoDeArea[];
    codeExists: boolean = false;

    constructor(private tipoDeAreasService: TipoDeAreaService, private router: Router, private route: ActivatedRoute) {
        route.params.switchMap((params: Params) => tipoDeAreasService.viewArea(+params['id']))
            .subscribe(data => {
                this.areas = data;
                tipoDeAreasService.listAreas().subscribe(res => {
                    this.areasExistentes = res.filter(t => t.idEstructuraArea != this.areas.idEstructuraArea);
                });
            });
    }

    updateArea() {
        this.tipoDeAreasService.updateArea(this.areas).then(data => {
            this.router.navigate(['tipoArea'])
        });
    }

    validateCode() {
        this.codeExists = this.areasExistentes.filter(t => t.codigoArea === this.areas.codigoArea).length > 0;
    }

    inputCleanUp(value: string) {
        this.areas.codigoArea = value.toUpperCase().replace(/[^A-Z0-9]/,'').trim();
    }

    goBack(): void {
        this.router.navigate(['tipoArea']);
    }
  
    capitalize() {
      let input = this.areas.estructuraArea;
      this.areas.estructuraArea = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
    }
}
