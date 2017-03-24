/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 25/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Lista} from "../_models/lista";
import {ListaService} from "../_services/lista.service";
import {Router} from "@angular/router";
import {ListaItem} from "../_models/listaItem";
@Component({
    moduleId: module.id,
    templateUrl: 'lista-add.component.html'
})
export class ListaAddComponent implements OnInit {

    currentLists: Lista[];
    masterList: Lista = new Lista();
    othersList: Lista[];
    othersDetailsList: ListaItem[];
    detailsList: ListaItem[];
    editableDetail: ListaItem = new ListaItem();
    codeExists: boolean = false;
    detailCodeExists: boolean = false;
    isMasterCreated: boolean = false;
    isEnabled: boolean = true;
    displayDialog: boolean = false;
    displayDetailDialog: boolean = false;
    displayReturnDialog: boolean = false;
    isEdit: boolean = false;

    constructor(private listaService: ListaService, private router: Router) {
        listaService.getMasterList().subscribe(res => {
            this.currentLists = res;
        });
    }

    createMaster(f: NgForm) {
        this.listaService.createMaster(this.masterList).then(res => {
            this.isMasterCreated = true;
            this.masterList = res;
        });
    }


    validateCode() {
        this.codeExists = this.currentLists.filter(t => t.codigoLista === this.masterList.codigoLista).length > 0;
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

    createDetail() {
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
                this.isEdit = true;
                this.editableDetail = new ListaItem;
                this.listaService.getMasterDetails(this.masterList.idLista).subscribe(res => {
                    this.isEdit = false;
                    this.detailsList = res;
                });
            });
        }
    }

    updateDetail() {
        this.editableDetail.idLista = this.masterList.idLista;
        if (this.editableDetail.indicadorPredeterminado) {
            this.listaService.clearDetail(this.masterList.idLista).subscribe(res => {
                this.listaService.updateDetail(this.editableDetail).then(res => {
                    this.isEdit = false;
                    this.editableDetail = new ListaItem;
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