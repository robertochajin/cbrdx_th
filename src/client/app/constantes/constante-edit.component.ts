/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Constante} from "../_models/constante";
import {VConstante} from "../_models/vConstante";
import {Lista} from "../_models/lista";
import {ListaItem} from "../_models/listaItem";
import {ConstanteService} from "../_services/constante.service";
import {ListaService} from "../_services/lista.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'constante-edit.component.html',
    selector: 'constante-edit'
})
export class ConstanteEditComponent implements OnInit {

    constant: Constante = new Constante();
    constantList: VConstante[];
    datatypeMaster: Lista;
    datatypeDetails: ListaItem[];
    codeExists: boolean = false;
    regex: string = ".{0,20}";
    displayDialog: boolean = false;

    constructor(private constanteService: ConstanteService, private listaService: ListaService, private router: Router, private route: ActivatedRoute) {
        listaService.getMasterByCodigo("TIDACO").subscribe(res => {
            this.datatypeMaster = res;
            listaService.getMasterDetails(this.datatypeMaster.idLista).subscribe(data => {
                this.datatypeDetails = data;
                route.params.switchMap((params: Params) => constanteService.viewConstant(+params['id']))
                    .subscribe(data => {
                        this.constant = data;
                        this.constanteService.listOtherConstants(this.constant.idConstante).subscribe(res => {
                            this.constantList = res;
                        });
                        this.alterPattern();
                    });
            });
        });
    }

    ngOnInit(): void {

    }

    createConstant() {
        this.constanteService.updateConstant(this.constant).then(data => {
            this.router.navigate(['constantes'])
        });
    }

    validateCode() {
        this.codeExists = this.constantList.filter(t => t.constante === this.constant.constante).length > 0;
    }

    inputCleanUp(value: string) {
        this.constant.constante = value.toUpperCase().replace(' ', '').trim();
    }

    alterPattern() {
        for (let dataType of this.datatypeDetails) {
            if (dataType.idListaItem == this.constant.idTipoDato) {
                if (dataType.codigoItem == "NUM") {
                    this.regex = "[0-9]{0,20}";
                } else {
                    this.regex = ".{0,20}";
                }
                break;
            }
        }
    }

    goBack(): void {
        this.router.navigate(['constantes']);
    }
}