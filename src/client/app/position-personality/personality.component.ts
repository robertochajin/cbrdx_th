import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {PositionPersonality} from "../_models/positionPersonality";
import {PositionPersonalityServices} from "../_services/position-personality.service";
import {Positions} from "../_models/positions";
import {SelectItem, Message} from 'primeng/primeng';
import {ListaService} from "../_services/lista.service";
import {ListaItem} from "../_models/listaItem";

@Component({
   moduleId: module.id,
   templateUrl: 'personality.component.html',
   selector: 'personality',
   providers: [ConfirmationService]
})

export class PersonalityComponent implements OnInit {

   @Input()
   position: Positions;
   listPersonality: ListaItem[] = [];
   personality: PositionPersonality[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   description: string;
   permitirSiguiente: boolean = false;
   alert: boolean = false;
   msgsAlert: Message[] = [];
   constructor(private router: Router,
               private personalityService: PositionPersonalityServices,
               private listaService: ListaService,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.msgsAlert.push({severity: 'alert', summary: 'Error', detail: 'Debe llenar al menos un registro'});
      this.listaService.getMasterDetails('ListasAtributosCargos').subscribe(res => {
         this.listPersonality = res;
         this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
            this.personality = res;
            this.listPersonality.map((lca: ListaItem) => {
               this.personality.map((ca: PositionPersonality) => {
                  if (ca.idAtributo == lca.idLista)
                     lca.nombre = ca.descripcion
               });
            });
         });
      });
   }

   update(lca: ListaItem) {
      this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
         this.personality = res;
         let obj = this.personality.find(o => lca.idLista == o.idAtributo);

         if (obj != undefined) {
            obj.descripcion = lca.nombre;
            this.personalityService.update(obj).subscribe(res => {
               if (res.ok){
                  if(this.permitirSiguiente == false && obj.descripcion!=""){
                     this.nextStep.emit( 13 );
                     this.permitirSiguiente = true;
                  }
                  if(obj.descripcion == "")
                     this.permitirSiguiente = false;
               }
            });
         } else {
            if(lca.nombre != "") {
               this.save( lca );
            }else{
               this.permitirSiguiente = false;
            }
         }
      });
   }

   save(lca: ListaItem) {
      let personality = new PositionPersonality();
      personality.idCargo = this.position.idCargo;
      personality.idAtributo = lca.idLista;
      personality.descripcion = lca.nombre;

      this.personalityService.add(personality).subscribe(res => {
         if (res.ok){
            if(this.permitirSiguiente == false){
               this.nextStep.emit( 13 );
               this.permitirSiguiente = true;
            }
         }
      });
   }

   next() {
      let num = 0;
      for (let elemento of this.listPersonality) {
         if (elemento.nombre == "" || elemento.nombre == null )
            num++;
      }
      if(this.listPersonality.length == num){
         this.alert = true;
      }else{
         this.alert = false;
         for (let elemento of this.listPersonality) {
            if (elemento.nombre != undefined && elemento.nombre != null )
               this.update(elemento);
         }
         if (this.permitirSiguiente)
            this.nextStep.emit(13);
      }
   }
}
