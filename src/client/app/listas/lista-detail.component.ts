import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {ListaItem} from "../_models/listaItem";
import {Lista} from "../_models/lista";
import {ListaService} from "../_services/lista.service";

@Component({
    moduleId: module.id,
    templateUrl: 'lista-detail.component.html'
})

export class ListaDetailComponent implements OnInit {

    constructor(private listasService: ListaService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    masterList: Lista = new Lista();
    othersList: Lista[];
    othersDetailsList: ListaItem[];
    detailsList: ListaItem[];
    habilitado: string;
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.listasService.getMaster(+params['id']))
            .subscribe(data => {
                this.masterList = data;
              this.habilitado = data.indicadorEditable ? "Si" : "No";
                this.listasService.getMasterDetails(this.masterList.nombreTabla).subscribe(res => {
                    this.detailsList = res;
                });
            });
    }

    goBack() {
        this.location.back();
    }
}
