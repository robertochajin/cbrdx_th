/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import {Component} from "@angular/core";
import {Constante} from "../_models/constante";
import {Lista} from "../_models/lista";
import {ListaItem} from "../_models/listaItem";
import {ConstanteService} from "../_services/constante.service";
import {ListaService} from "../_services/lista.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'constante-detail.component.html',
    selector: 'constante-detail'
})
export class ConstanteDetailComponent {

    constant: Constante = new Constante();
    datatypeMaster: Lista;
    datatypeDetails: ListaItem[];
    dataType:string;
    habilitado: string;
    constructor(private constanteService: ConstanteService, private listaService: ListaService, private router: Router, private route: ActivatedRoute) {
        listaService.getMasterByCodigo("TIDACO").subscribe(res => {
            this.datatypeMaster = res;
            listaService.getMasterDetails(this.datatypeMaster.nombreTabla).subscribe(data => {
                this.datatypeDetails = data;
                route.params.switchMap((params: Params) => constanteService.viewConstant(+params['id']))
                    .subscribe(data => {
                        this.constant = data;
                      this.habilitado = data.indicadorHabilitado ? "Si" : "No";
                          listaService.getTipoDato(this.constant.idTipoDato).subscribe(res=>{
                            if(res.nombre != null){
                            this.dataType = res.nombre;
                            }
                          });
                    });
            });
        });
    }

    goBack(): void {
        this.router.navigate(['constantes']);
    }
}
