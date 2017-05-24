import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DivisionPoliticaService } from '../_services/divisionPolitica.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { DivisionPoliticaAreas } from '../_models/divisionPoliticaAreas';
import { DivisionPoliticaAgrupaciones } from '../_models/divisionPoliticaAgrupaciones';
import { DivisionPoliticaTipos } from '../_models/divisionPoliticaTipos';
import { TreeNode } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { Search } from '../_models/search';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'divisionPolitica.component.html',
               selector: 'division-politica',

            } )
export class DivisionPoliticaComponent implements OnInit {
   msg: Message;
   politicalDivision: DivisionPolitica = new DivisionPolitica();
   listadoDivisionPolitica: DivisionPolitica[];
   listadoDivisionPoliticaAreas: DivisionPoliticaAreas[];
   listadoDivisionPoliticaAgrupaciones: DivisionPoliticaAgrupaciones[];
   listadoDivisionPoliticaTipos: DivisionPoliticaTipos[];

   divisionPoliticaAreas: SelectItem[] = [];
   divisionPoliticaAgrupaciones: SelectItem[] = [];
   divisionPoliticaTipos: SelectItem[] = [];
   divisionPoliticaEstrato: SelectItem[] = [];

   treedivisionPolitica: TreeNode[] = [];
   selectedNode: TreeNode;
   tabselected: number;
   header: string;
   labelPadre: string;
   divisionPolitica: any[] = [];
   labeldescripcionDivisonPolitica: string;
   btnnuevopais: { show: boolean, label: string, idparent: number, parent: string } = {
      show: true, label: 'Agregar País', parent: '', idparent: 0
   };
   btnnuevodepartamento: { show: boolean, label: string, idparent: number, parent: string } = {
      show: false, label: '', parent: '', idparent: 0
   };
   btnnuevomunicipio: { show: boolean, label: string, idparent: number, parent: string } = {
      show: false, label: '', parent: '', idparent: 0
   };
   btnnuevobarrio: { show: boolean, label: string, idparent: number, parent: string } = { show: false, label: '', parent: '', idparent: 0 };
   displayDialog: boolean = false;
   resultSearch: Search[];
   selectedSearch: SelectItem;
   codeExists: boolean = false;
   guardado = false;

   constructor( private router: Router,
      private divisionPoliticaService: DivisionPoliticaService,
      private navService: NavService ) {

      divisionPoliticaService.listDivisionPolitica().subscribe( res => {
         this.listadoDivisionPolitica = res;
         for ( let c of this.listadoDivisionPolitica.filter( t => t.idDivisionPoliticaPadre === 0 ) ) {
            c.nivel = 1;
            this.treedivisionPolitica.push( {
                                               'label': c.descripcionDivisonPolitica,
                                               'data': c,
                                               'children': [ {
                                                  'label': '+ Cargando...',
                                                  'data': ''
                                               }
                                               ]
                                            } );
         }
      } );

      this.divisionPoliticaEstrato.push( { label: '1', value: 1 } );
      this.divisionPoliticaEstrato.push( { label: '2', value: 2 } );
      this.divisionPoliticaEstrato.push( { label: '3', value: 3 } );
      this.divisionPoliticaEstrato.push( { label: '4', value: 4 } );
      this.divisionPoliticaEstrato.push( { label: '5', value: 5 } );
      this.divisionPoliticaEstrato.push( { label: '6', value: 6 } );

      this.divisionPoliticaService.listDivisionPoliticaAreas().subscribe( res => {
         this.listadoDivisionPoliticaAreas = res;
         this.divisionPoliticaAreas.push( { label: 'Seleccione', value: null } );
         for ( let dp of this.listadoDivisionPoliticaAreas ) {
            this.divisionPoliticaAreas.push( {
                                                label: dp.descripcionDivisionPoliticaArea,
                                                value: dp.idDivisionPoliticaArea
                                             } );
         }
      } );

      this.divisionPoliticaService.listDivisionPoliticaTipos().subscribe( res => {
         this.listadoDivisionPoliticaTipos = res;
         this.newCountry();
      } );

   }

   ngOnInit(): void {
      //  this.newCountry();
   }

   goBack(): void {
      this.router.navigate( [ 'divisionPolitica' ] );
   }

   nodeExpand( node: any ) {
      let divisionPoliticaNivel: any[] = [];
      let chil: any;
      let tabselected = node.data.nivel;

      if ( tabselected >= 3 ) {
         chil = [];
      }
      else {
         chil = [ { 'label': '+ Cargando...', } ];
      }

      for ( let c of this.listadoDivisionPolitica.filter( t => t.idDivisionPoliticaPadre === node.data.idDivisionPolitica ) ) {
         c.nivel = node.data.nivel + 1;
         divisionPoliticaNivel.push( {
                                        'label': c.descripcionDivisonPolitica,
                                        'data': c,
                                        'parent': node,
                                        'children': chil
                                     } );
      }
      node.children = divisionPoliticaNivel;

   }

   nodeSelect( node: any ) {

      this.tabselected = node.data.nivel;

      this.header = node.data.descripcionDivisonPolitica;
      this.btnnuevodepartamento.show = false;
      this.btnnuevomunicipio.show = false;
      this.btnnuevobarrio.show = false;
      this.getTiposbyCode( this.tabselected.toString() );

      switch ( this.tabselected ) {
         case 1:
            this.labeldescripcionDivisonPolitica = 'Nombre del País';
            this.labelPadre = '';
            this.btnnuevopais = { show: true, label: 'Nuevo País ', parent: node.label, idparent: 0 };
            this.btnnuevodepartamento = {
               show: true,
               label: 'Nuevo departamento de ' + node.label,
               parent: node.label,
               idparent: node.data.idDivisionPolitica
            };
            break;
         case 2:
            this.labeldescripcionDivisonPolitica = 'Nombre del Departamento';
            this.labelPadre = 'País: ' + node.parent.label;
            this.btnnuevomunicipio = {
               show: true,
               label: 'Nuevo municipio de ' + node.label,
               parent: node.label,
               idparent: node.data.idDivisionPolitica
            };
            break;
         case 3:
            this.labeldescripcionDivisonPolitica = 'Nombre del Municipio';
            this.labelPadre = 'Departamento: ' + node.parent.label;
            this.btnnuevobarrio = {
               show: true,
               label: 'Nueva barrio de ' + node.label,
               parent: node.label,
               idparent: node.data.idDivisionPolitica
            };
            this.divisionPoliticaService.listDivisionPoliticaAgrupaciones( node.data.idDivisionPolitica ).subscribe( res => {
               this.listadoDivisionPoliticaAgrupaciones = res;
            } );
            break;
         case 4:

            this.labeldescripcionDivisonPolitica = 'Nombre del Barrio';
            this.labelPadre = 'Ciudad: ' + node.parent.label;
            this.divisionPoliticaService.listDivisionPoliticaAgrupaciones( node.data.idDivisionPoliticaPadre ).subscribe( res => {
               this.listadoDivisionPoliticaAgrupaciones = res;
            } );
            break;
      }

      this.divisionPoliticaService.viewDivisionPolitica( node.data.idDivisionPolitica ).subscribe(
         politicalDivision => {
            this.politicalDivision = politicalDivision;
            this.validateCode();
            this.changeArea( this.politicalDivision.idDivisionPoliticaArea );
            if ( this.tabselected === 4 ) {
               let codigoArea = this.listadoDivisionPoliticaAreas.find(
                  a => a.idDivisionPoliticaArea === this.politicalDivision.idDivisionPoliticaArea ).codigo;
               this.getTiposbyCode( this.tabselected.toString() + '' + codigoArea )
            }
         } );
   }

   save() {
      if ( this.politicalDivision.idDivisionPolitica === null ||
           this.politicalDivision.idDivisionPolitica === 0 ||
           this.politicalDivision.idDivisionPolitica === undefined ) {
         this.guardado = true;
         this.divisionPoliticaService.addDivisionPolitica( this.politicalDivision ).then( data => {
            this.guardado = false;
            let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            data.nivel = this.tabselected + 1;
            let chil: any[] = [];
            if ( this.tabselected <= 3 ) {
               chil = [ {
                  'label': '+ Cargando...',
               }
               ];
            }
            let newChil: any = {
               'label': this.politicalDivision.descripcionDivisonPolitica,
               'data': data,
               'children': chil
            };
            // console.info(this.politicalDivision);
            this.listadoDivisionPolitica.push( data );
            if ( this.politicalDivision.idDivisionPoliticaPadre === 0 ) {
               this.treedivisionPolitica.push( newChil );
               this.newCountry();
            } else {
               this.selectedNode.children.push( newChil );
               switch ( this.tabselected ) {
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
            this.guardado = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      } else {
         this.guardado = true;
         this.divisionPoliticaService.updateDivisionPolitica( this.politicalDivision ).then( data => {
            this.guardado = false;
            let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            this.politicalDivision.nivel = this.tabselected;
            this.selectedNode.data = this.politicalDivision;
            this.selectedNode.label = this.politicalDivision.descripcionDivisonPolitica;
            this.header = this.politicalDivision.descripcionDivisonPolitica;
            for ( let i = 0; i < this.listadoDivisionPolitica.length; i++ ) {
               if ( this.listadoDivisionPolitica[ i ].idDivisionPolitica === this.politicalDivision.idDivisionPolitica ) {
                  this.listadoDivisionPolitica[ i ] = this.politicalDivision;
                  return;
               }
            }
         }, error => {
            this.guardado = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      }
   }

   newCountry() {
      this.politicalDivision = new DivisionPolitica();
      this.tabselected = 1;
      this.getTiposbyCode( this.tabselected.toString() );
      this.header = 'Nuevo país';
      this.labeldescripcionDivisonPolitica = 'Nombre del País';
      this.labelPadre = '';
      this.politicalDivision.idDivisionPoliticaPadre = 0;
      this.codeExists = false;

   }

   newDepartment() {
      this.politicalDivision = new DivisionPolitica();
      this.tabselected = 2;
      this.getTiposbyCode( this.tabselected.toString() );
      this.header = 'Nuevo Departamento';
      this.labelPadre = 'Pais: ' + this.btnnuevodepartamento.parent;
      this.labeldescripcionDivisonPolitica = 'Nombre del Departamento';
      this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevodepartamento.idparent;
      this.politicalDivision.codigoDivisionPolitica = this.selectedNode.data.codigoDivisionPolitica;
      // let nodeCode = this.getCodigoTypebyId( this.selectedNode.data.idDivisionPoliticaTipo );
      this.codeExists = false;
   }

   newCity() {
      this.politicalDivision = new DivisionPolitica();
      this.tabselected = 3;
      this.getTiposbyCode( this.tabselected.toString() );
      this.header = 'Nuevo Municipio';
      this.labelPadre = 'Departamento: ' + this.btnnuevomunicipio.parent;
      this.labeldescripcionDivisonPolitica = 'Nombre del Municipio';
      this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevomunicipio.idparent;
      this.politicalDivision.codigoDivisionPolitica = this.selectedNode.data.codigoDivisionPolitica;
      // let nodeCode = this.getCodigoTypebyId( this.selectedNode.data.idDivisionPoliticaTipo );
      this.codeExists = false;
   }

   newNeighborhood() {
      this.politicalDivision = new DivisionPolitica();
      this.tabselected = 4;
      this.getTiposbyCode( this.tabselected.toString() );
      this.header = 'Nuevo barrio';
      this.labelPadre = 'Municipio: ' + this.btnnuevobarrio.parent;
      this.labeldescripcionDivisonPolitica = 'Nombre del Barrio';
      this.politicalDivision.idDivisionPoliticaPadre = this.btnnuevobarrio.idparent;
      this.politicalDivision.codigoDivisionPolitica = this.selectedNode.data.codigoDivisionPolitica;
      // let nodeCode = this.getCodigoTypebyId( this.selectedNode.data.idDivisionPoliticaTipo );
      this.codeExists = false;
   }

   getTiposbyCode( id: string ): void {
      this.divisionPoliticaTipos = [];
      for ( let dp of this.listadoDivisionPoliticaTipos.filter( t => t.codigoDivisionPoliticaTipo.startsWith( id ) ) ) {
         this.divisionPoliticaTipos.push( {
                                             label: dp.descripcionTipo,
                                             value: dp.idDivisionPoliticaTipo
                                          } );
      }
      if ( this.divisionPoliticaTipos.length > 0 ) {
         this.politicalDivision.idDivisionPoliticaTipo = this.divisionPoliticaTipos[ 0 ].value;
      }
   }

   getCodigoTypebyId( id: number ) {
      let nivel: string = '1';
      for ( let dp of this.listadoDivisionPoliticaTipos.filter( t => t.idDivisionPoliticaTipo === id ) ) {
         nivel = dp.codigoDivisionPoliticaTipo;
         break;
      }
      return nivel;
   }

   doCancel() {
      if ( this.politicalDivision.idDivisionPolitica === null || this.politicalDivision.idDivisionPolitica === 0 ) {
         this.politicalDivision = new DivisionPolitica;
      } else {
         this.divisionPoliticaService.viewDivisionPolitica( this.politicalDivision.idDivisionPolitica ).subscribe( res => {
            this.politicalDivision = res;
         } );
      }
      this.displayDialog = false;
   }

   search( event: any ) {
      this.divisionPoliticaService.getSearch( event.query ).subscribe(
         lis => this.resultSearch = lis
      );
   }

   captureId( event: Search ) {

      //  ScrollTo 0;
       jQuery( '#trvDivisionPolitica' ).scrollTop( 0 );

      this.divisionPoliticaService.viewDivisionPolitica( event.value ).subscribe( res => {
         this.politicalDivision = res;
         this.header = res.descripcionDivisonPolitica;
         let nodeCode = this.getCodigoTypebyId( res.idDivisionPoliticaTipo );
         this.tabselected = Number( parseInt(nodeCode ));
         this.getTiposbyCode( nodeCode );
         this.searchRecursive( res );
         if ( res.idDivisionPolitica !== 0 ) {
            if ( this.listadoDivisionPolitica.find( t => t.idDivisionPolitica === res.idDivisionPoliticaPadre ) ) {
               this.labelPadre = this.listadoDivisionPolitica.find(
                  t => t.idDivisionPolitica === res.idDivisionPoliticaPadre ).descripcionDivisonPolitica;
            }
            this.codeExists = false;
         } else {
            this.labelPadre = '';
         }

         //  Scroll to Select
         setTimeout( () => {
            jQuery( '#trvDivisionPolitica' ).scrollTop(
               jQuery( '.ui-state-highlight' ).position().top - jQuery( '#trvDivisionPolitica' ).height() / 2
            );
         }, 500 );

      } );
   }

   searchRecursive( res: DivisionPolitica ) {
      let node4: number = 0;
      let node3: number = 0;
      let node2: number = 0;
      let node1: number = 0;
      let nivel = this.getCodigoTypebyId( res.idDivisionPoliticaTipo ).substring( 0, 1 );
      let busqueda = true;
      switch ( nivel ) {
         case '1':
            node1 = res.idDivisionPolitica;
            break;
         case '2':
            node2 = res.idDivisionPolitica;
            node1 = res.idDivisionPoliticaPadre;
            break;
         case '3':
            node3 = res.idDivisionPolitica;
            node2 = res.idDivisionPoliticaPadre;
            if ( this.listadoDivisionPolitica.filter( t => t.idDivisionPolitica === res.idDivisionPoliticaPadre ).length > 0 ) {
               node1 = this.listadoDivisionPolitica.find(
                  t => t.idDivisionPolitica === res.idDivisionPoliticaPadre ).idDivisionPoliticaPadre;
            } else {
               this.msg = {
                  severity: 'error', summary: 'Error', detail: 'El registro buscado no se encuentra bien relacionado en la' +
                                                               ' Base de Datos'
               };
               this.navService.setMesage( 4, this.msg );
               this.newCountry();
               busqueda = false;
            }

            break;
         case '4':
            node4 = res.idDivisionPolitica;
            node3 = res.idDivisionPoliticaPadre;
            if ( this.listadoDivisionPolitica.filter( t => t.idDivisionPolitica === node3 ).length > 0 ) {
               node2 = this.listadoDivisionPolitica.find( t => t.idDivisionPolitica === node3 ).idDivisionPoliticaPadre;
               if ( this.listadoDivisionPolitica.filter( t => t.idDivisionPolitica === node2 ).length > 0 ) {
                  node1 = this.listadoDivisionPolitica.find( t => t.idDivisionPolitica === node2 ).idDivisionPoliticaPadre;
               } else {
                  this.msg = {
                     severity: 'error', summary: 'Error!', detail: 'El registro buscado no se encuentra bien relacionado en la' +
                                                                   ' Base de Datos'
                  };
                  this.navService.setMesage( 4, this.msg );
                  this.newCountry();
                  busqueda = false;
               }
            } else {
               this.msg = {
                  severity: 'error', summary: 'Error!', detail: 'El registro buscado no se encuentra bien relacionado en la' +
                                                                ' Base de Datos'
               };
               this.navService.setMesage( 4, this.msg );
               this.newCountry();
               busqueda = false;
            }
            break;
      }
      if( busqueda === true) {
         if ( node1 > 0 ) {
            this.searchLevel( node1, 1 );
         }
         if ( node2 > 0 ) {
            this.searchLevel( node2, 2 );
         }
         if ( node3 > 0 ) {
            this.searchLevel( node3, 3 );
         }
         if ( node4 > 0 ) {
            this.searchLevel( node4, 4 );
         }
         this.selectedSearch = null;
         this.nodeSelect( this.selectedNode );
      }

   }

   searchLevel( id: number, tipo: number ) {

      if ( tipo === 1 ) {
         this.treedivisionPolitica.forEach( node => {
            if ( node.data.idDivisionPolitica === id ) {
               node.expanded = true;
               this.nodeExpand( node );
               this.selectedNode = node;
            } else {
               node.expanded = false;
            }
         } );
      } else {
         if ( this.selectedNode.children ) {
            this.selectedNode.children.forEach( childNode => {
               if ( childNode.data.idDivisionPolitica === id ) {
                  childNode.expanded = true;
                  if ( tipo !== 4 ) {
                     this.nodeExpand( childNode );
                  }
                  this.selectedNode = childNode;
               } else {
                  childNode.expanded = false;
               }
            } );
         }
      }
   }

   validateCode() {
      this.codeExists = this.listadoDivisionPolitica.filter(
            t => (t.codigoDivisionPolitica === this.politicalDivision.codigoDivisionPolitica &&
                  t.idDivisionPolitica !== this.politicalDivision.idDivisionPolitica ) ).length > 0;
      return !this.codeExists;
   }

   inputNumberCodigo() {
      let labelCodigo = this.politicalDivision.codigoPostalDivisionPolitica;
      if ( labelCodigo !== '' && labelCodigo !== null ) {
         this.politicalDivision.codigoPostalDivisionPolitica = this.politicalDivision.codigoPostalDivisionPolitica.replace( /[^0-9]/g, '' );
      }
   }

   inputNumberIndicativo() {
      let labelIndicativo = this.politicalDivision.indicativoDivisonPolitica;
      if ( labelIndicativo !== '' && labelIndicativo !== null ) {
         this.politicalDivision.indicativoDivisonPolitica = this.politicalDivision.indicativoDivisonPolitica.replace( /[^0-9]/g, '' );
      }
   }

   capitalize() {
      let input = this.politicalDivision.descripcionDivisonPolitica;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.politicalDivision.descripcionDivisonPolitica = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   capitalizeCodigo() {
      let input = this.politicalDivision.codigoDivisionPolitica;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.politicalDivision.codigoDivisionPolitica = input.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   changeArea( idArea: number ) {
      this.divisionPoliticaAgrupaciones = [];

      this.divisionPoliticaAgrupaciones.push( { label: 'Seleccione', value: null } );
      if ( idArea !== null ) {
         for ( let dp of this.listadoDivisionPoliticaAgrupaciones.filter( d => d.idDivisionPoliticaArea === idArea ) ) {
            this.divisionPoliticaAgrupaciones.push( {
                                                       label: dp.agrupacion,
                                                       value: dp.idDivisionPoliticaAgrupacion
                                                    } );
         }
         let codigoArea = this.listadoDivisionPoliticaAreas.find(
            a => a.idDivisionPoliticaArea === idArea ).codigo;
         this.getTiposbyCode( this.tabselected.toString() + '' + codigoArea )
      }

   }

}
