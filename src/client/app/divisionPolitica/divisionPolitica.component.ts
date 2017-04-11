import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DivisionPoliticaService} from "../_services/divisionPolitica.service";
import {DivisionPolitica} from "../_models/divisionPolitica";
import {DivisionPoliticaAreas} from "../_models/divisionPoliticaAreas";
import {DivisionPoliticaLocalidades} from "../_models/divisionPoliticaLocalidades";
import {DivisionPoliticaResguardos} from "../_models/divisionPoliticaResguardos";
import {DivisionPoliticaComunas} from "../_models/divisionPoliticaComunas";
import {DivisionPoliticaTipos} from "../_models/divisionPoliticaTipos";
import {TreeNode} from "primeng/components/common/api";
import {SelectItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {Search} from "../_models/search";

@Component({
    moduleId: module.id,
    templateUrl: 'divisionPolitica.component.html',
    selector: 'divisionPolitica',

})
export class DivisionPoliticaComponent implements OnInit {
    msgs: Message[] = [];
    politicalDivision: DivisionPolitica = new DivisionPolitica();
    listadoDivisionPolitica: DivisionPolitica[];
    listadoTodo: DivisionPolitica[];
    listadoDivisionPoliticaAreas: DivisionPoliticaAreas[];
    listadoDivisionPoliticaLocalidades: DivisionPoliticaLocalidades[];
    listadoDivisionPoliticaResguardos: DivisionPoliticaResguardos[];
    listadoDivisionPoliticaComunas: DivisionPoliticaComunas[];
    listadoDivisionPoliticaTipos: DivisionPoliticaTipos[];

    divisionPoliticaAreas: SelectItem[] = [];
    divisionPoliticaLocalidades: SelectItem[] = [];
    divisionPoliticaResguardos: SelectItem[] = [];
    divisionPoliticaComunas: SelectItem[] = [];
    divisionPoliticaTipos: SelectItem[] = [];
    divisionPoliticaEstrato: SelectItem[] = [];

    treedivisionPolitica: TreeNode[] = [];
    selectedNode: TreeNode;
    selectedNodeTemp: TreeNode;
    tabselected: number;
    header: string;
    labelPadre: string;
    divisionPolitica: any[] = [];
    labeldescripcionDivisonPolitica:string;
    btnnuevopais:{show:boolean,label:string,idparent:number,parent:string} = {show:true,label:'Agregar País', parent:'', idparent:0};
    btnnuevodepartamento:{show:boolean,label:string,idparent:number,parent:string} = {show:false,label:'', parent:'', idparent:0};
    btnnuevomunicipio:{show:boolean,label:string,idparent:number,parent:string} = {show:false,label:'', parent:'', idparent:0};
    btnnuevobarrio:{show:boolean,label:string,idparent:number,parent:string} = {show:false,label:'', parent:'', idparent:0};
    displayDialog:boolean = false;
    Comunas:boolean = false;
    Localidades:boolean = false;
    Resguardos:boolean = false;
    resultSearch: Search[];
    selectedSearch: SelectItem;
    codeExists: boolean = false;

    constructor(private router: Router, private divisionPoliticaService: DivisionPoliticaService) {
        divisionPoliticaService.listByPadreDivisionPolitica(0).subscribe(res => {
            this.listadoDivisionPolitica = res;
            for (let c of this.listadoDivisionPolitica) {
                this.treedivisionPolitica.push({
                    "label": c.descripcionDivisonPolitica,
                    "data": c,
                    "children": [{
                                    "label": '+ Cargando...',
                                    "data":""
                                }]
                });
            }
        });
        divisionPoliticaService.listDivisionPolitica().subscribe(res => {
            this.listadoTodo = res;
        });
        this.divisionPoliticaEstrato.push({label:'1', value:1});
        this.divisionPoliticaEstrato.push({label:'2', value:2});
        this.divisionPoliticaEstrato.push({label:'3', value:3});
        this.divisionPoliticaEstrato.push({label:'4', value:4});
        this.divisionPoliticaEstrato.push({label:'5', value:5});
        this.divisionPoliticaEstrato.push({label:'6', value:6});

        this.divisionPoliticaService.listDivisionPoliticaAreas().subscribe(res => {
            this.listadoDivisionPoliticaAreas = res;

            for (let dp of this.listadoDivisionPoliticaAreas) {

                this.divisionPoliticaAreas.push({
                    label: dp.descripcionDivisionPoliticaArea,
                    value: dp.idDivisionPoliticaArea
                });
            }
        });
        this.divisionPoliticaService.listDivisionPoliticaLocalidades().subscribe(res => {
            this.listadoDivisionPoliticaLocalidades = res;
            for (let dp of this.listadoDivisionPoliticaLocalidades) {
                this.divisionPoliticaLocalidades.push({
                    label: dp.descripcion,
                    value: dp.idDivisionPoliticaLocalidad
                });
            }
        });
        this.divisionPoliticaService.listDivisionPoliticaResguardos().subscribe(res => {
            this.listadoDivisionPoliticaResguardos = res;
            for (let dp of this.listadoDivisionPoliticaResguardos) {
                this.divisionPoliticaResguardos.push({
                    label: dp.descripcionDivisionPoliticaResguardo,
                    value: dp.idDivisionPoliticaResguardo
                });
            }
        });
        this.divisionPoliticaService.listDivisionPoliticaComunas().subscribe(res => {
            this.listadoDivisionPoliticaComunas = res;
            for (let dp of this.listadoDivisionPoliticaComunas) {
                this.divisionPoliticaComunas.push({
                    label: dp.descripcion,
                    value: dp.idDivisionPoliticaComuna
                });
            }
        });
        this.divisionPoliticaService.listDivisionPoliticaTipos().subscribe(res => {
            this.listadoDivisionPoliticaTipos = res;
            this.newCountry();
            //console.info(res);
        });

    }

    ngOnInit(): void {
        //this.newCountry();
    }

    goBack(): void {
        this.router.navigate(['divisionPolitica']);
    }

    nodeExpand(node:any) {
        let divisionPoliticaNivel: any[] = [];
        let chil: any;
        let tabselected = this.getCodigoTypebyId(node.data.idDivisionPoliticaTipo).length;
        if (tabselected >= 3) {
            chil = [];
        } else {
            chil = [{
                "label": '+ Cargando...',
            }]
        }
        for (let c of this.listadoTodo.filter(t => t.idDivisionPoliticaPadre == node.data.idDivisionPolitica)) {
            divisionPoliticaNivel.push({
                "label": c.descripcionDivisonPolitica,
                "data": c,
                "parent":node,
                "children": chil
            });
        }
        node.children = divisionPoliticaNivel;

   }

    nodeSelect(node:any){

        let nodeCode = this.getCodigoTypebyId(node.data.idDivisionPoliticaTipo);

        this.tabselected = nodeCode.length;
        //console.info(node.data);

        this.header = node.data.descripcionDivisonPolitica;
        this.btnnuevodepartamento.show = false;
        this.btnnuevomunicipio.show = false;
        this.btnnuevobarrio.show = false;

        switch (this.tabselected){
            case 1:

                this.getTipoPais();
                this.labeldescripcionDivisonPolitica = "Nombre del País";
                this.labelPadre = "";
                this.btnnuevopais = {
                    show:true,
                    label:'Nuevo País ',
                    parent:node.label,
                    idparent:0
                };
                this.btnnuevodepartamento = {
                    show:true,
                    label:'Nuevo departamento de ' + node.label,
                    parent:node.label,
                    idparent:node.data.idDivisionPolitica
                };
                break;

            case 2:
                this.getTiposHijos(nodeCode.substr(0,1));
                this.labeldescripcionDivisonPolitica = "Nombre del Departamento";
                this.labelPadre = "País: " + node.parent.label;
                this.btnnuevomunicipio = {
                    show:true,
                    label:'Nuevo municipio de ' + node.label,
                    parent:node.label,
                    idparent:node.data.idDivisionPolitica
                };
                break;

            case 3:
                this.getTiposHijos(nodeCode.substr(0,2));
                this.labeldescripcionDivisonPolitica = "Nombre del Municipio";
                this.labelPadre = "Departamento: " + node.parent.label;
                this.btnnuevobarrio = {
                    show:true,
                    label:'Nueva barrio de ' + node.label,
                    parent:node.label,
                    idparent:node.data.idDivisionPolitica
                };
                break;

            case 4:
                nodeCode = this.getCodigoTypebyId(node.parent.data.idDivisionPoliticaTipo);
                this.getTiposHijos(nodeCode.substr(0,3));
                this.labeldescripcionDivisonPolitica = "Nombre del Barrio";
                this.labelPadre = "Ciudad: " + node.parent.label;
                break;

        }

        this.divisionPoliticaService.viewDivisionPolitica(node.data.idDivisionPolitica).subscribe(
            politicalDivision => {
               this.politicalDivision = politicalDivision;
               this.validateCode();
            });
    }


    save() {
        if(this.politicalDivision.idDivisionPolitica == null || this.politicalDivision.idDivisionPolitica == 0){
            //console.info(this.politicalDivision);
            
             this.divisionPoliticaService.addDivisionPolitica(this.politicalDivision).then(data => {
                  this.msgs.push({severity:'info', summary:'Guardando...', detail:'Nuevo registro'});
                 let  chil: any[] =[];
                 if(this.tabselected <= 3){
                     chil = [{
                         "label": '+ Cargando...',
                     }]
                 }
                 let newChil: any = {
                     "label": this.politicalDivision.descripcionDivisonPolitica,
                     "data": data,
                     "children": chil
                 };
                 //console.info(this.politicalDivision);
                this.listadoTodo.push(data);
                 if (this.politicalDivision.idDivisionPoliticaPadre == 0) {
                     this.treedivisionPolitica.push(newChil);
                     this.newCountry();
                 } else {
                     this.selectedNode.children.push(newChil);
                     switch (this.tabselected){
                         case 2:
                             this.newDepartment();
                             break;
                         case 3:
                             this.newCity();
                            break;
                         case 4:
                             this.newNeighborhood();
                            break;
                     }
                 }
            }, error => {
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
             });
        }else{
            this.msgs.push({severity:'info', summary:'Guardando...', detail:'Nuevo registro'});
            this.divisionPoliticaService.updateDivisionPolitica(this.politicalDivision).then(data => {
                this.selectedNode.data = this.politicalDivision;
                this.selectedNode.label = this.politicalDivision.descripcionDivisonPolitica;
                this.header = this.politicalDivision.descripcionDivisonPolitica;
                for (let i = 0; i < this.listadoTodo.length; i++) {
                    if (this.listadoTodo[i].idDivisionPolitica === this.politicalDivision.idDivisionPolitica) {
                        this.listadoTodo[i] = this.politicalDivision;
                        return;
                    }
                }
            });
        }
    }

    newCountry(){
        this.politicalDivision = new DivisionPolitica();
        this.tabselected = 1;
        this.header = 'Nuevo país';
        this.labeldescripcionDivisonPolitica = "Nombre del País";
        this.labelPadre = "";
        this.politicalDivision.idDivisionPoliticaPadre = 0;
        this.getTipoPais();
        this.codeExists = false;
    }

    newDepartment(){
        this.politicalDivision = new DivisionPolitica();
        this.tabselected = 2;
        this.header = 'Nuevo Departamento';
        this.labelPadre =  "Pais: "+this.btnnuevodepartamento.parent;
        this.labeldescripcionDivisonPolitica = "Nombre del Departamento";
        this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevodepartamento.idparent;
        let nodeCode = this.getCodigoTypebyId(this.selectedNode.data.idDivisionPoliticaTipo);
        this.getTiposHijos(nodeCode.substr(0,2));
        this.codeExists = false;
    }

    newCity(){
        this.politicalDivision = new DivisionPolitica();
        this.tabselected = 3;
        this.header = 'Nuevo Municipio';
        this.labelPadre =  "Departamento: "+this.btnnuevomunicipio.parent;
        this.labeldescripcionDivisonPolitica = "Nombre del Municipio";
        this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevomunicipio.idparent;
        this.politicalDivision.codigoDivisionPolitica = this.selectedNode.data.codigoDivisionPolitica;
        let nodeCode = this.getCodigoTypebyId(this.selectedNode.data.idDivisionPoliticaTipo);
        this.getTiposHijos(nodeCode.substr(0,2));
        this.codeExists = false;
    }

    newNeighborhood(){
        this.politicalDivision = new DivisionPolitica();
        this.tabselected = 4;
        this.header = 'Nuevo barrio';
        this.labelPadre =  "Municipio: "+this.btnnuevobarrio.parent;
        this.labeldescripcionDivisonPolitica = "Nombre del Barrio";
        this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevobarrio.idparent;
        this.politicalDivision.codigoDivisionPolitica = this.selectedNode.data.codigoDivisionPolitica;
        let nodeCode = this.getCodigoTypebyId(this.selectedNode.data.idDivisionPoliticaTipo);
        this.getTiposHijos(nodeCode.substr(0,3));
        this.codeExists = false;
    }

    getTipoPais():void {
        this.divisionPoliticaTipos = [];
        for (let dp of this.listadoDivisionPoliticaTipos.filter(t => t.codigoDivisionPoliticaTipo.length==1)) {
            this.divisionPoliticaTipos.push({
                label: dp.descripcionTipo,
                value: dp.idDivisionPoliticaTipo
            });
        }
        this.politicalDivision.idDivisionPoliticaTipo = this.divisionPoliticaTipos[0].value;
    }

    getTiposHijos(id: string):void {
        this.divisionPoliticaTipos = [];
        for (let dp of this.listadoDivisionPoliticaTipos.filter(t => t.codigoDivisionPoliticaTipo.startsWith(id) && t.codigoDivisionPoliticaTipo.length == id.length+1)) {
            this.divisionPoliticaTipos.push({
                label: dp.descripcionTipo,
                value: dp.idDivisionPoliticaTipo
            });
        }
        this.politicalDivision.idDivisionPoliticaTipo = this.divisionPoliticaTipos[0].value;
        this.changeTipoID(this.politicalDivision.idDivisionPoliticaTipo);
        //console.log(this.politicalDivision);
    }

    getCodigoTypebyId(id: number ) {
        let nivel:string =  "1";
        for (let dp of this.listadoDivisionPoliticaTipos.filter(t => t.idDivisionPoliticaTipo == id)) {
            nivel = dp.codigoDivisionPoliticaTipo;
            break;
        }
        return nivel;
    }

    doCancel() {
        if (this.politicalDivision.idDivisionPolitica == null || this.politicalDivision.idDivisionPolitica == 0) {
            this.politicalDivision = new DivisionPolitica;
        } else {
            this.divisionPoliticaService.viewDivisionPolitica(this.politicalDivision.idDivisionPolitica).subscribe(res => {
                this.politicalDivision = res;
            });
        }
        this.displayDialog=false;
    }

    changeTipo(event:any){
        let codigo = this.getCodigoTypebyId(event.value);
        this.Comunas = false;
        this.Localidades = false;
        this.Resguardos = false;

        if(codigo == '1112'){
            this.Comunas = true;
        }
        if(codigo == '1121' || codigo == '1131'){
            this.Localidades = true;
        }
        if(codigo == '1151'){
            this.Resguardos = true;
        }
    }

    changeTipoID(id:number){
        let codigo = this.getCodigoTypebyId(id);
        this.Comunas = false;
        this.Localidades = false;
        this.Resguardos = false;

        if(codigo == '1112'){
            this.Comunas = true;
        }
        if(codigo == '1121' || codigo == '1131'){
            this.Localidades = true;
        }
        if(codigo == '1151'){
            this.Resguardos = true;
        }
    }


    search(event: any) {
        this.divisionPoliticaService.getSearch(event.query).subscribe(
            lis => this.resultSearch = lis
        );
    }

    captureId(event: Search) {
      // ScrollTo 0;
      jQuery('#trvDivisionPolitica').scrollTop(0);

        this.divisionPoliticaService.viewDivisionPolitica(event.value).subscribe(res => {
            this.politicalDivision = res;
            this.searchRecursive(res);
            this.header = res.descripcionDivisonPolitica;
            let nodeCode = this.getCodigoTypebyId(res.idDivisionPoliticaTipo);
            this.getTiposHijos(nodeCode.substr(0,nodeCode.length-1));
            if (res.idDivisionPolitica != 0) {
                this.divisionPoliticaService.viewDivisionPolitica(res.idDivisionPoliticaPadre).subscribe(res => {
                    this.labelPadre = res.descripcionDivisonPolitica;
                    this.codeExists = false;

                });
            } else {
                this.labelPadre = "";
            }

           // Scroll to Select
           jQuery('#trvDivisionPolitica').scrollTop(
              jQuery('.ui-state-highlight').position().top - jQuery('#trvDivisionPolitica').height() / 2
           );
        });
    }

    private searchRecursive(res:DivisionPolitica){
        let node4 : number = 0;
        let node3 : number = 0;
        let node2 : number = 0;
        let node1 : number = 0;
        let nivel = this.listadoDivisionPoliticaTipos.find(t => t.idDivisionPoliticaTipo == res.idDivisionPoliticaTipo).codigoDivisionPoliticaTipo.length;

        switch (nivel.toString()){
            case "1":
                node1 = res.idDivisionPolitica;
                break;
            case "2":
                node2 = res.idDivisionPolitica;
                node1 = res.idDivisionPoliticaPadre;
                break;
            case "3":
                node3 = res.idDivisionPolitica;
                node2 = res.idDivisionPoliticaPadre;
                node1 = this.listadoTodo.find(t => t.idDivisionPolitica == res.idDivisionPoliticaPadre).idDivisionPoliticaPadre;
                break;
            case "4":
                node4 = res.idDivisionPolitica;
                node3 = res.idDivisionPoliticaPadre;
                node2 = this.listadoTodo.find(t => t.idDivisionPolitica == node3).idDivisionPoliticaPadre;
                node1 = this.listadoTodo.find(t => t.idDivisionPolitica == node2).idDivisionPoliticaPadre;
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

        this.selectedSearch = null;
        this.nodeSelect(this.selectedNode);


    }

    private searchLevel(id:number,tipo:number){

        if(tipo == 1){
            this.treedivisionPolitica.forEach( node => {
                if(node.data.idDivisionPolitica == id){
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
                    if (childNode.data.idDivisionPolitica == id) {
                        childNode.expanded = true;
                        if(tipo != 4){
                            this.nodeExpand(childNode);
                        }
                        this.selectedNode = childNode;
                    } else {
                        childNode.expanded = false;
                    }
                });
            }
        }
    }
  
  validateCode() {
    this.codeExists = this.listadoTodo.filter(t => (t.codigoDivisionPolitica === this.politicalDivision.codigoDivisionPolitica && t.idDivisionPolitica != this.politicalDivision.idDivisionPolitica )).length > 0;
  }
  
  inputNumberCodigo() {
      let labelCodigo = this.politicalDivision.codigoPostalDivisionPolitica;
      if(labelCodigo != "" && labelCodigo != null) {
          this.politicalDivision.codigoPostalDivisionPolitica = this.politicalDivision.codigoPostalDivisionPolitica.replace(/[^0-9]/g, '');
      }
  }
  
  inputNumberIndicativo() {
      let labelIndicativo = this.politicalDivision.indicativoDivisonPolitica;
      if(labelIndicativo != "" && labelIndicativo != null) {
         this.politicalDivision.indicativoDivisonPolitica = this.politicalDivision.indicativoDivisonPolitica.replace(/[^0-9]/g, '');
      }
  }
  
  capitalize() {
     let input = this.politicalDivision.descripcionDivisonPolitica;
     if(input != "" && input != null){
        this.politicalDivision.descripcionDivisonPolitica = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
     }
  }
      
  capitalizeCodigo() {
    let input = this.politicalDivision.codigoDivisionPolitica;
    if(input != "" && input != null){
      this.politicalDivision.codigoDivisionPolitica = input.toUpperCase().replace(' ', '').trim();
    }
  }

}
