import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {CompanyAssets} from "../_models/companyAssets";
import {ListCompanyAssets} from "../_models/listCompanyAssets";
import {CompanyAssetsServices} from "../_services/company-assets.service";
import {CompanyAssetsTypesServices} from "../_services/list-company-assets.service";
import {Positions} from "../_models/positions";

@Component({
   moduleId: module.id,
   templateUrl: 'company-assets.component.html',
   selector: 'company-assets',
   providers: [ConfirmationService]
})

export class CompanyAssetsComponent implements OnInit {

   @Input()
   position: Positions;
   listCompanyAssets: ListCompanyAssets[] = [];
   companyAssets: CompanyAssets[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   description: string;
   permitirSiguiente: boolean = false;

   constructor(private router: Router,
               private companyAssetsService: CompanyAssetsServices,
               private listCompanyAssetsService: CompanyAssetsTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.listCompanyAssetsService.getAllEnabled().subscribe(listCompanyAssets => {
         this.listCompanyAssets = listCompanyAssets;
         this.companyAssetsService.getAllByPosition(this.position.idCargo).subscribe(res => {
            this.companyAssets = res;
            this.listCompanyAssets.map((lca: ListCompanyAssets) => {
               this.companyAssets.map((ca: CompanyAssets) => {
                  if (ca.idTipoElemento == lca.idListaTipoElemento)
                     lca.descripcion = ca.descripcion
               });
            });
         });
      });
   }

   update(lca: ListCompanyAssets) {
      this.companyAssetsService.getAllByPosition(this.position.idCargo).subscribe(res => {
         this.companyAssets = res;
         let obj = this.companyAssets.find(o => lca.idListaTipoElemento == o.idTipoElemento);

         if (obj != undefined) {
            obj.descripcion = lca.descripcion;
            this.companyAssetsService.update(obj).subscribe(res => {
               if (res.ok)
                  this.permitirSiguiente = true;
            });
         } else {
            this.save(lca);
         }
      });
   }

   save(lca: ListCompanyAssets) {
      let companyAssets = new CompanyAssets();
      companyAssets.idCargo = this.position.idCargo;
      companyAssets.idTipoElemento = lca.idListaTipoElemento;
      companyAssets.descripcion = lca.descripcion;

      this.companyAssetsService.add(companyAssets).subscribe(res => {
         if (res.ok)
            this.permitirSiguiente = true;
      });
   }

   next() {
      for (let elemento of this.listCompanyAssets) {
         if (elemento.descripcion != undefined && elemento.descripcion.length > 0)
            this.update(elemento);
      }

      if (this.permitirSiguiente)
         this.nextStep.emit(11);
   }
}
