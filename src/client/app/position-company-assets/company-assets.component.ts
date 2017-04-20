import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {CompanyAssets} from "../_models/companyAssets";
import {ListCompanyAssets} from "../_models/listCompanyAssets";
import {CompanyAssetsServices} from "../_services/company-assets.service";
import {CompanyAssetsTypesServices} from "../_services/list-company-assets.service";
import {Positions} from "../_models/positions";
import {SelectItem, Message} from 'primeng/primeng';

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
   alert: boolean = false;
   msgsAlert: Message[] = [];
   
   constructor(private router: Router,
               private companyAssetsService: CompanyAssetsServices,
               private listCompanyAssetsService: CompanyAssetsTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.msgsAlert.push({severity: 'alert', summary: 'Error', detail: 'Debe llenar al menos un registro'});
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
               if (res.ok) {
                  if ( this.permitirSiguiente == false && obj.descripcion!="") {
                     this.nextStep.emit( 11 );
                     this.permitirSiguiente = true;
                  }
                  if(obj.descripcion == "")
                     this.permitirSiguiente = false;
               }
                  
            });
         } else {
            if(lca.descripcion != ""){
               this.save(lca);
            }else{
               this.permitirSiguiente = false;
            }
         }
      });
   }

   save(lca: ListCompanyAssets) {
      let companyAssets = new CompanyAssets();
      companyAssets.idCargo = this.position.idCargo;
      companyAssets.idTipoElemento = lca.idListaTipoElemento;
      companyAssets.descripcion = lca.descripcion;

      this.companyAssetsService.add(companyAssets).subscribe(res => {
         if (res.ok) {
            if ( this.permitirSiguiente == false ) {
               this.nextStep.emit( 11 );
               this.permitirSiguiente = true;
            }
         }
      });
   }

   next() {
      let num = 0;
      for ( let elemento of this.listCompanyAssets ) {
         if (elemento.descripcion == "" || elemento.descripcion == null )
            num++;
      }
      if(this.listCompanyAssets.length == num){
         this.alert = true;
      }else {
         this.alert = false;
         for ( let elemento of this.listCompanyAssets ) {
            if ( elemento.descripcion != undefined && elemento.descripcion != null )
               this.update( elemento );
         }
         if ( this.permitirSiguiente == true ) {
            this.nextStep.emit( 11 );
         }
      }
   }
}
