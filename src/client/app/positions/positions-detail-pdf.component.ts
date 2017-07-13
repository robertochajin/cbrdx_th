import 'rxjs/add/operator/switchMap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Positions } from '../_models/positions';
import { SelectItem, Message, ConfirmationService, TreeNode } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PositionsService } from '../_services/positions.service';
import { ListaService } from '../_services/lista.service';
import { PositionsObservations } from '../_models/positionsObservations';
import { ListaItem } from '../_models/listaItem';
import { PositionCriteriasService } from '../_services/position-criterias.service';
import { EvaluationCriterias } from '../_models/evaluationCriterias';
import { PositionCriterias } from '../_models/positionCriterias';
import { EvaluationCriteriasServices } from '../_services/evaluation-criterias.service';
import { PositionRoles } from '../_models/positionRoles';
import { PositionRolesServices } from '../_services/position-roles.service';
import { PositionResponsabilities } from '../_models/positionResponsabilities';
import { PositionResponsabilitiesService } from '../_services/position-responsabilities.service';
import { AbsenceService } from '../_services/position-absence.service';
import { Absence } from '../_models/position-absence';
import { PositionsActivities } from '../_models/positionsActivities';
import { PositionCompetencies } from '../_models/positionCompetencies';
import { PositionCompetenciesServices } from '../_services/position-competencies.services';
import { CompetenciesServices } from '../_services/competencies.service';
import { PonderanciesServices } from '../_services/ponderancies.service';
import { GroupCompetenciesServices } from '../_services/groupCompetencies.service';
import { GroupCompetencies } from '../_models/groupCompetencies';
import { CompanyAssets } from '../_models/companyAssets';
import { CompanyAssetsServices } from '../_services/company-assets.service';
import { Productivity } from '../_models/productivity';
import { ProductivityService } from '../_services/productivity.service';
import { PositionPersonality } from '../_models/positionPersonality';
import { PositionPersonalityServices } from '../_services/position-personality.service';
import { Risk } from '../_models/position-risks';
import { Exam } from '../_models/position-exam';
import { RiskService } from '../_services/positios-risks.service';

@Component( {
               moduleId: module.id,
               selector: 'positions-view-detail-pdf',
               templateUrl: 'positions-detail-pdf.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionsDetailComponent implements OnInit {
   @Input()
   idCargo: number = 0;
   position: Positions = new Positions();
   observations: PositionsObservations[];
   allPosition: Positions[] = [];
   bossPositionTypes: SelectItem[] = [];
   liststateTypes: ListaItem[];
   stateTypes: ListaItem[];
   positionCriterias: PositionCriterias[] = [];
   evaluationCriterias: EvaluationCriterias[] = [];
   positionRoles: PositionRoles [] = [];
   positionResponsabilities: PositionResponsabilities [] = [];
   listAbsenceREE: Absence[] = [];
   listAbsenceREP: Absence[] = [];
   listAbsenceSUP: Absence[] = [];
   listPositionsActivities: PositionsActivities[] = [];
   ponderanciesList: SelectItem[] = [];
   competencies: SelectItem[] = [];
   tr: PositionCompetencies = new PositionCompetencies();
   positionCompetencies: PositionCompetencies [] = [];
   private groups: GroupCompetencies[] = [];
   listCompanyAssets: ListaItem[] = [];
   companyAssets: CompanyAssets[] = [];
   elementos: CompanyAssets[] = [];
   productivity: Productivity = new Productivity();
   ListProductivity: SelectItem[] = [];
   ListIQLevel: SelectItem[] = [];
   ListAptitudeLevel: SelectItem[] = [];
   listPersonality: ListaItem[] = [];
   personality: PositionPersonality[] = [];
   atributos: PositionPersonality[] = [];
   listRisks: Risk[] = [];
   PositionExam: Exam[];
   listExam: SelectItem[] = [];
   ListPositionExam: Exam[];
   treeArrray: TreeNode[] = [];
   selectedNode: TreeNode;

   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private positionsService: PositionsService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private listaService: ListaService,
      private positionCriteriasService: PositionCriteriasService,
      private evaluationCriteriasServices: EvaluationCriteriasServices,
      private positionRolesServices: PositionRolesServices,
      private positionResponsabilitiesService: PositionResponsabilitiesService,
      private absenceService: AbsenceService,
      private positionCompetenciesService: PositionCompetenciesServices,
      private competenciesServices: CompetenciesServices,
      private ponderanciesServices: PonderanciesServices,
      private groupCompetenciesServices: GroupCompetenciesServices,
      private companyAssetsService: CompanyAssetsServices,
      private productivityService: ProductivityService,
      private personalityService: PositionPersonalityServices,
      private riskService: RiskService,
      private _nav: NavService ) {
   }

   ngOnInit() {
      this.route.params.subscribe( ( params: Params ) => {
         let tempId = +params[ 'id' ];
         if ( tempId ) {
            this.position.idCargo = tempId;
         } else {
            this.position.idCargo = this.idCargo;
         }
         this.positionsService.get( this.position.idCargo ).subscribe( position => {
            this.position = position;
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
            } );
         } );
         this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe( observations => {
            this.observations = observations;
            this.listaService.getMasterDetails( 'ListasEstadosCargos' ).subscribe( res => {
               this.liststateTypes = res;
               this.nombresEstados();
            } );
         } );
         this.evaluationCriteriasServices.getAllEnabled().subscribe( criterias => {
            this.evaluationCriterias.push( {
                                              idCriterio: null,
                                              criterio: null,
                                              indicadorHabilitado: false,
                                              auditoriaUsuario: 1,
                                              auditoriaFecha: '',
                                              label: 'seleccione...',
                                              value: null
                                           } );

            criterias.map( c => this.evaluationCriterias.push( c ) );
            this.positionCriteriasService.getAllByPosition( this.position.idCargo )
            .subscribe( positionCriterias => {
               this.positionCriterias = positionCriterias;
               this.positionCriterias.map( p => {
                  p.idCargo = this.position.idCargo;
                  p.criterio = this.evaluationCriterias.find( e => e.idCriterio === p.idCriterio ).criterio;
               } );
            } );

            this.evaluationCriterias.map( e => {
               e.label = e.criterio;
               e.value = e.idCriterio;
            } );
         } );
         this.positionRolesServices.getAllByPosition( this.position.idCargo ).subscribe( prs => {
            this.positionRoles = prs;
         } );

         this.positionResponsabilitiesService.getAllByPosition( this.position.idCargo ).subscribe( prs => {
            this.positionResponsabilities = prs;
         } );
         this.absenceService.getReemplazaA( this.position.idCargo ).subscribe( rest => {
            this.listAbsenceREE = rest;
         } );
         this.absenceService.getReemplazado( this.position.idCargo ).subscribe( rest => {
            this.listAbsenceREP = rest;
         } );
         this.absenceService.getSupervisa( this.position.idCargo ).subscribe(
            rest => {
               for ( let r of rest ) {
                  this.absenceService.getPositionById( r.idCargoRelacion ).subscribe( res => {
                     r.cargoRelacion = res.cargo;
                  } );
                  this.listAbsenceSUP.push( r );
               }
            } );
         this.positionsService.getPositionActivitiesById( this.position.idCargo ).subscribe(
            rest => {
               for ( let r of rest ) {
                  this.positionsService.getActivitiesById( r.idOcupacion ).subscribe( res => {
                     r.ocupacion = res.ocupacion;
                  } );
                  if ( r.indicadorHabilitado === true ) {
                     this.listPositionsActivities.push( r );
                  }
               }
            } );
         this.ponderanciesServices.getAllEnabled().subscribe( ponderancies => {
            this.ponderanciesList.push( { label: 'Selccione...', value: null } );
            ponderancies.map( p => {
               this.ponderanciesList.push( { label: p.ponderacion, value: p.idPonderacion } );
            } );
         } );

         this.positionCompetenciesService.getAllByPosition( this.position.idCargo ).subscribe( pcs => {
            this.positionCompetencies = pcs;
            this.groupCompetenciesServices.getAllEnabled().subscribe( groups => {
               groups.map( g => {
                  this.competenciesServices.getAllEnabledByGroup( g.idGrupoCompetencia ).subscribe(
                     competencies => {

                        if ( competencies.length > 0 ) {
                           g.competencies = competencies;

                           g.competencies.map( c => {
                              let skill = this.positionCompetencies.find(
                                 ( element: PositionCompetencies, index: number, array: PositionCompetencies[] ) => {
                                    if ( element.idCargo === this.position.idCargo && element.idCompetencia === c.idCompetencia ) {
                                       return true;
                                    } else {
                                       return false;
                                    }
                                 } );

                              if ( skill !== undefined ) {
                                 c.cargoCompetencia = skill;
                              } else {
                                 c.cargoCompetencia = new PositionCompetencies();
                              }

                           } );
                           this.groups.push( g );
                        }
                     }
                  );
               } );
            } );
         } );
         this.listaService.getMasterDetails( 'ListasTiposElementos' ).subscribe( listCompanyAssets => {
            this.listCompanyAssets = listCompanyAssets;
            this.companyAssetsService.getAllByPosition( this.position.idCargo ).subscribe( res => {
               this.companyAssets = res;
               this.listCompanyAssets.map( ( lca: ListaItem ) => {
                  let item: CompanyAssets = new CompanyAssets();
                  item = this.companyAssets.find( cas => cas.idTipoElemento === lca.idLista );
                  if ( item === undefined ) {
                     item = new CompanyAssets();
                  }
                  item.idCargo = this.position.idCargo;
                  item.nombreLista = lca.nombre;
                  item.codigoLista = lca.codigo;
                  item.idTipoElemento = lca.idLista;
                  this.elementos.push( item );
               } );
            } );
         } );
         this.productivityService.getlistProductivityByIdCargo( this.position.idCargo ).subscribe( rest => {
            if ( rest !== undefined ) {
               this.productivity = rest;
            }
         } );
         this.productivityService.getlistProductivity().subscribe( rest => {
            this.ListProductivity.push( { label: 'Seleccione', value: null } );
            this.ListIQLevel.push( { label: 'Seleccione', value: null } );
            this.ListAptitudeLevel.push( { label: 'Seleccione', value: null } );
            for ( let dp of rest ) {
               this.ListProductivity.push( {
                                              label: dp.productividad,
                                              value: dp.idProductividad
                                           } );
               this.ListIQLevel.push( {
                                         label: dp.minimoIq + ' - ' + dp.maximoIq,
                                         value: dp.idProductividad
                                      } );
               this.ListAptitudeLevel.push( {
                                               label: dp.minimoAptitud + ' - ' + dp.maximoAptitud,
                                               value: dp.idProductividad
                                            } );
            }
         } );
         this.listaService.getMasterDetails( 'ListasAtributosCargos' ).subscribe( res => {
            this.listPersonality = res;
            this.personalityService.getAllByPosition( this.position.idCargo ).subscribe( res => {
               this.personality = res;
               this.listPersonality.map( ( lca: ListaItem ) => {
                  let item: PositionPersonality = new PositionPersonality();
                  item = this.personality.find( cas => cas.idAtributo === lca.idLista );
                  if ( item === undefined ) {
                     item = new PositionPersonality();
                  }
                  item.idCargo = this.position.idCargo;
                  item.nombreLista = lca.nombre;
                  item.codigoLista = lca.codigo;
                  item.idAtributo = lca.idLista;
                  this.atributos.push( item );
               } );
            } );
         } );
         this.riskService.getExamByIdCargo( this.position.idCargo ).subscribe( exam => {
            this.ListPositionExam = exam;
            this.PositionExam = exam;
            for ( let le of  this.listExam ) {
               let bandera = false;
               for ( let pe of this.ListPositionExam ) {
                  if ( Number( le.label ) === pe.idExamen ) {
                     bandera = true;
                     break;
                  }
               }
               if ( !bandera ) {
                  let ex = new Exam();
                  ex.idExamen = Number( le.value );
                  ex.examen = le.label;
                  ex.indicadorIngreso = false;
                  ex.indicadorPeriodicidad = false;
                  ex.indicadorRetiro = false;
                  this.PositionExam.push( ex );
               }
            }
         } );
         this.riskService.getRiskByIdCargo( this.position.idCargo ).subscribe( risk => {
            for ( let rk of risk ) {
               let r = new Risk();
               r.idCargo = rk.idCargo;
               r.idCargoRiesgo = rk.idCargoRiesgo;
               r.idRiesgo = rk.idRiesgo;
               r.auditoriaFecha = rk.auditoriaFecha;
               r.auditoriaFecha = rk.auditoriaFecha;
               r.indicadorHabilitado = rk.indicadorHabilitado;

               this.riskService.getRiskById( rk.idRiesgo ).subscribe( rest => {
                  r.riesgo = rest.riesgo;
                  this.riskService.getTypeRiskById( rest.idTipoRiesgo ).subscribe( restT => {
                     r.tipo = restT.riesgoTipo;
                  } );
                  this.riskService.getSubypeRiskById( rest.idSubTipoRiesgo ).subscribe( restS => {
                     r.subtipo = restS.riesgoSubTipo;
                  } );
               } );
               this.listRisks.push( r );
            }
         } );
         this.positionsService.getListPositions().subscribe( res => {
            this.allPosition = res;

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
         } );

      } );

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

   nombresEstados() {
      for ( let i = 0; i < this.observations.length; i++ ) {
         if ( this.observations[ i ].idEstadoCargo !== null ) {
            this.stateTypes = this.liststateTypes.filter( estado => {
               return estado.idLista === this.observations[ i ].idEstadoCargo;
            } );
            this.observations[ i ].estadoCargo = this.stateTypes[ 0 ].nombre;
         }
      }
   }

   goBack() {
      this.dismiss.emit( 1 );
   }
}