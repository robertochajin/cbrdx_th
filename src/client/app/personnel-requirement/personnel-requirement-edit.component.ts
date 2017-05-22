import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Usuario } from '../_models/usuario';
import { Employee } from '../_models/employees';
import { JwtHelper } from 'angular2-jwt';
import { UsuariosService } from '../_services/usuarios.service';
import { EmployeesService } from '../_services/employees.service';
import { Positions } from '../_models/positions';
import { PositionsService } from '../_services/positions.service';
import { SelectItem } from 'primeng/components/common/api';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { ListPositionsService } from '../_services/lists-positions.service';
import { ZonesServices } from '../_services/zones.service';
import { Zones } from '../_models/zones';
import { NavService } from '../_services/_nav.service';
import { ResoursesRequiredServices } from '../_services/resourcesRequiredPurchases.service';
import { ResoursesTicsService } from '../_services/resoursesTics.service';
import { RequirementReferral } from '../_models/requirementReferral';
import { ResourcesRequiredPurchases } from '../_models/resourcesRequiredPurchases';
import { TicsResourses } from '../_models/ticsResourses';
import { Questionnaires  } from '../_models/questionnaires';
import { TranslateService } from 'ng2-translate';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { ConstanteService } from '../_services/constante.service';
import { Constante } from '../_models/constante';
import { VacanciesService } from '../_services/vacancies.service';
import { RequirementsAction } from '../_models/requirementsAction';

class employeeBasicInfo {
   idTercero: number;
   nombreCompleto: string;
   idCargo: number;
   cargo: string;
   idArea: number;
   idEstructuraFisica: number;
   area: string;
   direccionGeneral: string;
   correoTercero: string;
   correoUsuario: string;
}
;

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement-form.component.html',
               selector: 'personnel-requirement-add',
               providers: [ ConfirmationService ]
            } )

export class PersonnelRequirementEditComponent implements OnInit {

   msg: Message;
   user: Usuario = new Usuario();
   employee: Employee = new Employee();
   position: Positions = new Positions();
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   personnelRequirement: PersonnelRequirement = new PersonnelRequirement();
   requirementTypes: SelectItem[] = [];
   requirementReferrals: RequirementReferral[] = [];
   requirementReferral: RequirementReferral = new RequirementReferral();
   categoryTypes: SelectItem[] = [];
   idUser: number;
   private contractTypes: SelectItem[] = [];
   private contractForms: SelectItem[] = [];
   private zones: SelectItem[] = [];
   isbossWrong = false;
   isPositionWrong = false;
   es: any;
   private listRT: ListaItem[] = [];
   requestAction: ListaItem;
   creationProccesState: ListaItem;
   requestedState: ListaItem;
   minDate: Date = null;
   maxDate: Date = null;
   maxDateFinal: Date = null;
   bossPosition: Positions = new Positions();
   selectedPosition: Positions;
   positionList: Positions[] = [];

   objTiposReqAutorizacion: Constante;
   tiposReqAutorizacion: any[];
   objCargosNoReqAutorizacion: Constante;
   cargosNoReqAutorizacion: {tipo:number, cargo: number}[] = [{tipo:0, cargo: 0}];

   employeeBasics: employeeBasicInfo = new employeeBasicInfo();
   selectedBoss: employeeBasicInfo;
   bossList: employeeBasicInfo[] = [];

   purchasesList: ListaItem[] = [];
   ticsList: ListaItem[] = [];
   listQuest: ListaItem[] = [];
   purchasesId: any;
   ticsId: any;
   questId: any;
   ticsResourses: TicsResourses = new TicsResourses();
   resoursesPurchases: ResourcesRequiredPurchases = new ResourcesRequiredPurchases();
   questionnaires: Questionnaires = new Questionnaires();
   listResourses: ResourcesRequiredPurchases[] = [];
   listResoursesAll: ResourcesRequiredPurchases[] = [];
   listResoursesTics: TicsResourses[] = [];
   listResoursesQues: Questionnaires[] = [];
   listResoursesTicsAll: TicsResourses[] = [];
   listResoursesQuesAll: Questionnaires[] = [];
   wrongResourse: boolean = true;
   wrongResourseTics: boolean = true;
   wrongResourseQues: boolean = true;
   guardandoResourses: boolean = false;
   guardandoResoursesTics: boolean = false;
   guardandoResoursesQues: boolean = false;
   // variables de display
   public dispNombreCargo = false;
   public dispFuncionCargo = false;
   public dispCargo = false;
   public dispZona = false;
   public dispCategoria = false;
   public dispFormaContratacion = false;
   public dispTipoContratacion = false;
   public dispColaboradorJefeInmediato = false;
   public dispNumeroContratar = false;
   public dispNumeroEntrevistar = false;
   public dispFechaInicioRemplazo = false;
   public dispFechaFinRemplazo = false;
   public nroPlazas: string;
   private editingReferred = false;
   private blockedPositions: any[];
   public isPositionBlocked = false;

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private router: Router,
      private usuariosService: UsuariosService,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private listPositionsService: ListPositionsService,
      private employeesService: EmployeesService,
      private zonesServices: ZonesServices,
      private positionsService: PositionsService,
      private referralsServices: RequirementReferralsServices,
      private resoursesRequiredServices: ResoursesRequiredServices,
      private resoursesTicsService: ResoursesTicsService,
      private questionnairesService: QuestionnairesService,
      private vacanciesService: VacanciesService,
      private location: Location,
      private constanteService: ConstanteService,
      private translate: TranslateService,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {

      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let lastYear = year - 100;
      this.maxDate = new Date();
      this.maxDate.setFullYear( year + 10, month );
      this.minDate = new Date();
      this.minDate.setFullYear( lastYear, month );
      this.maxDateFinal = new Date();
      this.maxDateFinal.setMonth( month );
      this.maxDateFinal.setFullYear( year + 10 );

      this.listaService.getMasterDetailsByCode( 'ListasRequerimientosAcciones', 'SOLICITADO' ).subscribe( x => {
         this.requestAction = x
      } );

      this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'PRCREQ' ).subscribe( x => {
         this.creationProccesState = x
      } );

      this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'SOLICITADO' ).subscribe( x => {
         this.requestedState = x
      } );

      this.constanteService.getByCode( 'REQAUT' ).subscribe( req => {
         this.objTiposReqAutorizacion = req;
         this.tiposReqAutorizacion = this.objTiposReqAutorizacion.valor.split(',');

      });

      this.constanteService.getByCode( 'CARAUT' ).subscribe( carg => {
         this.objCargosNoReqAutorizacion = carg;
         this.cargosNoReqAutorizacion = JSON.parse(this.objCargosNoReqAutorizacion.valor);
      });

      constanteService.getByCode('CARREQ').subscribe((x:Constante) => {
         this.blockedPositions = x.valor.split(';');
      });

      listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         this.listRT = res;
         this.requirementTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.requirementTypes.push( { label: s.nombre, value: s.idLista } ) );
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

      listPositionsService.getCategoryTypes().subscribe( res => {
         this.categoryTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.categoryTypes.push( {
                                        label: dp.categoria,
                                        value: dp.idCategoria
                                     } );
         }
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

      listaService.getMasterDetails( 'ListasTiposContratos' ).subscribe( res => {
         this.contractTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.contractTypes.push( { label: s.nombre, value: s.idLista } ) );
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

      listaService.getMasterDetails( 'ListasFormasContrataciones' ).subscribe( res => {
         this.contractForms.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.contractForms.push( { label: s.nombre, value: s.idLista } ) );
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

      zonesServices.getAll().subscribe( zones => {
         this.zones.push( { label: 'Seleccione...', value: null } );
         zones.map( ( z: Zones ) => this.zones.push( { label: z.zona, value: z.idZona } ) );
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

   }

   ngOnInit() {
      this.resoursesRequiredServices.getAll().subscribe( rest => {
         this.listResoursesAll = rest;
      } );
      this.resoursesTicsService.getAll().subscribe( rest => {
         this.listResoursesTicsAll = rest;
      } );
      this.questionnairesService.getAll().subscribe( rest => {
         this.listResoursesQuesAll = rest;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         let idRequeriment = params[ 'requeriment' ];

         if ( idRequeriment === undefined ) {
            let token = localStorage.getItem( 'token' );

            if ( token !== null && token !== undefined ) {
               this.tokendecoded = this.jwtHelper.decodeToken( token );

               this.usuariosService.viewUser( this.tokendecoded.usuario.idUsuario ).subscribe( u => {
                  this.user = u;
                  if ( this.user.idTercero ) {
                     this.employeesService.getInfoPositionEmployee( this.user.idTercero ).subscribe( e => {
                        if ( e !== undefined ) {
                           this.employeeBasics = e;
                        }
                     } );
                  }
               } );

            } else {
               this.location.back();
            }
         } else {
            this.personnelRequirementServices.get( idRequeriment ).subscribe(
               pr => {
                  this.personnelRequirement = pr;
                  this.usuariosService.viewUser( this.personnelRequirement.idSolicitante ).subscribe( u => {
                     this.user = u;
                     if ( this.user.idTercero ) {
                        this.employeesService.getInfoPositionEmployee( this.user.idTercero ).subscribe( e => {
                           if ( e !== undefined ) {
                              this.employeeBasics = e;
                           }
                        } );
                     }
                  } );
                  this.onChangeTypeMethod(null);
               }
            );

            this.resoursesRequiredServices.getResoursesByIdRequirement( idRequeriment ).subscribe( rest => {
               this.listResourses = rest;
            } );

            this.resoursesTicsService.getResoursesByIdRequirement( idRequeriment ).subscribe( rest => {
               this.listResoursesTics = rest;
            } );
            this.questionnairesService.getResoursesByIdRequirement(  idRequeriment ).subscribe( rest => {
               this.listResoursesQues = rest;
            } );

            this.referralsServices.getAllRequirement( idRequeriment ).subscribe( ref => {
               this.requirementReferrals = ref;
            });
         }
      } );
   }

   onSubmit() {
      if (!this.dispColaboradorJefeInmediato || (this.selectedBoss !== undefined && this.selectedBoss.idTercero !== undefined && this.selectedBoss.idTercero !== null )) {
         if (!this.dispCargo || (this.selectedPosition !== undefined && this.selectedPosition.idCargo !== undefined && this.selectedPosition.idCargo !== null) ) {
            let item = this.listRT.find( rt => rt.idLista === this.personnelRequirement.idTipoSolicitud );
            if ((item.codigo === 'RMPLZ') &&
                this.blockedPositions.find(c => c === this.selectedPosition.codigoCargo)) {
               this.isPositionBlocked = true;
            } else {
               if(this.dispCargo) {
                  this.personnelRequirement.idCargo = this.selectedPosition.idCargo;
                  this.personnelRequirement.indicadorAutorizacion = this.isAuthNeeded(this.personnelRequirement.idTipoSolicitud,
                                                                                      this.selectedPosition.idCargo);
               } else {
                  this.personnelRequirement.indicadorAutorizacion = false;
               }
               if(this.dispColaboradorJefeInmediato)
                  this.personnelRequirement.idJefe = this.selectedBoss.idTercero;
               this.personnelRequirement.idSolicitante = this.user.idUsuario;

               this.personnelRequirement.idEstructuraOrganizacional = this.employeeBasics.idArea;
               this.personnelRequirement.idEstructuraFisica = this.employeeBasics.idEstructuraFisica;

               if ( this.personnelRequirement.idRequerimiento !== undefined && this.personnelRequirement.idRequerimiento !== null ) {
                  this.personnelRequirementServices.update( this.personnelRequirement ).subscribe( res => {
                     if ( res ) {
                        this._nav.setMesage( 1, this.msg );
                     }
                  }, error => {
                     this._nav.setMesage( 3, this.msg );
                  } );
               } else {
                  this.personnelRequirement.idEstado = this.creationProccesState.idLista;
                  this.personnelRequirement.fechaSolicitud = new Date();
                  this.personnelRequirementServices.add( this.personnelRequirement ).subscribe( res => {
                     if ( res ) {
                        this.personnelRequirement.idRequerimiento = res.idRequerimiento;
                        this.personnelRequirement.auditoriaFecha = res.auditoriaFecha;
                        this.personnelRequirement.auditoriaUsuario = res.auditoriaUsuario;
                        this._nav.setMesage( 1, this.msg );
                     }
                  }, error => {
                     this._nav.setMesage( 3, this.msg );
                  } );
               }
            }
         } else {
            this.isPositionWrong = true;
         }
      } else {
         this.isbossWrong = true;
      }

   }

   isAuthNeeded (idRequestType: number, idPosition: number) : boolean {
      let requiereAutorizacion = false;
      if(this.tiposReqAutorizacion !== undefined && this.tiposReqAutorizacion.find(c => c === idRequestType.toString())){
         console.info(this.cargosNoReqAutorizacion);
         requiereAutorizacion = true;
         if(this.cargosNoReqAutorizacion.find(c => c.tipo === idRequestType &&
                                                   c.cargo === idPosition)){
            requiereAutorizacion = false;
         }
      }else{
         requiereAutorizacion = false;
      }
      return requiereAutorizacion;
   }

   bossCaptureId( event: any ) {
      this.selectedBoss.idTercero = event.idTercero;
      this.selectedBoss.nombreCompleto = event.nombreCompleto;
      this.bossPosition.idCargo = event.idCargo;
      this.bossPosition.cargo = event.cargo;
      this.isbossWrong = false;
   }

   bossSearch( event: any ) {
      this.employeesService.getByNameAndArea( this.employeeBasics.idArea, event.query.replace(/[^0-9a-zA-Z]+/g,'') ).subscribe(
         empl => this.bossList = empl
      );
   }

   positionSearch( event: any ) {
      let item = this.listRT.find( rt => rt.idLista === this.personnelRequirement.idTipoSolicitud );
      if ( item !== undefined && item.codigo === 'CRGNVO' ) {
         this.positionsService.getByWildCard( event.query.replace(/[^0-9a-zA-Z]+/g,'') ).subscribe( list => this.positionList = list );
      } else {
         this.positionsService.getByWildCardAndArea( event.query.replace(/[^0-9a-zA-Z]+/g,''), this.employeeBasics.idArea )
         .subscribe( list => this.positionList = list );
      }
   }

   positionCaptureId( event: any ) {
      this.selectedPosition.idCargo = event.idCargo;
      this.selectedPosition.cargo = event.cargo;
      this.isPositionWrong = false;
   }

   emailCleanUp( value: string ) {
      if ( value !== undefined && value !== '' && value !== null ) {
         this.requirementReferral.correoElectronico = value.toLowerCase().replace( ' ', '' ).trim();
      }
   }

   inputVacancyCleanUp( value: any ) {
      if ( value !== undefined && value !== '' && value !== null ) {
         let quantity = value.toUpperCase().replace( /[^0-9]/g, '' ).trim();
         this.personnelRequirement.cantidadVacantes = Number( quantity.replace('-','') );
      }
   }

   inputInterviewCleanUp( value: any ) {
      if ( value !== undefined && value !== '' && value !== null ) {
         let quantity = value.toUpperCase().replace( /[^0-9]/g, '' ).trim();
         this.personnelRequirement.cantidadConvocados = Number( quantity.replace('-','') );
      }
   }

   onChangeTypeMethod( event: any ) {
      let code = '';
      let item = this.listRT.find( rt => rt.idLista === this.personnelRequirement.idTipoSolicitud );
      if ( code !== undefined) {
         code = item.codigo;

         if ( code === 'DMNPLNT' ) {
            this.translate.get( 'REQUERIMIENTOPERSONAL.LBL_CANTIDADAPLAZASDISMINUIR' ).subscribe( ( res: string ) => {
               this.nroPlazas = res;
            } );
         } else {
            this.translate.get( 'REQUERIMIENTOPERSONAL.LBL_CANTIDADACONTRATAR' ).subscribe( ( res: string ) => {
               this.nroPlazas = res;
            } );
         }

         this.dispNombreCargo = false;
         this.dispFuncionCargo = false;
         this.dispFechaInicioRemplazo = false;
         this.dispFechaFinRemplazo = false;

         this.dispCargo = true;
         this.dispZona = true;
         this.dispCategoria = true;
         this.dispFormaContratacion = true;
         this.dispTipoContratacion = true;
         this.dispColaboradorJefeInmediato = true;
         this.dispNumeroContratar = true;
         this.dispNumeroEntrevistar = true;

         if ( code !== 'RMPLZ' && code !== 'RDP' && code !== 'PLNCRR' ) {
            this.personnelRequirement.fechaInicio = null;
            this.personnelRequirement.fechaFin = null;
         }

         if ( code !== 'CRGNVO' ) {
            this.personnelRequirement.nombreCargo = '';
            this.personnelRequirement.funcionCargo = '';
         }

         if ( code === 'RMPLZ' || code === 'RDP' || code === 'PLNCRR' ) {
            this.dispFechaInicioRemplazo = true;
            this.dispFechaFinRemplazo = true;
         } else if ( code === 'DMNPLNT' ) {
            this.dispNumeroEntrevistar = false;
            this.dispZona = false;
            this.dispCategoria = false;
            this.dispFormaContratacion = false;
            this.dispTipoContratacion = false;
            this.dispColaboradorJefeInmediato = false;
         } else if ( code === 'CRGNVO' ) {
            this.dispCargo = false;
            this.dispNombreCargo = true;
            this.dispFuncionCargo = true;
         } else if ( code === 'CRGELMN' ) {
            this.dispZona = false;
            this.dispCategoria = false;
            this.dispFormaContratacion = false;
            this.dispTipoContratacion = false;
            this.dispColaboradorJefeInmediato = false;
            this.dispNumeroContratar = false;
            this.dispNumeroEntrevistar = false;
         } else if ( code === 'VCNT' ) {
         } else if ( code === 'APLNT' || code === 'CRGNVAREA' ) {
         } else {
            this.dispCargo = false;
            this.dispZona = false;
            this.dispCategoria = false;
            this.dispFormaContratacion = false;
            this.dispTipoContratacion = false;
            this.dispColaboradorJefeInmediato = false;
            this.dispNumeroContratar = false;
            this.dispNumeroEntrevistar = false;
         }
      }
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDate = new Date();
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDate = new Date();
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   editReferred( requirementReferral: RequirementReferral ) {
      this.editingReferred = true;
      this.requirementReferral = Object.assign( {}, requirementReferral );
   }

   addReferred() {
      this.requirementReferral = new RequirementReferral();
         this.editingReferred = true;
   }

   onSubmitReferred() {

      if ( this.requirementReferral.idRequerimientoReferido !== undefined ) {
         this.referralsServices.update( this.requirementReferral ).subscribe( res => {
            if ( res.ok ) {
               this.requirementReferrals.map(r => {
                  if(r.idRequerimientoReferido === this.requirementReferral.idRequerimientoReferido){
                     r = this.requirementReferral;
                  }
               });
               this.requirementReferral = new RequirementReferral();
               this.editingReferred = false;
               let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
               this._nav.setMesage( typeMessage, this.msg );
            }
         }, error => {
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this._nav.setMesage( typeMessage, this.msg );
         } );
      } else {
         this.requirementReferral.idRequerimiento = this.personnelRequirement.idRequerimiento;
         this.requirementReferral.fechaReferencia = new Date;
         this.referralsServices.add( this.requirementReferral ).subscribe( res => {
            if ( res ) {
               this.requirementReferrals.push( res );
               this.editingReferred = false;
               let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
               this._nav.setMesage( typeMessage, this.msg );
            }
         }, error => {
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this._nav.setMesage( typeMessage, this.msg );
         } );
      }

   }

   cancelReferred() {
      this.confirmationService.confirm( {
                                           message: `¿Esta seguro que desea Cancelar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',

                                           accept: () => {
                                              this.requirementReferral = new RequirementReferral();
                                              this.editingReferred = false;
                                           }
                                        } );
   }

   sendRequest() {
      this.confirmationService.confirm( {
                                           message: ` Al enviar la solicitud, no podrá ejecutar más cambios en el requerimiento. deseas continuar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.personnelRequirement.idEstado = this.requestedState.idLista;
                                              this.personnelRequirementServices.update( this.personnelRequirement ).subscribe( res => {
                                                 if ( res ) {
                                                    let action : RequirementsAction = new RequirementsAction();
                                                    action.idRequerimiento = this.personnelRequirement.idRequerimiento;
                                                    action.idAccion = this.requestAction.idLista;
                                                    action.observacion = 'Solicitud de requerimiento';
                                                    this.vacanciesService.setAction(action).subscribe(acc => {
                                                       if ( acc ){
                                                          this._nav.setMesage( 1, this.msg );
                                                          this.router.navigate( [ 'personnel-requirement' ] );
                                                       }
                                                    });
                                                 }
                                              }, error => {
                                                 this._nav.setMesage( 3, this.msg );
                                              } );
                                           }
                                        } );
   }

   captureResourseId( event: any ) {
      this.resoursesPurchases.idCompra = event.idLista;
      this.resoursesPurchases.idRequerimiento = this.personnelRequirement.idRequerimiento;
      this.wrongResourse = false;
   }

   resourseSearch( event: any ) {
      this.listaService.getMasterDetailsByWildCard( 'ListasTiposCompras', event.query ).subscribe( rest => {
         this.purchasesList = rest;
         this.purchasesList.map( d => d.nombre = d.idLista + ' : ' + d.nombre );
      } );
   }
   captureResourseQuesId( event: any ) {
      this.questionnaires.idCuestionario = event.idLista;
      this.questionnaires.idRequerimiento =  this.personnelRequirement.idRequerimiento;
      this.wrongResourseQues = false;
   }

   resourseQuesSearch( event: any ) {
      this.listaService.getMasterDetailsByWildCard( 'ListasCuestionarios', event.query ).subscribe( rest => {
         this.listQuest = rest;
         this.listQuest.map( d => d.nombre = d.idLista + ' : ' + d.nombre );
      } );
   }

   captureResourseTicsId( event: any ) {
      this.ticsResourses.idTic = event.idLista;
      this.ticsResourses.idRequerimiento =  this.personnelRequirement.idRequerimiento;
      this.wrongResourseTics = false;
   }

   resourseTicsSearch( event: any ) {
      this.listaService.getMasterDetailsByWildCard( 'ListasTICs', event.query ).subscribe( rest => {
         this.ticsList = rest;
         this.ticsList.map( d => d.nombre = d.idLista + ' : ' + d.nombre );
      } );
   }

   onSubmit3() {
      let temp: any;
      if ( this.resoursesPurchases.idCompra === this.purchasesId.idLista ) {
         this.guardandoResourses = true;
         this.resoursesPurchases.idRequerimiento = this.personnelRequirement.idRequerimiento;
         temp = this.listResoursesAll.find(
            r => r.idCompra === this.resoursesPurchases.idCompra && r.idRequerimiento === this.resoursesPurchases.idRequerimiento );
         if ( temp ) {
            if ( !temp.indicadorHabilitado ) {
               temp.indicadorHabilitado = true;
               this.resoursesRequiredServices.update( temp ).subscribe( rest => {
                  this.guardandoResourses = false;
                  this.wrongResourse = true;
                  this.purchasesId = null;
                  this.listResourses = [];
                  this.listResoursesAll = [];
                  this.resoursesRequiredServices.getResoursesByIdRequirement( this.personnelRequirement.idRequerimiento ).subscribe(
                     rest => {
                        this.listResourses = rest;
                     } );
                  this.resoursesRequiredServices.getAll().subscribe( rest => {
                     this.listResoursesAll = rest;
                  } );
               } );
            } else {
               this.guardandoResourses = false;
               this.wrongResourse = true;
               this.purchasesId=null;
               this._nav.setMesage( 0, {
                  severity: 'warn', summary: 'Información', detail: 'No es posible agregar mas de una vez un' +
                                                                    ' recurso'
               } );
            }
         } else {
            this.resoursesRequiredServices.add( this.resoursesPurchases ).subscribe( rest => {
               this.guardandoResourses = false;
               this.wrongResourse = true;
               this.purchasesId = null;
               this.listResourses = [];
               this.listResoursesAll = [];
               this.resoursesRequiredServices.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
                  this.listResourses = rest;
               } );
               this.resoursesRequiredServices.getAll().subscribe( rest => {
                  this.listResoursesAll = rest;
               } );
            } );
         }
      }
   }

   delResourses( r: ResourcesRequiredPurchases ) {
      r.indicadorHabilitado = false;
      this.resoursesRequiredServices.update( r ).subscribe( res => {
         this.listResourses = [];
         this.listResoursesAll = [];
         this.resoursesRequiredServices.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
            this.listResourses = rest;
         } );
         this.resoursesRequiredServices.getAll().subscribe( rest => {
            this.listResoursesAll = rest;
         } );
      } );
   }

   onSubmit4() {
      let temp: any;
      if ( this.ticsResourses.idTic === this.ticsId.idLista ) {
         this.guardandoResoursesTics = true;
         this.ticsResourses.idRequerimiento = this.personnelRequirement.idRequerimiento;
         temp = this.listResoursesTicsAll.find(
            r => r.idTic === this.ticsResourses.idTic && r.idRequerimiento === this.ticsResourses.idRequerimiento );
         if ( temp ) {
            if ( !temp.indicadorHabilitado ) {
               temp.indicadorHabilitado = true;
               this.resoursesTicsService.update( temp ).subscribe( rest => {
                  this.guardandoResoursesTics = false;
                  this.wrongResourseTics = true;
                  this.ticsId = null;
                  this.listResoursesTics = [];
                  this.listResoursesTicsAll = [];
                  this.resoursesTicsService.getResoursesByIdRequirement( this.personnelRequirement.idRequerimiento ).subscribe( rest => {
                     this.listResoursesTics = rest;
                  } );
                  this.resoursesTicsService.getAll().subscribe( rest => {
                     this.listResoursesTicsAll = rest;
                  } );
               } );
            } else {
               this.guardandoResoursesTics = false;
               this.wrongResourseTics = true;
               this.ticsId = null;
               this._nav.setMesage( 0, {
                  severity: 'warn', summary: 'Información', detail: 'No es posible agregar mas de una vez un' +
                                                                    ' recurso'
               } );
            }
         } else {
            this.resoursesTicsService.add( this.ticsResourses ).subscribe( rest => {
               this.guardandoResoursesTics = false;
               this.wrongResourseTics = true;
               this.ticsId = null;
               this.listResoursesTics = [];
               this.listResoursesTicsAll = [];
               this.resoursesTicsService.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
                  this.listResoursesTics = rest;
               } );
               this.resoursesTicsService.getAll().subscribe( rest => {
                  this.listResoursesTicsAll = rest;
               } );
            } );
         }
      }
   }

   delResoursesTics( r: TicsResourses ) {
      r.indicadorHabilitado = false;
      this.resoursesTicsService.update( r ).subscribe( res => {
         this.listResoursesTics = [];
         this.listResoursesTicsAll = [];
         this.resoursesTicsService.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
            this.listResoursesTics = rest;
         } );
         this.resoursesTicsService.getAll().subscribe( rest => {
            this.listResoursesTicsAll = rest;
         } );
      } );
   }
   onSubmitQuestionnaires() {
      let temp: any;
      if ( this.questionnaires.idCuestionario === this.questId.idLista ) {
         this.guardandoResoursesQues = true;
         this.questionnaires.idRequerimiento =  this.personnelRequirement.idRequerimiento;
         temp = this.listResoursesQuesAll.find(
            r => r.idCuestionario === this.questionnaires.idCuestionario && r.idRequerimiento === this.questionnaires.idRequerimiento );
         if ( temp ) {
            if ( !temp.indicadorHabilitado ) {
               temp.indicadorHabilitado = true;
               this.questionnairesService.update( temp ).subscribe( rest => {
                  this.guardandoResoursesQues = false;
                  this.wrongResourseQues = true;
                  this.questId = null;
                  this.listResoursesQues = [];
                  this.listResoursesQuesAll = [];
                  this.questionnairesService.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
                     this.listResoursesQues = rest;
                  } );
                  this.questionnairesService.getAll().subscribe( rest => {
                     this.listResoursesQuesAll = rest;
                  } );
               } );
            } else {
               this.guardandoResoursesQues = false;
               this.wrongResourseQues = true;
               this.questId = null;
               this._nav.setMesage( 0, {
                  severity: 'warn', summary: 'Información', detail: 'No es posible agregar mas de una vez un' +
                                                                    ' recurso'
               } );
            }
         } else {
            this.questionnairesService.add( this.questionnaires ).subscribe( rest => {
               this.guardandoResoursesQues = false;
               this.wrongResourseQues = true;
               this.questId = null;
               this.listResoursesQues = [];
               this.listResoursesQuesAll = [];
               this.questionnairesService.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
                  this.listResoursesQues = rest;
               } );
               this.questionnairesService.getAll().subscribe( rest => {
                  this.listResoursesQuesAll = rest;
               } );
            } );
         }
      }
   }

   delResoursesQues( r: Questionnaires ) {
      r.indicadorHabilitado = false;
      this.questionnairesService.update( r ).subscribe( res => {
         this.listResoursesQues = [];
         this.listResoursesQuesAll = [];
         this.questionnairesService.getResoursesByIdRequirement(  this.personnelRequirement.idRequerimiento ).subscribe( rest => {
            this.listResoursesQues = rest;
         } );
         this.questionnairesService.getAll().subscribe( rest => {
            this.listResoursesQuesAll = rest;
         } );
      } );
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }
}
