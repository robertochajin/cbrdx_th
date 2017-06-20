import { Component } from '@angular/core';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { TreeNode, ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { LocateService } from '../_services/locate.service';
import { Localizaciones } from '../_models/localizaciones';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { ZonesServices } from '../_services/zones.service';
import { Zones } from '../_models/zones';

@Component( {
               moduleId: module.id,
               templateUrl: 'organizationalStructure.component.html',
               selector: 'organizational-structure',
               providers: [ ConfirmationService ]
            } )
export class OrganizationalStructureComponent {
   msg: Message;
   organizationalStructure: OrganizationalStructure = new OrganizationalStructure();
   listOrganizationalStructure: OrganizationalStructure[];
   documentTypes: SelectItem[] = [];
   structureTypes: SelectItem[] = [];
   costTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   physicalTypes: SelectItem[] = [];

   treedCompany: TreeNode[] = [];
   selectedNode: TreeNode;
   empresa = true;
   btnEmpresa = true;
   header: string;
   displayDialog = false;
   codeExists = false;
   documentExists = false;
   empty: string;
   addinglocation = true;
   guardando = false;
   localizacion: Localizaciones = new Localizaciones();

   // variables para administracion de zonas
   public zone: Zones;
   public zones: Zones[] = [];
   public editingZone = false;
   public safeZones= false;

   constructor( private organizationalStructureService: OrganizationalStructureService,
      private listaService: ListaService,
      private politicalDivisionService: PoliticalDivisionService,
      private locateService: LocateService,
      private zonesServices: ZonesServices,
      private navService: NavService,
      private confirmationService: ConfirmationService ) {
      organizationalStructureService.listOrganizationalStructure().subscribe( res => {
         this.listOrganizationalStructure = res;
         if ( this.listOrganizationalStructure.length > 0 ) {
            this.empresa = false;
            for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre === 0 || t.idPadre === null ) ) {
               let companyNode = {
                  'label': c.nombre,
                  'data': c,
                  'leaf': false,
               };
               this.treedCompany.push( companyNode );
               this.selectedNode = companyNode;
               this.nodeExpand( companyNode );
            }
            this.btnEmpresa = false;
            this.newBranch();
         } else {

            this.empresa = true;
            this.empty = 'No hay elementos registrados';
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
         this.costTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.costTypes.push( {
                                    label: dp.centroCostos,
                                    value: dp.idCentroCostos
                                 } );
         }
      } );

      this.organizationalStructureService.getAreaTypes().subscribe( res => {
         this.areaTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.organizationalStructureService.getPhysicalTypes().subscribe( res => {
         this.physicalTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.physicalTypes.push( {
                                        label: dp.estructuraFisica,
                                        value: dp.idEstructuraFisica
                                     } );
         }
      } );

   }

   validateCode() {
      if ( this.organizationalStructure.codigo !== '' && this.organizationalStructure.codigo !== null ) {
         this.codeExists = this.listOrganizationalStructure.filter(
               t => (t.codigo === this.organizationalStructure.codigo
                     && t.idEstructuraOrganizacional !== this.organizationalStructure.idEstructuraOrganizacional ) ).length > 0;
      } else {
         this.codeExists = false;
      }

   }

   capitalizeCode() {
      let input = this.organizationalStructure.codigo;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.organizationalStructure.codigo = input.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   validateDocument() {
      if ( this.organizationalStructure.numeroDocumento !== '' && this.organizationalStructure.idTipoDocumento !== null ) {
         this.documentExists = this.listOrganizationalStructure.filter(
               t => (t.numeroDocumento === this.organizationalStructure.numeroDocumento
                     && t.idTipoDocumento === this.organizationalStructure.idTipoDocumento
                     && t.idEstructuraOrganizacional !== this.organizationalStructure.idEstructuraOrganizacional ) ).length > 0;
      } else {
         this.documentExists = false;
      }
   }

   capitalizeName() {
      let input = this.organizationalStructure.nombre;
      if ( input !== '' && input !== null && input !== undefined ) {
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
      for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre === node.data.idEstructuraOrganizacional ) ) {
         chilNodes.push( {
                            'label': c.nombre,
                            'data': c,
                            'parent': node,
                            'leaf': false,
                            'children': []
                         } );
      }
      node.children = chilNodes;

   }

   nodeSelect( node: any ) {

      this.editingZone = false;
      this.empresa = node.data.idPadre === 0 || node.data.idPadre === null || node.data.idPadre === undefined;
      this.organizationalStructureService.viewOrganizationalStructure( node.data.idEstructuraOrganizacional ).subscribe(
         organizationalStructure => {
            this.organizationalStructure = organizationalStructure;
            this.codeExists = false;
            this.documentExists = false;
            if ( node.data.idPadre === 0 || node.data.idPadre === null || node.data.idPadre === undefined ) {
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

            if ( this.organizationalStructure.indicadorZona ) {
               this.zonesServices.getAllByOrganizationalStructure( node.data.idEstructuraOrganizacional ).subscribe(
                  zones => {
                     this.zones = zones;
                     this.safeZones = true;
                  }
               );
            } else {
               this.zones = [];
               this.safeZones = false;
            }

         } );

   }

   save() {

      if ( this.empresa === true ) {
         if ( this.organizationalStructure.localizacion !== '' && this.organizationalStructure.localizacion !== null ) {

            if ( this.organizationalStructure.idLocalizacion === null ||
                 this.organizationalStructure.idLocalizacion === 0 ||
                 this.organizationalStructure.idLocalizacion === undefined ) {
               this.localizacion.indicadorHabilitado = true;
               this.locateService.add( this.localizacion ).subscribe(
                  data => {
                     let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );

                     this.organizationalStructure.idLocalizacion = data.idLocalizacion;
                     return this.saveEO();
                  }, error => {
                     let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );
                  } );
            } else {
               this.locateService.update( this.localizacion ).subscribe(
                  () => {
                     let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );
                     return this.saveEO();
                  }, error => {
                     let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );
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

      if ( this.organizationalStructure.idEstructuraOrganizacional === null ||
           this.organizationalStructure.idEstructuraOrganizacional === 0 ||
           this.organizationalStructure.idEstructuraOrganizacional === undefined ) {
         this.guardando = true;
         this.organizationalStructureService.addOrganizationalStructure( this.organizationalStructure ).then( data => {
            this.guardando = false;
            this.empresa = false;
            this.btnEmpresa = false;
            this.empty = '';

            let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );

            let newChil: any = {
               'label': this.organizationalStructure.nombre,
               'data': data,
               'leaf': false,
               'children': []
            };
            this.safeZones = this.organizationalStructure.indicadorZona;
            this.listOrganizationalStructure.push( data );
            if ( this.organizationalStructure.idPadre === 0 ||
                 this.organizationalStructure.idPadre === null ||
                 this.organizationalStructure.idPadre === undefined ) {
               this.treedCompany.push( newChil );
               this.selectedNode = newChil;
               this.newBranch();

            } else {
               this.selectedNode.children.push( newChil );
               this.newBranch();
            }
         }, error => {
            this.guardando = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      } else {
         this.organizationalStructureService.updateOrganizationalStructure( this.organizationalStructure ).then( () => {
            this.guardando = false;
            let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            this.safeZones = this.organizationalStructure.indicadorZona;
            this.selectedNode.data = this.organizationalStructure;
            this.selectedNode.label = this.organizationalStructure.nombre;
            this.header = this.organizationalStructure.nombre;
            for ( let i = 0; i < this.listOrganizationalStructure.length; i++ ) {
               if ( this.listOrganizationalStructure[ i ].idEstructuraOrganizacional
                    === this.organizationalStructure.idEstructuraOrganizacional ) {
                  this.listOrganizationalStructure[ i ] = this.organizationalStructure;
                  return;
               }
            }
         }, error => {
            this.guardando = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 = Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      }
   }

   doCancel() {
      if ( this.organizationalStructure.idEstructuraOrganizacional === null
           || this.organizationalStructure.idEstructuraOrganizacional === 0
           || this.organizationalStructure.idEstructuraOrganizacional === undefined ) {
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

   saveZone() {
      if ( this.zone.idZona !== undefined && this.zone.idZona !== null ) {
         this.zonesServices.update( this.zone ).subscribe( res => {
            if ( res.ok ) {
               this.zones[this.zones.indexOf(this.zones.find(z => z.idZona === this.zone.idZona))] = this.zone;
               this.navService.setMesage( 2 );
               this.editingZone = false;
            }
         }, error => {
            this.navService.setMesage( 3 );
         } );
      } else {
         this.zone.idEstructuraOrganizacional = this.organizationalStructure.idEstructuraOrganizacional;
         this.zone.indicadorHabilitado = true;
         this.zonesServices.add( this.zone ).subscribe( res => {
            if ( res ) {
               this.zones.push( res );
               this.editingZone = false;
               this.navService.setMesage( 1 );
            }
         }, error => {
            this.navService.setMesage( 3 );
         } );
      }
   }

   cancelEditingZone() {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que cancelar la edición?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.zone = new Zones();
                                              this.editingZone = false;
                                           }
                                        } );
   }

   editZone( zone: Zones ) {
      if ( zone !== null ) {
         this.zone = new Zones();
         this.zone.codigo = zone.codigo;
         this.zone.idZona = zone.idZona;
         this.zone.idEstructuraOrganizacional = zone.idEstructuraOrganizacional;
         this.zone.indicadorHabilitado = zone.indicadorHabilitado;
         this.zone.auditoriaUsuario = zone.auditoriaUsuario;
         this.zone.auditoriaFecha = zone.auditoriaFecha;
         this.zone.zona = zone.zona;
      } else {
         this.zone = new Zones();
         this.zone.codigo = this.organizationalStructure.codigo + '-' + this.getNextCode( this.zones );
      }
      this.editingZone = true;
   }

   private getNextCode( zones: Zones[] ): string {
      let lastCode = '1';
      if ( zones.length > 0 ) {
         lastCode = (Number( zones.sort( ( a, b ) => {
            return Number( a.codigo.split( '-' )[ 1 ] ) - Number( b.codigo.split( '-' )[ 1 ] )
         } )[ zones.length - 1 ].codigo.split( '-' )[ 1 ] ) + 1).toString();
      }
      return lastCode;
   }

   capitalizeZone( value: any ) {
      if ( value !== '' && value !== null && value !== undefined ) {
         this.zone.zona = value.substring( 0, 1 ).toUpperCase() + value.substring( 1 ).toLowerCase();
      }
   }
   inputValid(){
      let input = this.organizationalStructure.numeroDocumento;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.organizationalStructure.numeroDocumento = input.toUpperCase().replace( /[^0-9]/gi, '' ).trim();
      }
   }
}
