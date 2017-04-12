import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {PositionPersonality} from "../_models/positionPersonality";
import {ListPositionPersonality} from "../_models/listPositionPersonality";
import {PositionPersonalityServices} from "../_services/position-personality.service";
import {PositionPersonalityTypesServices} from "../_services/list-position-personality.service";
import {Positions} from "../_models/positions";

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

   constructor(private router: Router,
               private personalityService: PositionPersonalityServices,
               private listpersonalityService: PositionPersonalityTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.listpersonalityService.getAllEnabled().subscribe(listPersonality => {
         this.listPersonality = listPersonality;
         this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
            this.personality = res;
            this.listPersonality.map((lca: ListPositionPersonality) => {
               this.personality.map((ca: PositionPersonality) => {
                  if (ca.idAtributo == lca.idListaTipoPersona)
                     lca.descripcion = ca.descripcion
               });
            });
         });
      });
   }

   update(lca: ListPositionPersonality) {
      this.personalityService.getAllByPosition(this.position.idCargo).subscribe(res => {
         this.personality = res;
         let obj = this.personality.find(o => lca.idListaTipoPersona == o.idAtributo);

         if (obj != undefined) {
            obj.descripcion = lca.descripcion;
            this.personalityService.update(obj).subscribe(res => {
               if (res.ok)
                  this.permitirSiguiente = true;
            });
         } else {
            this.save(lca);
         }
      });
   }

   save(lca: ListPositionPersonality) {
      let personality = new PositionPersonality();
      personality.idCargo = this.position.idCargo;
      personality.idAtributo = lca.idListaTipoPersona;
      personality.descripcion = lca.descripcion;

      this.personalityService.add(personality).subscribe(res => {
         if (res.ok)
            this.permitirSiguiente = true;
      });
   }

   next() {
      for (let elemento of this.listPersonality) {
         if (elemento.descripcion != undefined && elemento.descripcion.length > 0)
            this.update(elemento);
      }

      if (this.permitirSiguiente)
         this.nextStep.emit(13);
   }
}
