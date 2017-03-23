/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 25/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Lista} from "../_models/lista";
import {ListaService} from "../_services/lista.service";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {ListaItem} from "../_models/listaItem";
import "rxjs/add/operator/switchMap";
@Component({
    moduleId: module.id,
    templateUrl: 'lista-edit.component.html'
})
export class ListaEditComponent implements OnInit {
    masterList: Lista = new Lista();
    othersList: Lista[];
    othersDetailsList: ListaItem[];
    detailsList: ListaItem[];
    editableDetail: ListaItem = new ListaItem();
    codeExists: boolean = false;
    detailCodeExists: boolean = false;
    isEnabled: boolean = true;
    displayDialog: boolean = false;
    displayReturnDialog: boolean = false;
    displayDetailDialog: boolean = false;
    isEdit: boolean = false;
    displayUpdateDialog: boolean = false;

    constructor(private listaService: ListaService, private router: Router, private route: ActivatedRoute) {
    }

    clearMaster() {
        this.listaService.getMaster(this.masterList.idLista).subscribe(res => {
            this.masterList = res;
            this.displayDialog = false;
        });
    }

    createMaster(f: NgForm) {
        this.listaService.updateMaster(this.masterList).then(res => {
            this.displayUpdateDialog = true;
        });
    }


    validateCode() {
        this.codeExists = this.othersList.filter(t => t.codigoLista === this.masterList.codigoLista).length > 0;
    }

    validateDetailCode() {
        if (this.detailsList) {
            if (this.isEdit) {
                this.detailCodeExists = this.detailsList.filter(s => s.idListaItem != this.editableDetail.idListaItem).filter(t => t.codigoItem === this.editableDetail.codigoItem).length > 0;
            } else {
                this.detailCodeExists = this.detailsList.filter(t => t.codigoItem === this.editableDetail.codigoItem).length > 0;
            }
        }
    }

    inputCleanUp(value: string) {
        this.masterList.codigoLista = value.toUpperCase().replace(' ', '').trim();
    }

    childInputCleanUp(value: string) {
        this.editableDetail.codigoItem = value.toUpperCase().replace(' ', '').trim();
    }

    modifyDependency() {
        if (!this.masterList.indicadorHabilitado) {
            this.isEnabled = false;
            this.masterList.dependeLista = null;
            this.masterList.dependeItem = null;
        } else {
            this.isEnabled = true;
        }
    }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.listaService.getMaster(+params['id']))
            .subscribe(data => {
                this.masterList = data;
                this.modifyDependency();
                this.listaService.getOtherMasters(this.masterList.idLista).subscribe(res => {
                    this.othersList = res.filter(t => t.idLista != this.masterList.idLista);
                    let list: Lista = new Lista();
                    list.lista = "Seleccione...";
                    this.othersList.push(list);
                    if (this.masterList.dependeLista != null) {
                        this.listaService.getMasterDetails(this.masterList.dependeLista).subscribe(res => {
                            this.othersDetailsList = res;
                            let detail: ListaItem = new ListaItem();
                            detail.item = "Seleccione -";
                            detail.codigoItem = "";
                            this.othersDetailsList.push(detail);
                        });
                    }
                });
                this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                    this.detailsList = res;
                });
            });


        this.listaService.getOtherMasters(0).subscribe(res => {
            this.othersList = res;
            let list: Lista = new Lista();
            list.idLista = null;
            list.lista = "Seleccione...";
            this.othersList.push(list);
        });
    }

    onChange(id: number): void {
        if (id) {
            this.listaService.getMasterDetails(id).subscribe(res => {
                this.othersDetailsList = res;
                let detail: ListaItem = new ListaItem();
                detail.item = "Seleccione -";
                detail.codigoItem = "";
                detail.idListaItem = null;
                this.othersDetailsList.push(detail);
                for (let dataType of this.othersDetailsList) {
                    if (dataType.indicadorPredeterminado) {
                        this.masterList.dependeItem = dataType.idListaItem;
                        break;
                    }
                }
            });
        } else {
            this.masterList.dependeItem = null;
        }
    }

    createDetail(f: NgForm) {
        this.editableDetail.idLista = this.masterList.idLista;
        if (this.editableDetail.indicadorPredeterminado) {
            this.listaService.clearDetail(this.masterList.idLista).subscribe(res => {
                this.listaService.createDetail(this.editableDetail).then(res => {
                    this.isEdit = true;
                    this.editableDetail = new ListaItem;
                    this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                        this.isEdit = false;
                        this.detailsList = res;
                    });
                });
            });
        } else {
            this.listaService.createDetail(this.editableDetail).then(res => {
                this.editableDetail = new ListaItem;
                this.isEdit = true;
                this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                    this.isEdit = false;
                    this.detailsList = res;
                });
            });
        }
    }

    updateDetail(f: NgForm) {
        if (this.editableDetail.indicadorPredeterminado) {
            this.listaService.clearDetail(this.masterList.idLista).subscribe(res => {
                this.listaService.updateDetail(this.editableDetail).then(res => {
                    this.editableDetail = new ListaItem;
                    this.isEdit = false;
                    this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                        this.detailsList = res;
                    });
                });
            });
        } else {
            this.listaService.updateDetail(this.editableDetail).then(res => {
                this.editableDetail = new ListaItem;
                this.isEdit = false;
                this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                    this.detailsList = res;
                });
            });
        }
    }

    detailEdit(event: ListaItem) {
        this.listaService.getDetail(event.idListaItem).subscribe(res => {
            this.isEdit = true;
            this.editableDetail = res;
        });
    }

    clearDetail() {
        this.displayDetailDialog = false;
        if (this.isEdit) {
            this.isEdit = false
        }
        this.editableDetail = new ListaItem;
        this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
            this.detailsList = res;
        });
    }

    goBack(): void {
        this.router.navigate(['listas']);
    }
}