/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
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

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.listasService.getMaster(+params['id']))
            .subscribe(data => {
                this.masterList = data;
                this.listasService.getOtherMasters(this.masterList.idLista).subscribe(res => {
                    this.othersList = res;
                    let list: Lista = new Lista();
                    list.lista = "Seleccione...";
                    this.othersList.push(list);
                    if (this.masterList.dependeLista != null) {
                        this.listasService.getMasterDetails(this.masterList.dependeLista).subscribe(res => {
                            this.othersDetailsList = res;
                            let detail: ListaItem = new ListaItem();
                            detail.item = "Seleccione -";
                            detail.codigoItem = "";
                            this.othersDetailsList.push(detail);
                        });
                    }
                });
                this.listasService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                    this.detailsList = res;
                });
            });
    }

    goBack() {
        this.location.back();
    }
}