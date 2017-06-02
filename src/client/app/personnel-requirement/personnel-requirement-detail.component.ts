import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VPersonnelRequirement } from '../_models/vPersonnelRequirement';
import { EmployeesService } from '../_services/employees.service';
import { UsuariosService } from '../_services/usuarios.service';
import { JwtHelper } from 'angular2-jwt';
import { Usuario } from '../_models/usuario';
import { Employee } from '../_models/employees';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { RequirementReferral } from '../_models/requirementReferral';
import { ResoursesRequiredServices } from '../_services/resourcesRequiredPurchases.service';
import { ResoursesTicsService } from '../_services/resoursesTics.service';
import { RequirementQuestionnairesService } from '../_services/requirement-questionnaires.service';
import { ResourcesRequiredPurchases } from '../_models/resourcesRequiredPurchases';
import { TicsResourses } from '../_models/ticsResourses';
import { RequirementQuestionnaires } from '../_models/requirementQuestionnaires';
import { TranslateService } from 'ng2-translate';

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
}
;

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement-detail.component.html',
               selector: 'personnel-requirement'
            } )
export class PersonnelRequirementDetailComponent {

   vPersonnelRequirement: VPersonnelRequirement = new VPersonnelRequirement();
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   user: Usuario = new Usuario();
   employee: Employee = new Employee();
   employeeBasics: employeeBasicInfo = new employeeBasicInfo();
   private listRT: ListaItem[] = [];
   requirementReferrals: RequirementReferral[] = [];
   listResourses: ResourcesRequiredPurchases[] = [];
   listResoursesTics: TicsResourses[] = [];
   listQuestionnaires: RequirementQuestionnaires[] = [];
   public nroPlazas: string;
   msg: Message;

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
      private employeesService: EmployeesService,
      private referralsServices: RequirementReferralsServices,
      private _nav: NavService,
      private location: Location,
      private translate: TranslateService,
      private resoursesRequiredServices: ResoursesRequiredServices,
      private resoursesTicsService: ResoursesTicsService,
      private questionnairesService: RequirementQuestionnairesService,
      private route: ActivatedRoute ) {

   }

   ngOnInit() {
      let code = '';
      this.route.params.switchMap( ( params: Params ) => this.personnelRequirementServices.getByIdRequirement( +params[ 'id' ] ) )
      .subscribe( data => {
         this.vPersonnelRequirement = data;
         this.usuariosService.viewUser( this.vPersonnelRequirement.idSolicitante ).subscribe( u => {
            this.user = u;
            if ( this.user.idTercero ) {
               this.employeesService.getInfoPositionEmployee( this.user.idTercero ).subscribe( e => {
                  if ( e !== undefined ) {
                     this.employeeBasics = e;
                  }
               } );
            }
         } );
         this.referralsServices.getByIdRequirement( data.idRequerimiento ).subscribe( data => {
            this.requirementReferrals = data;
         } );
         this.resoursesRequiredServices.getResoursesByIdRequirement( data.idRequerimiento ).subscribe( rest => {
            this.listResourses = rest;
         } );
         this.resoursesTicsService.getResoursesByIdRequirement( data.idRequerimiento ).subscribe( rest => {
            this.listResoursesTics = rest;
         } );
         this.questionnairesService.getResoursesByIdRequirement( data.idRequerimiento ).subscribe( rest => {
            this.listQuestionnaires = rest;
         } );
         this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
            this.listRT = res;
            let item = this.listRT.find( rt => rt.idLista === this.vPersonnelRequirement.idTipoSolicitud );
            code = item.codigo;
            this.dispNombreCargo = false;
            this.dispFuncionCargo = false;
            this.dispFechaInicioRemplazo = false;
            this.dispFechaFinRemplazo = false;
            // this.vPersonnelRequirement.fechaInicio = null;
            // this.vPersonnelRequirement.fechaFin = null;
            // this.vPersonnelRequirement.nombreCargo = '';
            // this.vPersonnelRequirement.funcionCargo = '';

            this.dispCargo = true;
            this.dispZona = true;
            this.dispCategoria = true;
            this.dispFormaContratacion = true;
            this.dispTipoContratacion = true;
            this.dispColaboradorJefeInmediato = true;
            this.dispNumeroContratar = true;
            this.dispNumeroEntrevistar = true;

            if ( code === 'DMNPLNT' ) {
               this.translate.get( 'REQUERIMIENTOPERSONAL.LBL_CANTIDADAPLAZASDISMINUIR' ).subscribe( ( res: string ) => {
                  this.nroPlazas = res;
               } );
            } else {
               this.translate.get( 'REQUERIMIENTOPERSONAL.LBL_CANTIDADACONTRATAR' ).subscribe( ( res: string ) => {
                  this.nroPlazas = res;
               } );
            }

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
         }, error => {
            this._nav.setMesage( 3, this.msg );
         } );
      } );

   }

   goBack(): void {
      this.location.back();
   }
}
