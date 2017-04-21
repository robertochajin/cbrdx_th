import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {PositionPersonality} from "../_models/positionPersonality";
import {ListPositionPersonality} from "../_models/listPositionPersonality";
import {PositionPersonalityServices} from "../_services/position-personality.service";
import {PositionPersonalityTypesServices} from "../_services/list-position-personality.service";
import {Positions} from "../_models/positions";
import {SelectItem, Message} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'personality.component.html',
   selector: 'personality',
   providers: [ConfirmationService]
})

export class PersonalityComponent implements OnInit {

   @Input()
   position: Positions;
   listPersonality: ListPositionPersonality[] = [];
   personality: PositionPersonality[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   description: string;
   permitirSiguiente: boolean = false;
   alert: boolean = false;
   msgsAlert: Message[] = [];
   constructor(private router: Router,
               private personalityService: PositionPersonalityServices,
               private listpersonalityService: PositionPersonalityTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.msgsAlert.push({severity: 'alert', summary: 'Error', detail: 'Debe llenar al menos un registro'});
      this.listpersonalityService.getAllEnabled().subscribe(listPersonality => {
         this.listPersonality = listPersonality;
         this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
            this.personality = res;
            this.listPersonality.map((lca: ListPositionPersonality) => {
               this.personality.map((ca: PositionPersonality) => {
                  if (ca.idAtributo == lca.idListaAtributoCargo)
                     lca.descripcion = ca.descripcion
               });
            });
         });
      });
   }

   update(lca: ListPositionPersonality) {
      this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
         this.personality = res;
         let obj = this.personality.find(o => lca.idListaAtributoCargo == o.idAtributo);

         if (obj != undefined) {
            obj.descripcion = lca.descripcion;
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
            if(lca.descripcion != "") {
               this.save( lca );
            }else{
               this.permitirSiguiente = false;
            }
         }
      });
   }

   save(lca: ListPositionPersonality) {
      let personality = new PositionPersonality();
      personality.idCargo = this.position.idCargo;
      personality.idAtributo = lca.idListaAtributoCargo;
      personality.descripcion = lca.descripcion;

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
         if (elemento.descripcion == "" || elemento.descripcion == null )
            num++;
      }
      if(this.listPersonality.length == num){
         this.alert = true;
      }else{
         this.alert = false;
         for (let elemento of this.listPersonality) {
            if (elemento.descripcion != undefined && elemento.descripcion != null )
               this.update(elemento);
         }
         if (this.permitirSiguiente)
            this.nextStep.emit(13);
      }
   }
}
