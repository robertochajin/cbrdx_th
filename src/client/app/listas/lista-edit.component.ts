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

   ngOnInit(): void {
      this.route.params.switchMap((params: Params) => this.listaService.getMaster(+params['id']))
         .subscribe(data => {
            this.masterList = data;
            this.listaService.getMasterAllDetails(this.masterList.nombreTabla).subscribe(res => {
               this.detailsList = res;
            });
         });
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

   validateDetailCode() {
      if (this.detailsList) {
         if (this.isEdit) {
            this.detailCodeExists = this.detailsList.filter(s => s.idLista != this.editableDetail.idLista).filter(t => t.codigo === this.editableDetail.codigo).length > 0;
         } else {
            this.detailCodeExists = this.detailsList.filter(t => t.codigo === this.editableDetail.codigo).length > 0;
         }
      }
   }

   childInputCleanUp(value: string) {
      this.editableDetail.codigo = value.toUpperCase().replace(' ', '').trim();
   }

   createDetail(f: NgForm) {
      this.editableDetail.orden = 2; //pendiente definir ordenamiento de los items
      this.listaService.createDetail(this.editableDetail, this.masterList.nombreTabla).then(res => {
         this.editableDetail = new ListaItem;
         this.isEdit = true;
         this.listaService.getMasterAllDetails(this.masterList.nombreTabla).subscribe(res => {
            this.isEdit = false;
            this.detailsList = res;
         });
      });
   }

   updateDetail(f: NgForm) {
      this.listaService.updateDetail(this.editableDetail, this.masterList.nombreTabla).then(res => {
         this.editableDetail = new ListaItem;
         this.isEdit = false;
         this.listaService.getMasterAllDetails(this.masterList.nombreTabla).subscribe(res => {
            this.detailsList = res;
         });
      });
   }

   detailEdit(event: ListaItem) {
      this.listaService.getDetail(this.masterList.nombreTabla, event.codigo).subscribe(res => {
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
      this.listaService.getMasterAllDetails(this.masterList.nombreTabla).subscribe(res => {
         this.detailsList = res;
      });
   }

   goBack(): void {
      this.router.navigate(['listas']);
   }
}