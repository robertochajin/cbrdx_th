import {Component, OnInit} from "@angular/core";
import {Constante} from "../_models/constante";
import {VConstante} from "../_models/vConstante";
import {ConstanteService} from "../_services/constante.service";
import {Router} from "@angular/router";

@Component({
   moduleId: module.id,
   templateUrl: 'constante-add.component.html',
   selector: 'constante-add'
})
export class ConstanteAddComponent implements OnInit {

   constant: Constante = new Constante();
   constantList: VConstante[];
   constantType: any[];
   codeExists: boolean = false;
   regex: string = "";
   displayDialog: boolean = false;

   constructor(private constanteService: ConstanteService, private router: Router) {
      constanteService.getTiposConstantes().subscribe(res => {
         this.constantType = res;
      });
   }

   ngOnInit(): void {
      this.constanteService.listConstants().subscribe(res => {
         this.constantList = res;
      });
   }

   createConstant() {
      this.constanteService.addConstant(this.constant).then(data => {
         this.router.navigate(['constantes'])
      });
   }

   validateCode() {
      this.codeExists = this.constantList.filter(t => t.constante === this.constant.constante).length > 0;
   }

   inputCleanUp(value: string) {
      this.constant.constante = value.toUpperCase().replace(' ', '').trim();
   }

   alterPattern() {
      this.inputValue();
      let dataType = this.constantType.find(t => t.idListaTipoDato == this.constant.idTipoDato);
      if (dataType.codigo == "NUM") {
         this.regex = "[0-9]{0,20}";
      } else {
         this.regex = "";
      }

   }

   goBack(): void {
      this.router.navigate(['constantes']);
   }

   inputValue() {
      let label = this.constant.valor;
      if (label != "" && label != null && this.constant.idTipoDato != null) {
         let dataType = this.constantType.find(t => t.idListaTipoDato == this.constant.idTipoDato);
         if (dataType.codigo === "NUM") {
            this.constant.valor = this.constant.valor.replace(/[^0-9]/g, '');
         } else {

            this.constant.valor = label.replace(" ", '').trim();
         }
      }
   }

}
