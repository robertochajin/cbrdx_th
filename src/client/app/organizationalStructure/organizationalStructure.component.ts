import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { TreeNode } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { LocateService } from '../_services/locate.service';
import { Localizaciones } from '../_models/localizaciones';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'organizationalStructure.component.html',
               selector: 'organizationalStructure',

            } )
export class OrganizationalStructureComponent implements OnInit {
   msgs: Message[] = [];
   organizationalStructure: OrganizationalStructure = new OrganizationalStructure();
   listOrganizationalStructure: OrganizationalStructure[];
   documentTypes: SelectItem[] = [];
   structureTypes: SelectItem[] = [];
   costTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   physicalTypes: SelectItem[] = [];

   treedCompany: TreeNode[] = [];
   selectedNode: TreeNode;
   empresa: boolean = true;
   btnEmpresa: boolean = true;
   header: string;
   displayDialog: boolean = false;
   codeExists: boolean = false;
   documentExists: boolean = false;
   empty: string;
   addinglocation: boolean = true;
   guardando: boolean = false;
   localizacion: Localizaciones = new Localizaciones();

   constructor( private router: Router,
      private organizationalStructureService: OrganizationalStructureService,
      private listaService: ListaService,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private locateService: LocateService ) {
      organizationalStructureService.listOrganizationalStructure().subscribe( res => {
         this.listOrganizationalStructure = res;
         if ( this.listOrganizationalStructure.length > 0 ) {
            this.empresa = false;
            for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre == 0 || t.idPadre == null ) ) {
               let companyNode = {
                  "label": c.nombre,
                  "data": c,
                  "leaf": false,
               };
               this.treedCompany.push( companyNode );
               this.selectedNode = companyNode;
            }
            this.btnEmpresa = false;
            this.newBranch();
         } else {

            this.empresa = true;
            this.empty = "No hay elementos registrados";
            this.newCompany();
         }
      } );

      this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
         this.documentTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.documentTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasTiposEstructuras' ).subscribe( res => {
         this.structureTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.structureTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.organizationalStructureService.getCostTypes().subscribe( res => {
         this.costTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.costTypes.push( {
                                    label: dp.centroCostos,
                                    value: dp.idCentroCostos
                                 } );
         }
      } );

      this.organizationalStructureService.getAreaTypes().subscribe( res => {
         this.areaTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.organizationalStructureService.getPhysicalTypes().subscribe( res => {
         this.physicalTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.physicalTypes.push( {
                                        label: dp.estructuraFisica,
                                        value: dp.idEstructuraFisica
                                     } );
         }
      } );

   }

   ngOnInit(): void {
      this.localizacion.direccion
   }

   validateCode() {
      if ( this.organizationalStructure.codigo !== "" && this.organizationalStructure.codigo !== null ) {
         this.codeExists = this.listOrganizationalStructure.filter(
               t => (t.codigo === this.organizationalStructure.codigo && t.idEstructuraOrganizacional !== this.organizationalStructure.idEstructuraOrganizacional ) ).length > 0;
      } else {
         this.codeExists = false;
      }

   }

   capitalizeCode() {
      let input = this.organizationalStructure.codigo;
      if ( input !== "" && input !== null ) {
         this.organizationalStructure.codigo = input.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
      }
   }

   validateDocument() {
      if ( this.organizationalStructure.numeroDocumento !== "" && this.organizationalStructure.idTipoDocumento !== null ) {
         this.documentExists = this.listOrganizationalStructure.filter(
               t => (t.numeroDocumento === this.organizationalStructure.numeroDocumento && t.idTipoDocumento === this.organizationalStructure.idTipoDocumento && t.idEstructuraOrganizacional !== this.organizationalStructure.idEstructuraOrganizacional ) ).length > 0;
      } else {
         this.documentExists = false;
      }
   }

   capitalizeName() {
      let input = this.organizationalStructure.nombre;
      if ( input !== "" && input !== null ) {
         this.organizationalStructure.nombre = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   newCompany() {
      this.organizationalStructure = new OrganizationalStructure();
      this.header = 'Nueva empresa';
      this.organizationalStructure.idPadre = 0;
      this.codeExists = false;
      this.documentExists = false;
      this.empresa = true;
   }

   newBranch() {
      this.empresa = false;
      this.organizationalStructure = new OrganizationalStructure();
      this.header = 'Nueva Area';
      this.organizationalStructure.idPadre = this.selectedNode.data.idEstructuraOrganizacional;
      this.codeExists = false;
      this.documentExists = false;
   }

   nodeExpand( node: any ) {
      let chilNodes: TreeNode[] = [];
      for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre == node.data.idEstructuraOrganizacional ) ) {
         chilNodes.push( {
                            "label": c.nombre,
                            "data": c,
                            "parent": node,
                            "leaf": false,
                            "children": []
                         } );
      }
      node.children = chilNodes;

   }

   nodeSelect( node: any ) {

      if ( node.data.idPadre == 0 || node.data.idPadre == null ) {
         this.empresa = true;

      } else {
         this.empresa = false;
      }
      this.organizationalStructureService.viewOrganizationalStructure( node.data.idEstructuraOrganizacional ).subscribe(
         organizationalStructure => {
            this.organizationalStructure = organizationalStructure;
            this.codeExists = false;
            this.documentExists = false;
            if ( node.data.idPadre == 0 || node.data.idPadre == null ) {
               this.header = this.organizationalStructure.nombre;
               if ( this.organizationalStructure.idLocalizacion !== null ) {
                  this.locateService.getById( this.organizationalStructure.idLocalizacion ).subscribe( localizacion => {
                     this.localizacion = localizacion;
                     this.organizationalStructure.localizacion = localizacion.direccion;
                     this.localizacion.locacion = { camino: '', idDivisionPolitica: null };
                     if ( localizacion.idDivisionPolitica !== null ) {
                        this.politicalDivisionService.getLocation( localizacion.idDivisionPolitica ).subscribe( ciudad => {
                           this.localizacion.locacion.camino = ciudad.camino;
                           this.localizacion.locacion.idDivisionPolitica = ciudad.idDivisionPolitica;
                        } );
                     }
                  } );
               }
            } else {
               this.header = this.organizationalStructure.nombre;
            }

         } );

   }

   save() {

      if ( this.empresa == true ) {
         if ( this.organizationalStructure.localizacion !== '' && this.organizationalStructure.localizacion !== null ) {

            if ( this.organizationalStructure.idLocalizacion == null || this.organizationalStructure.idLocalizacion == 0 ) {
               this.localizacion.indicadorHabilitado = true;
               this.locateService.add( this.localizacion ).subscribe(
                  data => {
                     this.organizationalStructure.idLocalizacion = data.idLocalizacion;
                     return this.saveEO();
                  } );
            } else {
               this.locateService.update( this.localizacion ).subscribe(
                  data => {
                     return this.saveEO();
                  } );
            }
         } else {
            this.guardando = false;
         }
      } else {
         this.guardando = true;
         return this.saveEO();
      }

   }

   saveEO() {

      if ( this.organizationalStructure.idEstructuraOrganizacional == null || this.organizationalStructure.idEstructuraOrganizacional == 0 ) {
         this.guardando = true;
         this.organizationalStructureService.addOrganizationalStructure( this.organizationalStructure ).then( data => {
            this.guardando = false;
            this.empresa = false;
            this.btnEmpresa = false;
            this.empty = "";

            this.msgs.push( { severity: 'info', summary: 'Guardando...', detail: 'Registro guardado con exito!' } );
            let newChil: any = {
               "label": this.organizationalStructure.nombre,
               "data": data,
               "leaf": false,
               "children": []
            };
            this.listOrganizationalStructure.push( data );
            if ( this.organizationalStructure.idPadre == 0 || this.organizationalStructure.idPadre == null ) {
               this.treedCompany.push( newChil );
               this.selectedNode = newChil;
               this.newBranch();

            } else {
               this.selectedNode.children.push( newChil );
               this.newBranch();
            }
         }, error => {
            this.guardando = false;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      } else {
         this.organizationalStructureService.updateOrganizationalStructure( this.organizationalStructure ).then( data => {
            this.guardando = false;
            this.msgs.push( { severity: 'info', summary: 'Guardando...', detail: 'Registro actualizado con exito!' } );
            this.selectedNode.data = this.organizationalStructure;
            this.selectedNode.label = this.organizationalStructure.nombre;
            this.header = this.organizationalStructure.nombre;
            for ( let i = 0; i < this.listOrganizationalStructure.length; i++ ) {
               if ( this.listOrganizationalStructure[ i ].idEstructuraOrganizacional === this.organizationalStructure.idEstructuraOrganizacional ) {
                  this.listOrganizationalStructure[ i ] = this.organizationalStructure;
                  return;
               }
            }
         }, error => {
            this.guardando = false;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al actualizar.' } );
         } );
      }
   }

   doCancel() {
      if ( this.organizationalStructure.idEstructuraOrganizacional == null || this.organizationalStructure.idEstructuraOrganizacional == 0 ) {
         this.organizationalStructure = new OrganizationalStructure;
      } else {
         this.organizationalStructureService.viewOrganizationalStructure( this.organizationalStructure.idEstructuraOrganizacional )
         .subscribe( res => {
            this.organizationalStructure = res;
         } );
      }
      this.displayDialog = false;
   }

   bindLocation( event: any ) {
      this.localizacion = event;
      this.organizationalStructure.localizacion = event.direccion;
      this.toggleform();
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

}
