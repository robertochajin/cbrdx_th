import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ActividadEconomica} from "../_models/actividadEconomica";
import {ActividadEconomicaTipos} from "../_models/actividadEconomicaTipos";
import {ActividadEconomicaService} from "../_services/actividadEconomica.service";
import {TreeNode} from "primeng/components/common/api";
import {Message, SelectItem} from "primeng/primeng";
import {Search} from "../_models/search";


@Component({
              moduleId: module.id,
              templateUrl: 'actividadEconomica.component.html',
              selector: 'actividadEconomica'
           })
export class ActividadEconomicaComponent implements OnInit {
   
   msgs: Message[] = [];
   actividadEconomica: ActividadEconomica = new ActividadEconomica();
   listadoActividadEconomica: ActividadEconomica[];
   activityTypes: ActividadEconomicaTipos[] = [];
   treeActividadEconomica: any[] = [];
   treeselected: TreeNode;
   selectedNode: Tree;
   tabselected: number = 1;
   labeltabselected: string;
   header: string;
   labelPadre: string = "";
   labelTipo: string;
   labelfieldactividad: string;
   btnactivity: {show: boolean, label: string, idparent: number, parent: string} = {
      show: true,
      label: 'Agregar Sección',
      parent: '',
      idparent: 0
   };
   btnsubactivity: {show: boolean, label: string, idparent: number, parent: string} = {
      show: false,
      label: '',
      parent: '',
      idparent: 0
   };
   codeExists: boolean = false;
   displayDialog: boolean = false;
   resultSearch: Search[];
   selectedSearch: SelectItem;
   
   constructor(private router: Router,
               private actividadEconomicaService: ActividadEconomicaService) {
      
      actividadEconomicaService.listActividadEconomica().subscribe(res => {
         this.listadoActividadEconomica = res;
         for (let c of this.listadoActividadEconomica.filter(t => t.idActividadPadre == 0)) {
            this.treeActividadEconomica.push({
                                                "value": c.idActividadEconomica,
                                                "label": c.actividadEconomica,
                                                "level": 1,
               
                                                "codigo": c.codigoActividadEconomica,
                                                "children": [{
                                                   "value": 0,
                                                   "label": '+ Cargando...',
                                                   "level": 2,
                                                   "codigo": "",
                                                   "data" : c,
                                                   "children": {}
                                                }]
                                             });
         }
      });
      
      actividadEconomicaService.listActividadEconomicaTipos().subscribe(listActividadEconomicaTipos => {
         this.activityTypes = listActividadEconomicaTipos;
      });
   }
   
   ngOnInit(): void {
      this.newActivity();
      
   }
   
   goBack(): void {
      this.router.navigate(['actividadEconomica']);
   }
   
   nodeExpand(node: any) {
      let actividadEconomicaNivel: any[] = [];
      
      let chil: any;
      if (node.level == 3) {
         chil = [];
      } else {
         chil = [{
            "value": 0,
            "label": '+ Cargando...',
            "level": node.level + 2,
            "codigo": ''
         }]
      }
      
      for (let c of this.listadoActividadEconomica.filter(t => t.idActividadPadre == node.value)) {
         actividadEconomicaNivel.push({
                                         "value": c.idActividadEconomica,
                                         "label": c.actividadEconomica,
                                         "level": node.level + 1,
                                         "parent":node,
                                         "data": c,
                                         "codigo": c.codigoActividadEconomica,
                                         "children": chil
            
                                      });
      }
      node.children = actividadEconomicaNivel;
   }
   
   nodeSelect(node: any) {
      
      this.selectedNode = node;
      this.treeselected = node;
      this.tabselected = node.level;
      this.header = node.label;
      this.btnsubactivity.show = false;
      
      switch (this.tabselected) {
         case 1:
            this.labelfieldactividad = "Nombre";
            this.labelPadre = "";
            this.labelTipo = "Tipo: " + this.getTypebyCodigo('1');
            this.btnactivity = {
               show: true,
               label: 'Agregar Sección',
               parent: node.label,
               idparent: 0
            };
            this.btnsubactivity = {
               show: true,
               label: 'Agregar ' + this.getTypebyCodigo('2'),
               
               parent: node.label,
               idparent: node.value
            };
            break;
         
         case 2:
            
            this.labelfieldactividad = "Nombre " + this.getTypebyCodigo('2');
            this.labelPadre = this.getTypebyCodigo('1') + ": " + node.parent.label;
            this.labelTipo = "Tipo: " + this.getTypebyCodigo('2');
            this.btnsubactivity = {
               show: true,
               label: 'Agregar ' + this.getTypebyCodigo('3'),
               
               parent: node.label,
               idparent: node.value
            };
            break;
         
         case 3:
            
            this.labelfieldactividad = "Nombre " + this.getTypebyCodigo('3');
            this.labelPadre = this.getTypebyCodigo('2') + ": " + node.parent.label;
            this.labelTipo = "Tipo: " + this.getTypebyCodigo('3');
            this.btnsubactivity = {
               show: true,
               label: 'Agregar ' + this.getTypebyCodigo('4'),
               
               parent: node.label,
               idparent: node.value
            };
            break;
         
         case 4:
            
            this.labelfieldactividad = "Nombre " + this.getTypebyCodigo('3');
            this.labelPadre = this.getTypebyCodigo('3') + ": " + node.parent.label;
            this.labelTipo = "Tipo: " + this.getTypebyCodigo('4');
            break;
         
      }
      this.actividadEconomicaService.viewActividadEconomica(node.value).subscribe(
         actividadEconomica => {
            this.actividadEconomica = actividadEconomica;
            this.validateCode();
         });
      
   }
   
   save() {
      if (this.actividadEconomica.idActividadEconomica == null || this.actividadEconomica.idActividadEconomica == 0) {
         this.msgs.push({severity: 'info', summary: 'Guardando...', detail: 'Nuevo registro'});
         this.actividadEconomicaService.addActividadEconomica(this.actividadEconomica).then(data => {
            console.info(this.tabselected);
            console.info(this.selectedNode);
            let chil: any[] = [];
            if (this.selectedNode.level <= 3) {
               chil = [{
                  "value": 0,
                  "label": '+ Cargando...',
                  "level": this.tabselected + 1,
                  "codigo": ''
               }]
            }
            let newChil: any = {
               "label": this.actividadEconomica.actividadEconomica,
               "value": data.idActividadEconomica,
               "level": this.tabselected,
               "codigo": this.actividadEconomica.codigoActividadEconomica,
               "children": chil
            };
            this.listadoActividadEconomica.push(data);
            if (this.actividadEconomica.idActividadPadre == 0) {
               this.treeActividadEconomica.push(newChil);
               this.newActivity();
            } else {
               this.selectedNode.children.push(newChil);
               this.newSubActivity();
            }
            
         });
      } else {
         this.msgs.push({severity: 'info', summary: 'Guardando...', detail: 'Actualizando registro'});
         this.actividadEconomicaService.updateActividadEconomica(this.actividadEconomica).then(data => {
            this.selectedNode.label = this.actividadEconomica.actividadEconomica;
            this.header = this.actividadEconomica.actividadEconomica;
            for (let i = 0; i < this.listadoActividadEconomica.length; i++) {
               if (this.listadoActividadEconomica[i].idActividadEconomica === data.idActividadEconomica) {
                  this.listadoActividadEconomica[i] = data;
                  return;
               }
            }
         });
      }
   }
   
   doCancel() {
      if (this.actividadEconomica.actividadEconomica == null || this.actividadEconomica.idActividadEconomica == 0) {
         this.actividadEconomica = new ActividadEconomica;
      } else {
         this.actividadEconomicaService.viewActividadEconomica(this.actividadEconomica.idActividadEconomica).subscribe(res => {
            this.actividadEconomica = res;
         });
      }
      this.displayDialog = false;
   }
   
   newActivity() {
      this.actividadEconomica = new ActividadEconomica();
      this.tabselected = 1;
      this.header = 'Nuevo Grandes Grupos';
      this.labelfieldactividad = "Nombre";
      this.actividadEconomica.idActividadPadre = 0;
      this.actividadEconomica.idActividadTipo = this.getIdTypebyCodigo("1");
      this.actividadEconomica.indicadorHabilitado = true;
      this.labelPadre = "";
      this.labelTipo = "Tipo: " + this.getTypebyCodigo('1');
      
      
   }
   
   newSubActivity() {
      this.actividadEconomica = new ActividadEconomica();
      this.tabselected = this.selectedNode.level + 1;
      this.labeltabselected = this.tabselected.toString();
      this.header = 'Nuevo ' + this.getTypebyCodigo(this.labeltabselected);
      this.labelfieldactividad = "Nombre " + this.getTypebyCodigo(this.labeltabselected);
      this.actividadEconomica.idActividadPadre = this.btnsubactivity.idparent;
      this.actividadEconomica.codigoActividadEconomica = this.selectedNode.codigo;
      this.actividadEconomica.idActividadTipo = this.getIdTypebyCodigo(this.labeltabselected);
      this.actividadEconomica.indicadorHabilitado = true;
      this.labelPadre = this.getTypebyCodigo(this.selectedNode.level.toString()) + ": " + this.btnsubactivity.parent;
      this.labelTipo = "Tipo: " + this.getTypebyCodigo(this.labeltabselected);
   }
   
   getTypebyCodigo(id: string) {
      let nameactividadEconomica: string = "";
      for (let c of  this.activityTypes.filter(t => t.codigoActividadTipo.toString() == id)) {
         nameactividadEconomica = c.descripcionActividadTipo;
      }
      return nameactividadEconomica;
      
   }
   
   getIdTypebyCodigo(id: string) {
      let idActividadEconomicaTipo: number = 0;
      
      for (let c of  this.activityTypes.filter(t => t.codigoActividadTipo.toString() == id)) {
         idActividadEconomicaTipo = c.idActividadEconomicaTipo;
      }
      return idActividadEconomicaTipo;
   }
   
   validateCode() {
      this.codeExists = this.listadoActividadEconomica.filter(t => (t.codigoActividadEconomica === this.actividadEconomica.codigoActividadEconomica && this.actividadEconomica.idActividadEconomica != t.idActividadEconomica)).length > 0;
   }
   
   
   search(event: any) {
      this.actividadEconomicaService.getSearch(event.query).subscribe(
         lis => this.resultSearch = lis
      );
   }
   
   captureId(event: Search) {
      // ScrollTo 0;
      jQuery('#trvActividadEconomica').scrollTop(0);
      
      this.actividadEconomicaService.viewActividadEconomica(event.value).subscribe(res => {
         this.actividadEconomica = res;
         this.searchRecursive(res);
         this.header = res.actividadEconomica;
         if (res.idActividadPadre != 0) {
            this.actividadEconomicaService.viewActividadEconomica(res.idActividadPadre).subscribe(res => {
               this.labelPadre = res.actividadEconomica;
               // Scroll to Select
               jQuery('#trvActividadEconomica').scrollTop(jQuery('.ui-state-highlight').position().top - jQuery('#trvActividadEconomica').height() / 2);
               
            });
         } else {
            this.labelPadre = "";
         }
         this.labelTipo = "Tipo: " + this.activityTypes.find(t => t.idActividadEconomicaTipo == res.idActividadTipo).descripcionActividadTipo;
      });
   }
   
   private searchRecursive(res:ActividadEconomica){
      let node4 : number = 0;
      let node3 : number = 0;
      let node2 : number = 0;
      let node1 : number = 0;
      let nivel = this.activityTypes.find(t => t.idActividadEconomicaTipo == res.idActividadTipo).codigoActividadTipo;
      
      switch (nivel.toString()){
         case "1":
            node1 = res.idActividadEconomica;
            break;
         case "2":
            node2 = res.idActividadEconomica;
            node1 = res.idActividadPadre;
            break;
         case "3":
            node3 = res.idActividadEconomica;
            node2 = res.idActividadPadre;
            node1 = this.listadoActividadEconomica.find(t => t.idActividadEconomica == res.idActividadPadre).idActividadPadre;
            break;
         case "4":
            node4 = res.idActividadEconomica;
            node3 = res.idActividadPadre;
            node2 = this.listadoActividadEconomica.find(t => t.idActividadEconomica == node3).idActividadPadre;
            node1 = this.listadoActividadEconomica.find(t => t.idActividadEconomica == node2).idActividadPadre;
            break;
      }
      if(node1 > 0 ){
         this.searchLevel(node1, 1);
      }
      if(node2 > 0 ){
         this.searchLevel(node2, 2);
      }
      if(node3 > 0 ){
         this.searchLevel(node3, 3);
      }
      if(node4 > 0 ){
         this.searchLevel(node4, 4);
      }
      
      this.treeselected = this.selectedNode;
      this.selectedSearch = null;
      this.nodeSelect(this.selectedNode);
   }
   
   private searchLevel(id:number,tipo:number){
      
      if(tipo == 1){
         this.treeActividadEconomica.forEach( node => {
            if(node.value == id){
               node.expanded = true;
               this.nodeExpand(node);
               this.selectedNode = node;
            } else {
               node.expanded = false;
            }
         });
      }else{
         if(this.selectedNode.children) {
            this.selectedNode.children.forEach( childNode => {
               if (childNode.value == id) {
                  childNode.expanded = true;
                  this.nodeExpand(childNode);
                  this.selectedNode = childNode;
               } else {
                  childNode.expanded = false;
               }
            });
         }
      }
   }
   
   private nodeExpandRecursive(node: any) {
      let ocupacionesNivel: any[] = [];
      let chil: any;
      if (node.level == 3) {
         chil = [];
      } else {
         
         chil = [{
            "value": 0,
            "label": '+ Cargando...',
            "level": node.level + 2,
            "codigo": ''
         }]
      }
      for (let c of this.listadoActividadEconomica.filter(t => t.idActividadPadre == node.value)) {
         ocupacionesNivel.push({
                                  "value": c.idActividadEconomica,
                                  "label": c.actividadEconomica,
                                  "level": node.level + 1,
                                  "codigo": c.codigoActividadEconomica,
                                  "children": chil
                               });
      }
      node.children = ocupacionesNivel;
   }
   
   capitalizeCodigo() {
      let input = this.actividadEconomica.codigoActividadEconomica;
      if(input != "" && input != null){
         this.actividadEconomica.codigoActividadEconomica = input.toUpperCase();
      }
   }
   
   capitalizeName() {
      let input = this.actividadEconomica.actividadEconomica;
      if(input != "" && input != null){
         this.actividadEconomica.actividadEconomica = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
      }
   }
}
class Tree {
   value: number;
   label: string;
   level: number;
   codigo: string;
   expanded:boolean;
   children: Tree[];
}
