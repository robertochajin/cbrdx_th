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
   private zones: Zones[] = [];
   bossList: Employee[] = [];
   selectedBoss: Employee = new Employee();
   isbossWrong: boolean;
   bossPosition: Positions = new Positions();
   employeeBasics: any = {
      idTercero: '',
      nombreCompleto: '',
      cargo: '',
      area: '',
      direccionGeneral: '',
      correoTercero: '',
      correoUsuario: ''
   };

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
   private listRT: ListaItem[] = [];

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

      // zonesServices.getAll().subscribe( zones => {
      //    this.zones = zones
      // }, error => {
      //    this._nav.setMesage( 3, this.msg );
      // } );

      this.zones.push({
      idZona : 1,
      zona : 'string1',
      indicadorHabilitado : true,
      auditoriaUsuario : 1,
      auditoriaFecha : '',
                      });
      this.zones.push({
      idZona : 2,
      zona : 'string2',
      indicadorHabilitado : true,
      auditoriaUsuario : 1,
      auditoriaFecha : '',
                      });
      this.zones.push({
      idZona : 3,
      zona : 'string3',
      indicadorHabilitado : true,
      auditoriaUsuario : 1,
      auditoriaFecha : '',
                      });

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

   }

   bossCaptureId( event: any ) {

   }

   bossSearch( event: any ) {

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
