import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router } from '@angular/router';
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
import { RequirementReferral } from '../_models/requirementReferral';

class employeeBasicInfo {
   idTercero: number;
   nombreCompleto: string;
   idCargo: number;
   cargo: string;
   idArea: number;
   area: string;
   direccionGeneral: string;
   correoTercero: string;
   correoUsuario: string;
};

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement-form.component.html',
               selector: 'personnel-requirement-add',
               providers: [ ConfirmationService ]
            } )

export class PersonnelRequirementAddComponent implements OnInit {

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
   requirementReferralBU: RequirementReferral;
   categoryTypes: SelectItem[] = [];
   idUser: number;
   private contractTypes: SelectItem[] = [];
   private contractForms: SelectItem[] = [];
   private zones: SelectItem[] = [];
   isbossWrong: boolean;
   isPositionWrong: boolean;
   es: any;
   private listRT: ListaItem[] = [];
   minDate: Date = null;
   maxDate: Date = null;
   maxDateFinal: Date = null;
   bossPosition: Positions = new Positions();
   selectedPosition: Positions = new Positions();
   positionList: Positions[] = [];

   employeeBasics: employeeBasicInfo = new employeeBasicInfo();
   selectedBoss: employeeBasicInfo = new employeeBasicInfo();
   bossList: employeeBasicInfo[] = [];

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

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private router: Router,
      private usuariosService: UsuariosService,
      private listaService: ListaService,
      private listPositionsService: ListPositionsService,
      private employeesService: EmployeesService,
      private zonesServices: ZonesServices,
      private positionsService: PositionsService,
      private location: Location,
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
         this.zones.push({label: 'Seleccione...', value: null});
         zones.map((z: Zones) => this.zones.push( { label: z.zona, value: z.idZona } ));
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );

   }

   ngOnInit() {
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
   }

   onSubmit() {
      if(this.selectedBoss !== undefined && this.selectedBoss.idTercero !== undefined && this.selectedBoss.idTercero !== null){
         this.personnelRequirement.idJefe = this.selectedBoss.idTercero;
         this.personnelRequirement.idCargo = this.selectedPosition.idCargo;
         this.personnelRequirementServices.add(this.personnelRequirement).subscribe(res => {
            if(res.ok){
               this._nav.setMesage( 1, this.msg );
            }
         }, error => {
            this._nav.setMesage( 3, this.msg );
         });
      } else {
         this.isbossWrong = true;
      }

   }

   bossCaptureId( event: any ) {
      this.selectedBoss.idTercero = event.idTercero;
      this.selectedBoss.nombreCompleto = event.nombreCompleto;
      this.bossPosition.idCargo = event.idCargo;
      this.bossPosition.cargo = event.cargo;
      this.isbossWrong = false;
   }

   bossSearch( event: any ) {
      this.employeesService.getByNameAndArea(this.employeeBasics.idArea, event.query).subscribe(
         empl => this.bossList = empl
      );
   }

   positionSearch( event: any ) {
      let item = this.listRT.find(rt =>  rt.idLista === this.personnelRequirement.idTipoSolicitud);
      if (item !== undefined && item.codigo === 'CRGNVO') {
         this.positionsService.getByWildCard( event.query ).subscribe( list => this.positionList = list );
      } else {
         this.positionsService.getByWildCardAndArea( event.query, this.employeeBasics.idArea ).subscribe( list => this.positionList = list );
      }
   }

   positionCaptureId(event: any){
      this.personnelRequirement.idCargo = event.idCargo;
      this.selectedPosition.idCargo  = event.idCargo;
      this.selectedPosition.cargo  = event.cargo;
      this.isPositionWrong = false;
   }

   emailCleanUp( value: string ) {
      if (value !== undefined && value !== '' && value !== null){
         this.requirementReferral.correoElectronico = value.toLowerCase().replace( ' ', '' ).trim();
      }
   }

   inputVacancyCleanUp( value: string ) {
      if ( value !== undefined && value !== '' && value !== null ) {
         let quantity = value.toUpperCase().replace( /[^0-9]/g, '' ).trim();
         this.personnelRequirement.cantidadVacantes = Number( quantity );
      }
   }

   inputInterviewCleanUp( value: string ) {
      if ( value !== undefined && value !== '' && value !== null ) {
         let quantity = value.toUpperCase().replace( /[^0-9]/g, '' ).trim();
         this.personnelRequirement.cantidadConvocados = Number( quantity );
      }
   }

   onChangeTypeMethod( event: any ) {
      let code = '';
      let item = this.listRT.find(rt =>  rt.idLista === this.personnelRequirement.idTipoSolicitud);
      code = item.codigo;

      this.dispNombreCargo = false;
      this.dispFuncionCargo = false;
      this.dispFechaInicioRemplazo = false;
      this.dispFechaFinRemplazo = false;
      this.personnelRequirement.fechaInicio = null;
      this.personnelRequirement.fechaFin = null;
      this.personnelRequirement.nombreCargo = '';
      this.personnelRequirement.funcionCargo = '';

      this.dispCargo = true;
      this.dispZona = true;
      this.dispCategoria = true;
      this.dispFormaContratacion = true;
      this.dispTipoContratacion = true;
      this.dispColaboradorJefeInmediato = true;
      this.dispNumeroContratar = true;
      this.dispNumeroEntrevistar = true;

      if ( code === 'RMPLZ' ) {
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
      } else if ( code === 'RDP' || code === 'PLNCRR' ) {
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

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDate= new Date();
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDate = new Date();
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   addReferred(){

   }

   onSubmitReferred() {

   }

   cancelReferred(){

   }

   sendRequest(){

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
