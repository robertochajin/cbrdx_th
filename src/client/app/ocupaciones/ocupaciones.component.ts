import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Ocupaciones} from "../_models/ocupaciones";
import {OcupacionesTipos} from "../_models/ocupacionesTipos";
import {OcupacionesService} from "../_services/ocupaciones.service";
import {TreeNode, SelectItem} from "primeng/components/common/api";
import {Message} from "primeng/primeng";
import {Search} from "../_models/search";
import { NavService } from "../_services/_nav.service";

@Component({
    moduleId: module.id,
    templateUrl: 'ocupaciones.component.html',
    selector: 'ocupaciones'
})
export class OcupacionesComponent implements OnInit {
    msg: Message;
    ocupaciones: Ocupaciones = new Ocupaciones();
    listadoOcupaciones: Ocupaciones[];
    ocupacionesTypes: OcupacionesTipos[] = [];
    treeocupaciones: any[] = [];
    treeselected: TreeNode;
    selectedNode: Tree;
    tabselected: number = 1;
    labeltabselected: string;
    header: string;
    labelPadre: string;
    labelTipo: string;
    labelfieldocupacion: string;
    codeExists: boolean = false;
    displayDialog: boolean = false;
    submitted: boolean = false;
    resultSearch: Search[];
    selectedSearch: SelectItem;

    btnoccupation: {show: boolean, label: string, idparent: number, parent: string} = {
        show: true,
        label: 'Agregar Grandes Grupos',
        parent: '',
        idparent: 0
    };
    btnsubocupation: {show: boolean, label: string, idparent: number, parent: string} = {
        show: false,
        label: '',
        parent: '',
        idparent: 0
    };


    constructor(private router: Router,
                private ocupacionesService: OcupacionesService,
                private navService : NavService
    ) {

        ocupacionesService.listOcupaciones().subscribe(res => {
            this.listadoOcupaciones = res;
            for (let c of this.listadoOcupaciones.filter(t => t.idOcupacionPadre == 0)) {
                this.treeocupaciones.push({
                    "value": c.idOcupacion,
                    "label": c.ocupacion,
                    "level": 1,
                    "codigo": c.codigoOcupacion,
                    "children": [{
                        "value": 0,
                        "label": '+ Cargando...',
                        "level": 2,
                        "codigo": "",
                        "children": {}
                    }]
                });
            }

        });
        ocupacionesService.listOcupacionesTipos().subscribe(listadoOcupacionesTipos => {
            this.ocupacionesTypes = listadoOcupacionesTipos;
            this.ocupaciones.idOcupacionTipo = this.getIdTypebyCodigo("1");
        });
    }

    ngOnInit(): void {
        this.newOccupation();
    }

    goBack(): void {
        this.router.navigate(['ocupaciones']);
    }

    nodeExpand(node: any) {
        let ocupacionesNivel: any[] = [];
        let chil: any;
        if (node.level == 3) {
            chil = [];
        } else {

            chil = [{
                "value": 0,
                "label": '+ Cargando...',
                "level": node.level + 2,
                "codigo": '',
            }]
        }
        for (let c of this.listadoOcupaciones.filter(t => t.idOcupacionPadre == node.value)) {
            ocupacionesNivel.push({
                "value": c.idOcupacion,
                "label": c.ocupacion,
                "level": node.level + 1,
                "codigo": c.codigoOcupacion,
                "parent": node,
                "children": chil
            });
        }
        node.children = ocupacionesNivel;
    }

    nodeSelect(node: any) {

        this.selectedNode = node;
        this.treeselected = node;
        this.tabselected = node.level;
        this.header = node.label;
        this.btnsubocupation.show = false;

        switch (this.tabselected) {
            case 1:
                this.labelfieldocupacion = "Nombre";
                this.labelPadre = "";
                this.labelTipo = "Tipo: " + this.getTypebyCodigo('1');
                this.btnoccupation = {
                    show: true,
                    label: 'Agregar Grandes Grupos',
                    parent: node.label,
                    idparent: 0
                };
                this.btnsubocupation = {
                    show: true,
                    label: 'Agregar ' + this.getTypebyCodigo('2'),
                    parent: node.label,
                    idparent: node.value
                };
                break;

            case 2:
                this.labelfieldocupacion = "Nombre " + this.getTypebyCodigo('2');
                this.labelPadre = this.getTypebyCodigo('1') + ": " + node.parent.label;
                this.labelTipo = "Tipo: " + this.getTypebyCodigo('2');
                this.btnsubocupation = {
                    show: true,
                    label: 'Agregar ' + this.getTypebyCodigo('3'),
                    parent: node.label,
                    idparent: node.value
                };
                break;

            case 3:
                this.labelfieldocupacion = "Nombre " + this.getTypebyCodigo('3');
                this.labelPadre = this.getTypebyCodigo('2') + ": " + node.parent.label;
                this.labelTipo = "Tipo: " + this.getTypebyCodigo('3');
                this.btnsubocupation = {
                    show: true,
                    label: 'Agregar ' + this.getTypebyCodigo('4'),
                    parent: node.label,
                    idparent: node.value
                };
                break;

            case 4:
                this.labelfieldocupacion = "Nombre " + this.getTypebyCodigo('3');
                this.labelPadre = this.getTypebyCodigo('3') + ": " + node.parent.label;
                this.labelTipo = "Tipo: " + this.getTypebyCodigo('4');
                break;

        }

        this.ocupacionesService.viewOcupaciones(node.value).subscribe(
            ocupaciones => {
                this.ocupaciones = ocupaciones;
                this.validateCode();
            });
    }


    save() {
     
        if (this.ocupaciones.idOcupacion == null || this.ocupaciones.idOcupacion == 0) {
            this.ocupacionesService.addOcupaciones(this.ocupaciones).then(data => {
               let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
               this.navService.setMesage(typeMessage, this.msg);
                let chil: any[] = [];
                if (this.tabselected <= 3) {
                    chil = [{
                        "value": 0,
                        "label": '+ Cargando...',
                        "level": this.tabselected + 1,
                        "codigo": ''
                    }]
                }
                let newChil: any = {
                    "label": this.ocupaciones.ocupacion,
                    "value": data.idOcupacion,
                    "level": this.tabselected,
                    "codigo": this.ocupaciones.codigoOcupacion,
                    "children": chil
                };
                this.listadoOcupaciones.push(data);
                if (this.ocupaciones.idOcupacionPadre == 0) {
                    this.treeocupaciones.push(newChil);
                    this.newOccupation();
                } else {
                    //this.selectedNode.expanded = false;
                    //this.nodeExpand(this.selectedNode);
                    this.selectedNode.children.push(newChil);
                    this.newSubOccupation();
                }


            }, error => {
               let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
               this.navService.setMesage(typeMessage, this.msg);
            } );
        } else {
            this.ocupacionesService.updateOcupaciones(this.ocupaciones).then(data => {
               let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
               this.navService.setMesage(typeMessage, this.msg);
                this.selectedNode.label = this.ocupaciones.ocupacion;
                this.header = this.ocupaciones.ocupacion;
                for (let i = 0; i < this.listadoOcupaciones.length; i++) {
                    if (this.listadoOcupaciones[i].idOcupacion === this.ocupaciones.idOcupacion) {
                        this.listadoOcupaciones[i] = this.ocupaciones;
                        return;
                    }
                }

            }, error => {
               let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
               this.navService.setMesage(typeMessage, this.msg);
            } );
        }
    }

    doCancel() {
        if (this.ocupaciones.idOcupacion == null || this.ocupaciones.idOcupacion == 0) {
            this.ocupaciones = new Ocupaciones;
        } else {
            this.ocupacionesService.viewOcupaciones(this.ocupaciones.idOcupacion).subscribe(res => {
                this.ocupaciones = res;
            });
        }
        this.displayDialog = false;
    }

    newOccupation() {
        this.submitted = false;
        //let oForm = document.getElementById('formName').reset();
        this.ocupaciones = new Ocupaciones();
        this.tabselected = 1;
        this.header = 'Nuevo Grandes Grupos';
        this.labelfieldocupacion = "Nombre";
        this.ocupaciones.idOcupacionPadre = 0;
        this.ocupaciones.idOcupacionTipo = this.getIdTypebyCodigo("1");
        this.ocupaciones.indicadorHabilitado = true;
        this.labelPadre = "";
        this.labelTipo = "Tipo: " + this.getTypebyCodigo('1');

    }

    newSubOccupation() {
        this.submitted = false;
        //let oForm = document.getElementById('formName').reset();
        this.ocupaciones = new Ocupaciones();
        this.tabselected = this.selectedNode.level + 1;
        this.labeltabselected = this.tabselected.toString();
        this.header = 'Nuevo ' + this.getTypebyCodigo(this.labeltabselected);
        this.labelfieldocupacion = "Nombre " + this.getTypebyCodigo(this.labeltabselected);
        this.ocupaciones.idOcupacionPadre = this.btnsubocupation.idparent;
        this.ocupaciones.codigoOcupacion = this.selectedNode.codigo;
        this.ocupaciones.idOcupacionTipo = this.getIdTypebyCodigo(this.labeltabselected);
        this.ocupaciones.indicadorHabilitado = true;
        this.labelPadre = this.getTypebyCodigo(this.selectedNode.level.toString()) + ": " + this.btnsubocupation.parent;
        this.labelTipo = "Tipo: " + this.getTypebyCodigo(this.labeltabselected);

        //console.info(this.tabselected);
    }

    getTypebyCodigo(id: string) {
        let nameactividadEconomica: string = '';

        for (let c of  this.ocupacionesTypes.filter(t => t.codigoOcupacionTipo.toString() == id)) {
            nameactividadEconomica = c.descripcionOcupacionTipo;
        }
        return nameactividadEconomica;
    }

    getIdTypebyCodigo(id: string) {
        let idOcupacionTipo: number = 0;

        for (let c of  this.ocupacionesTypes.filter(t => t.codigoOcupacionTipo.toString() == id)) {
            idOcupacionTipo = c.idOcupacionTipo;
        }
        return idOcupacionTipo;
    }

    validateCode() {
        this.codeExists = this.listadoOcupaciones.filter(t => (t.codigoOcupacion === this.ocupaciones.codigoOcupacion && this.ocupaciones.idOcupacion != t.idOcupacion)).length > 0;
    }

    onSubmit() {
        this.submitted = true;
    }

    search(event: any) {
        this.ocupacionesService.getSearch(event.query).subscribe(
            lis => this.resultSearch = lis
        );
    }

    captureId(event: Search) {
        // ScrollTo 0;
        jQuery('#trvOcupaciones').scrollTop(0);

        this.ocupacionesService.viewOcupaciones(event.value).subscribe(res => {
            this.ocupaciones = res;
            this.searchRecursive(res);
            this.header = res.ocupacion;
            if (res.idOcupacionPadre != 0) {
                this.ocupacionesService.viewOcupaciones(res.idOcupacionPadre).subscribe(r => {
                    this.labelPadre = r.ocupacion;
                     this.codeExists = false;
                });
            } else {
                this.labelPadre = "";
            }
            this.labelTipo = "Tipo: " + this.ocupacionesTypes.find(t => t.idOcupacionTipo == res.idOcupacionTipo).descripcionOcupacionTipo;

           // Scroll to Select
           setTimeout(() => {
              jQuery('#trvOcupaciones').scrollTop(
                 jQuery('.ui-state-highlight').position().top - jQuery('#trvOcupaciones').height() / 2
              );
           }, 500);

        });


    }

    private searchRecursive(res:Ocupaciones){
        let node4 : number = 0;
        let node3 : number = 0;
        let node2 : number = 0;
        let node1 : number = 0;
        let nivel = this.ocupacionesTypes.find(t => t.idOcupacionTipo == res.idOcupacionTipo).codigoOcupacionTipo;

        switch (nivel.toString()){
            case "1":
                node1 = res.idOcupacion;
                break;
            case "2":
                node2 = res.idOcupacion;
                node1 = res.idOcupacionPadre;
                break;
            case "3":
                node3 = res.idOcupacion;
                node2 = res.idOcupacionPadre;
                node1 = this.listadoOcupaciones.find(t => t.idOcupacion == res.idOcupacionPadre).idOcupacionPadre;
                break;
            case "4":
                node4 = res.idOcupacion;
                node3 = res.idOcupacionPadre;
                node2 = this.listadoOcupaciones.find(t => t.idOcupacion == node3).idOcupacionPadre;
                node1 = this.listadoOcupaciones.find(t => t.idOcupacion == node2).idOcupacionPadre;
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
            this.treeocupaciones.forEach( node => {
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
        for (let c of this.listadoOcupaciones.filter(t => t.idOcupacionPadre == node.value)) {
            ocupacionesNivel.push({
                "value": c.idOcupacion,
                "label": c.ocupacion,
                "level": node.level + 1,
                "codigo": c.codigoOcupacion,
                "children": chil
            });
        }
        node.children = ocupacionesNivel;
    }
    
    capitalizeCodigo() {
      let input = this.ocupaciones.codigoOcupacion;
      if(input != "" && input != null){
        this.ocupaciones.codigoOcupacion = input.toUpperCase().replace(/[^A-Z0-9]/,'').trim();
      }
    }
    
    capitalizeName() {
      let input = this.ocupaciones.ocupacion;
      if(input != "" && input != null){
        this.ocupaciones.ocupacion = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
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
