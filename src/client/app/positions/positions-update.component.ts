import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Positions } from '../_models/positions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { TreeNode } from 'primeng/components/common/api';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { PermissionsCargos } from '../_models/permissionsCargos';
import { PermissionService } from '../_services/permission.service';

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-form.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionsUpdateComponent implements OnInit {
   @Input()
   position: Positions = new Positions();
   allPosition: Positions[] = [];
   acordion: number;
   categoryTypes: SelectItem[] = [];
   listcategoryTypes: any[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   liststateTypes: any[] = [];
   levelTypes: SelectItem[] = [];
   listslevelTypes: any[] = [];
   genderTypes: SelectItem[] = [];
   listStudies: SelectItem[] = [];
   listProcess: SelectItem[] = [];
   listSubProcess: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   msgs: Message[] = [];
   msgOcupaciones: Message[] = [];
   aprobado: number;
   noAprobado: number;
   construccion: number;
   treeArrray: TreeNode[] = [];
   selectedNode: TreeNode;
   step = 1;
   nivel: number;
   alertOcu = false;
   rangoEdad: number[] = [ 16, 60 ];
   seccion1: PermissionsCargos = new PermissionsCargos();
   seccion2: PermissionsCargos = new PermissionsCargos();
   seccion3: PermissionsCargos = new PermissionsCargos();
   seccion4: PermissionsCargos = new PermissionsCargos();
   seccion5: PermissionsCargos = new PermissionsCargos();
   seccion6: PermissionsCargos = new PermissionsCargos();
   seccion7: PermissionsCargos = new PermissionsCargos();
   seccion8: PermissionsCargos = new PermissionsCargos();
   seccion9: PermissionsCargos = new PermissionsCargos();
   seccion10: PermissionsCargos = new PermissionsCargos();
   seccion11: PermissionsCargos = new PermissionsCargos();
   seccion12: PermissionsCargos = new PermissionsCargos();
   seccion13: PermissionsCargos = new PermissionsCargos();
   seccion14: PermissionsCargos = new PermissionsCargos();
   seccion15: PermissionsCargos = new PermissionsCargos();
   seccion16: PermissionsCargos = new PermissionsCargos();
   defaultCampo = {visible:true, editable:true};

   constructor( private positionsService: PositionsService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private listPositionsService: ListPositionsService,
      private tipoDeAreaService: TipoDeAreaService,
      private confirmationService: ConfirmationService,
      private listEmployeesService: ListEmployeesService,
      private listaService: ListaService,
      private permissionService: PermissionService,
      private _nav: NavService ) {

      this.permissionService.getReglasFormularios( 'CARGOS' ).subscribe( p => {
         let permisos = JSON.parse(p);
         this.seccion1 = permisos.IDENTIFICACION ? permisos.IDENTIFICACION : new PermissionsCargos();
         this.seccion2 = permisos.PRODUCTO ? permisos.PRODUCTO : new PermissionsCargos();
         this.seccion3 = permisos.INTERRELACIONES ? permisos.INTERRELACIONES : new PermissionsCargos();
         this.seccion4 = permisos.ROLDENTRO ? permisos.ROLDENTRO : new PermissionsCargos();
         this.seccion5 = permisos.RESPONSABILIDADESPRINCIPALES ? permisos.RESPONSABILIDADESPRINCIPALES : new PermissionsCargos();
         this.seccion6 = permisos.RESPONSABILIDADESCOMPLEMENTARIAS ? permisos.RESPONSABILIDADESCOMPLEMENTARIAS : new PermissionsCargos();
         this.seccion7 = permisos.POSICION ? permisos.POSICION : new PermissionsCargos();
         this.seccion8 = permisos.AUTORIDADES ? permisos.AUTORIDADES : new PermissionsCargos();
         this.seccion9 = permisos.REQUISITOS ? permisos.REQUISITOS : new PermissionsCargos();
         this.seccion10 = permisos.COMPETENCIAS ? permisos.COMPETENCIAS : new PermissionsCargos();
         this.seccion11 = permisos.ACTIVOS ? permisos.ACTIVOS : new PermissionsCargos();
         this.seccion12 = permisos.PRODUCTIVIDAD ? permisos.PRODUCTIVIDAD : new PermissionsCargos();
         this.seccion13 = permisos.PERSONALIDAD ? permisos.PERSONALIDAD : new PermissionsCargos();
         this.seccion14 = permisos.FACTORES ? permisos.FACTORES : new PermissionsCargos();
         this.seccion15 = permisos.VALORACION ? permisos.VALORACION : new PermissionsCargos();
         this.seccion16 = permisos.RElACION ? permisos.RElACION : new PermissionsCargos();
      });

      this.listPositionsService.getCategoryTypes().subscribe( res => {
         this.listcategoryTypes = res;
         this.categoryTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.categoryTypes.push( {
                                        label: dp.categoria,
                                        value: dp.idCategoria
                                     } );
         }

      } );
      this.listaService.getMasterDetails( 'ListasNivelesCargos' ).subscribe( res => {
         this.listslevelTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listslevelTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.listStudies.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listStudies.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasProcesos' ).subscribe( res => {
         this.listProcess.push( { label: 'Seleccione', value: null } );
         this.listSubProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listProcess.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.tipoDeAreaService.getlistAreas().subscribe( res => {
         this.areaTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.listaService.getMasterDetails( 'ListasEstadosCargos' ).subscribe( res => {
         this.liststateTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.liststateTypes.push( { label: s.nombre, value: s.idLista } );
         } );

         for ( let dp of res ) {
            this.stateTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idLista
                                  } );
            switch ( dp.codigo ) {
               case 'APROB':
                  this.aprobado = dp.idLista;
                  break;
               case 'NOAPR':
                  this.noAprobado = dp.idLista;
                  break;
               case 'CONST':
                  this.construccion = dp.idLista;
                  break;
            }
         }
      } );

      this.listaService.getMasterDetails( 'ListasGeneros' ).subscribe( res => {
         this.genderTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.genderTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosCiviles' ).subscribe( res => {
         this.maritalStatusTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.maritalStatusTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.acordion = 0;
   }
   ngOnInit() {
      this.acordion = 0;
      this.route.params.subscribe( ( params: Params ) => {
         this.positionsService.get( +params[ 'id' ] ).subscribe( position => {
            this.position = position;
            if(this.position.idProceso){
               this.onChangeProcess(null);
            }
            if ( this.position.edad !== null ) {
               this.rangoEdad[ 0 ] = this.position.edad;
            }
            if ( this.position.edadMax !== null ) {
               this.rangoEdad[ 1 ] = this.position.edadMax;
            }
            this.step = this.position.paso;
            if ( this.step > 0 && this.step < 16 ) {
               if ( this._nav.getTab() > 0 && this._nav.getTab() !== null ) {
                  this.acordion = this._nav.getTab();
               } else {
                  this.acordion = this.step - 1;
               }
            }
            this.getCategory();
            this.positionsService.getListPositions().subscribe( res => {
               this.allPosition = res;
               this.bossPositionTypes.push( { label: 'Seleccione', value: null } );
               for ( let dp of res ) {
                  if ( res.idCargo !== this.position.idCargo ) {
                     this.bossPositionTypes.push( {
                                                     label: dp.cargo,
                                                     value: dp.idCargo
                                                  } );
                  }
               }
               if ( this.position.indicadorHabilitado === false ) {
                  this.allPosition.push( this.position );
               }
               this.buildParent();
            } );
         } );
      } );

   }

   firstStep() {
      this._nav.setTab( 0 );
      this.acordion = 0;
      jQuery( 'body' ).animate( { scrollTop: 0 }, 'fast' );
   }

   nextStep( step: number ) {
      this.msgs = [];
      if ( this.position.paso !== 0 && this.position.paso <= step ) {
         this.position.paso = step + 1;
         this.step = this.position.paso;

         this.positionsService.updateEstado( this.position )
         .subscribe( data => {
            this._nav.setTab( step );
            this.acordion = step;
            this._nav.setMesage( 1, this.msgs );
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }else{
         this._nav.setTab( step );
         this.acordion = step;
      }
   }

   onSubmit0() {
      this.msgs = [];
      if ( this.position.paso === 1 ) {
         this.position.paso = 2;
         this.step = 2;
      }

      this.positionsService.update1( this.position )
      .subscribe( data => {
         this._nav.setTab( 1 );
         this.acordion = 1;
         this._nav.setMesage( 1, this.msgs );
         this.positionsService.getListPositions().subscribe( res => {
            this.allPosition = res;
            if ( this.position.indicadorHabilitado === false ) {
               this.allPosition.push( this.position );
            }
            this.buildParent();
         } );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit2() {
      this.msgs = [];
      if ( this.position.paso <= 3 ) {
         this.position.paso = 4;
         this.step = 4;
      }
      this.positionsService.update2( this.position )
      .subscribe( data => {
         this._nav.setTab( 3 );
         this.acordion = 3;
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit5() {
      this.msgs = [];
      if ( this.position.paso <= 5 ) {
         this.position.paso = 6;
         this.step = 6;
      }
      this.positionsService.update3( this.position )
      .subscribe( data => {
         this._nav.setTab( 5 );
         this.acordion = 5;
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit7() {
      this.msgs = [];
      if ( this.position.paso <= 8 ) {
         this.position.paso = 9;
         this.step = 9;
      }
      this._nav.setTab( 8 );
      this.acordion = 8;
      this.positionsService.update4( this.position )
      .subscribe( data => {
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit8() {
      this.msgs = [];
      if ( this.position.paso <= 9 ) {
         this.position.paso = 10;
         this.step = 10;
      }
      this.position.edad = this.rangoEdad[ 0 ];
      this.position.edadMax = this.rangoEdad[ 1 ];
      this.positionsService.update5( this.position )
      .subscribe( data => {
         this._nav.setTab( 9 );
         this.acordion = 9;
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit14() {
      this.msgs = [];
      if ( this.position.paso <= 15 ) {
         this.step = 16;
         this.position.paso = 16;
      }
      this.positionsService.update6( this.position )
      .subscribe( data => {
         this._nav.setTab( 15 );
         this.acordion = 15;
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   updateEstado( value: number ) {
      this.msgs = [];
      let bckState = this.position.idEstado;
      this.position.idEstado = value;
      if ( this.position.idEstado === this.aprobado ) {
         this.position.indicadorHabilitado = true;
      }
      if ( this.position.idEstado === this.noAprobado ) {
         this.position.indicadorHabilitado = false;
      }
      this.positionsService.updateEstado( this.position )
      .subscribe( data => {
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this.position.idEstado = bckState;
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();

      // Focus  en accordionTab Activo
      setTimeout( () => {
         jQuery( 'body' ).animate({
            scrollTop : jQuery( 'p-accordiontab > .ui-state-active' ).position().top + 90
         }, 'fast');
      }, 1000 );

   }

   buildParent() {
      this.treeArrray = [];
      for ( let c of this.allPosition.filter( t => t.idCargoJefe === 0 || t.idCargoJefe === null ) ) {
         let node: TreeNode;
         let treeNode: TreeNode[] = [];

         if ( this.allPosition.filter( x => x.idCargoJefe === c.idCargo ).length > 0 ) {
            treeNode = this.buildChild( c );
         }
         node = {
            'label': c.cargo,
            'children': treeNode,
            'expanded': true
         };
         this.treeArrray.push( node );
         if ( this.position.idCargo === c.idCargo ) {
            this.selectedNode = node;
         }

      }
   }

   buildChild( dadInfo: Positions ) {
      let treeChild: TreeNode[] = [];

      for ( let p of this.allPosition.filter( x => x.idCargoJefe === dadInfo.idCargo ) ) {
         let node: TreeNode = [];
         let treeNode: TreeNode[] = [];
         if ( this.allPosition.filter( y => y.idCargoJefe === p.idCargo ).length > 0 ) {
            treeNode = this.buildChild( p );
         }
         node = {
            'label': p.cargo,
            'children': treeNode,
            'expanded': treeNode.length > 0 ? true : false
         };
         treeChild.push( node );
         if ( this.position.idCargo === p.idCargo ) {
            this.selectedNode = node;
         }
      }
      return treeChild;
   }

   getCategory() {
      let selectCategory = this.listcategoryTypes.filter( t => t.puntosMinimos <= this.position.puntos
                                                               && t.puntosMaximos >= this.position.puntos );
      if ( selectCategory.length > 0 ) {
         this.position.idCategoria = selectCategory[ 0 ].idCategoria;
         this.nivel = selectCategory[ 0 ].nivel;
      } else {
         this.position.idCategoria = null;
         this.nivel = null;
      }

   }

   validarOcupaciones() {
      this.positionsService.getPositionActivitiesById( this.position.idCargo ).subscribe(
         rest => {
            let contador = 0;
            for ( let r of rest ) {
               if ( r.indicadorHabilitado === true ) {
                  contador++;
               }
            }
            if ( contador > 0 ) {
               this.alertOcu = false;
               this.msgOcupaciones = [];
               this.onSubmit8();
               return true;
            } else {
               this.alertOcu = true;
               // this.msgOcupaciones[ 0 ] = {severity: 'error', summary: 'Error', detail: 'Debe agregar al menos una ocupación'};
               this._nav.setMesage( 0, {severity: 'error', summary: 'Error', detail: 'Debe agregar al menos una ocupación'} );
               return false;
            }
         } );
   }

   inputCleanUp( value: string ) {
      this.position.codigoCargo = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   inputNumber() {
      let numero = this.position.personaACargoDir + '';
      if ( this.position.personaACargoDir !== null ) {
         this.position.personaACargoDir = Number( numero.replace( /[^0-9]/g, '' ) );
      }
      let numeroi = this.position.personaACargoInd + '';
      if ( this.position.personaACargoInd !== null ) {
         this.position.personaACargoInd = Number( numeroi.replace( /[^0-9]/g, '' ) );
      }
   }

   capitalizeNombre() {
      let input = this.position.cargo;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.position.cargo = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   onChangeProcess( event: any ) {
      this.listSubProcess = [];
      this.listaService.getMasterDetailsByDependency( 'ListasProcesos', this.position.idProceso, 'SUBPROCESO' ).subscribe( res => {
         this.listSubProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listSubProcess.push( { label: s.nombre, value: s.idLista } ) );
      } );
   }

}
