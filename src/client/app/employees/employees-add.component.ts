import 'rxjs/add/operator/switchMap';
import {Component, Input}         from '@angular/core';
import {Router, ActivatedRoute}   from '@angular/router';
import {Location}                 from '@angular/common';
import {Employee}                 from '../_models/employees';
import {SelectItem, Message, ConfirmDialog, ConfirmationService} from 'primeng/primeng';
import {EmployeesService}         from '../_services/employees.service';
import {ListEmployeesService}     from '../_services/lists-employees.service';
import {PoliticalDivisionService} from "../_services/political-division.service";
import {DivisionPolitica}         from "../_models/divisionPolitica";

import {Ocupaciones}                from "../_models/ocupaciones";
import {OcupacionesService}         from "../_services/ocupaciones.service";

import {ActividadEconomica}         from "../_models/actividadEconomica";
import {ActividadEconomicaService}  from "../_services/actividadEconomica.service";
import * as moment from 'moment/moment';
import {ListaService} from "../_services/lista.service";

@Component({
   moduleId: module.id,
   selector: 'employees',
   templateUrl: 'employees-form.component.html',
   providers: [ConfirmationService]
})

export class EmployeesAddComponent {
   @Input()
   employee: Employee = new Employee();
   header: string = 'Agregando Colaborador';

   personTypes: SelectItem[] = [];
   documentTypes: SelectItem[] = [];
   resultExpeditionCity: DivisionPolitica[];
   resultBirthPlace: DivisionPolitica[] = [];
   ciudadExpDocumento: string;
   backupCiudadExpDocumento: string;
   ciudadNacimiento: string;
   backupCiudadNacimiento: string;
   genderTypes: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   rhRactorTypes: SelectItem[] = [];
   healthTypes: SelectItem[] = [];
   occupationsTypes: SelectItem[] = [];
   academicLevelTypes: SelectItem[] = [];
   affiliationTypes: SelectItem[] = [];
   sector: SelectItem[] = [];
   activities: SelectItem[] = [];
   occupations: SelectItem[] = [];
   legalStatusTypes: SelectItem[] = [];
   msgs: Message[] = [];

   maxDate: Date = null;
   maxDateDocumento: Date = null;
   range: string;
   es: any;
   expeditionDate: string;
   birthDate: string;
   deathDate: string;
   idTipoTercero: number;

   constructor(private employeesService: EmployeesService,
               private router: Router,
               private location: Location,
               private listaService: ListaService,
               private listEmployeesService: ListEmployeesService,
               private politicalDivisionService: PoliticalDivisionService,
               private actividadEconomicaService: ActividadEconomicaService,
               private ocupacionesService: OcupacionesService,
               private confirmationService: ConfirmationService) {
      this.listEmployeesService.getListPersonTypes().subscribe(res => {
         this.personTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.personTypes.push({
               label: dp.nombreListaTipoPersona,
               value: dp.idListaTipoPersona
            });
         }
         this.employee.idTipoPersona = this.personTypes[0].value;
      });
      this.listEmployeesService.getDocumentTypes().subscribe(res => {
         this.documentTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.documentTypes.push({
               label: dp.nombreListaTipoDocumento,
               value: dp.idListaTipoDocumento
            });
         }
         this.employee.idTipoDocumento = this.documentTypes[0].value;
      });

      this.listEmployeesService.getGenderTypes().subscribe(res => {
         this.genderTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.genderTypes.push({
               label: dp.nombreListaGenero,
               value: dp.idListaGenero
            });
         }
         this.employee.idGenero = this.genderTypes[0].value;
      });
      this.listEmployeesService.getMaritalStatusTypes().subscribe(res => {
         this.maritalStatusTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.maritalStatusTypes.push({
               label: dp.nombreListaEstadoCivil,
               value: dp.idListaEstadoCivil
            });
         }
         this.employee.idEstadoCivil = this.maritalStatusTypes[0].value;
      });
      this.listEmployeesService.getRhRactorTypes().subscribe(res => {
         this.rhRactorTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.rhRactorTypes.push({
               label: dp.nombre,
               value: dp.idListaFactorRh
            });
         }
         this.employee.idFactorRh = this.rhRactorTypes[0].value;
      });
      this.listEmployeesService.getHealthTypes().subscribe(res => {
         this.healthTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.healthTypes.push({
               label: dp.nombre,
               value: dp.idListaCoberturaSalud
            });
         }
         this.employee.idCoberturaSalud = this.healthTypes[0].value;
      });
      this.listEmployeesService.getOccupationsTypes().subscribe(res => {
         this.occupationsTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.occupationsTypes.push({
               label: dp.nombre,
               value: dp.idListaTipoOcupacion
            });
         }
         this.employee.idTipoOcupacion = this.occupationsTypes[0].value;
      });
      this.listEmployeesService.getAcademicLevelTypes().subscribe(res => {
         this.academicLevelTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.academicLevelTypes.push({
               label: dp.nombreListaNivelEstudio,
               value: dp.idListaNivelEstudio
            });
         }
         this.employee.idNivelEducacion = this.academicLevelTypes[0].value;
      });
      this.listEmployeesService.getAffiliationTypes().subscribe(rest => {
         this.affiliationTypes.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.affiliationTypes.push({
               label: dp.nombre,
               value: dp.idListaTipoAfiliacion
            });
         }
         this.employee.idTipoAfiliacion = rest[0].idListaTipoAfiliacion;
      });
      this.actividadEconomicaService.listByPadre(0).subscribe(res => {
         this.sector.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.sector.push({
               label: dp.actividadEconomica,
               value: dp.idActividadEconomica
            });
         }
         this.employee.idSectorEconomico = this.sector[0].value;
         this.activities.push({label: "Seleccione Sector", value: null});
      });

      this.ocupacionesService.listByNivel(4).subscribe(res => {
         this.occupations.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.occupations.push({
               label: dp.ocupacion,
               value: dp.idOcupacion
            });
         }
         this.employee.idOcupacion = this.occupations[0].value;
      });

      this.listaService.getMasterDetailsByCode('ListasTiposTerceros', "TERCOL").subscribe(
         res => {
            this.idTipoTercero = res.idLista
      });

   }

   ngOnInit() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
         dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
         dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
         monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
         monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
      };
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let lasYear = year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth(month);
      this.maxDate.setFullYear(year);
      this.maxDateDocumento = new Date();
      this.maxDateDocumento.setMonth(month);
      this.maxDateDocumento.setFullYear(year);
      this.employee.indicadorHabilitado = true;
      this.employee.indicadorVivo = true;
      this.employee.idTipoOcupacion = 1;
      this.range = `${lasYear}:${year}`;
      this.focusUP();
   }

   onSubmit() {
      this.focusUP();
      if (this.ciudadExpDocumento != this.backupCiudadExpDocumento) {
         this.ciudadExpDocumento = "";
         this.employee.ciudadExpDocumento = '';
      }
      if (this.ciudadNacimiento != this.backupCiudadNacimiento) {
         this.ciudadNacimiento = "";
         this.employee.ciudadNacimiento = '';
      }
      if (this.ciudadExpDocumento == this.backupCiudadExpDocumento && this.ciudadNacimiento == this.backupCiudadNacimiento) {
         this.msgs = [];
         this.employee.primerNombre = this.capitalizeSave(this.employee.primerNombre);
         this.employee.segundoNombre = this.capitalizeSave(this.employee.segundoNombre);
         this.employee.primerApellido = this.capitalizeSave(this.employee.primerApellido);
         this.employee.segundoApellido = this.capitalizeSave(this.employee.segundoApellido);

         let mom: moment.Moment = moment(this.expeditionDate, 'MM/DD/YYYY');
         this.employee.fechaDocumento = mom.format('YYYY-MM-DD');
         let mom2: moment.Moment = moment(this.birthDate, 'MM/DD/YYYY');
         this.employee.fechaNacimiento = mom2.format('YYYY-MM-DD');
         if (this.employee.indicadorVivo == false) {
            let mom3: moment.Moment = moment(this.deathDate, 'MM/DD/YYYY');
            this.employee.fechaDefuncion = mom3.format('YYYY-MM-DD');
         }
         this.employee.idTipoTercero = this.idTipoTercero;

         this.employeesService.add(this.employee)
            .subscribe(data => {
               this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
               //this.router.navigate(['/employees']);
               this.location.back();
            }, error => {
               this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
      }
   }

   goBack(): void {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea salir sin guardar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.router.navigate(['/employees']);
         }
      });
   }

   searchExpeditionCity(event: any) {
      this.politicalDivisionService.getAllCities(event.query).subscribe(
         lis => this.resultExpeditionCity = lis
      );
   }

   captureExpeditionCity(event: any) {
      this.employee.idCiudadExpDocumento = event.idDivisionPolitica;
      this.ciudadExpDocumento = event.camino;
      this.backupCiudadExpDocumento = event.camino;
   }

   searchBirthPlace(event: any) {
      this.politicalDivisionService.getAllCities(event.query).subscribe(
         lis => this.resultBirthPlace = lis
      );
   }

   captureBirthPlace(event: any) {
      this.employee.idCiudadNacimiento = event.idDivisionPolitica;
      this.ciudadNacimiento = event.camino;
      this.backupCiudadNacimiento = event.camino;
   }

   focusUP() {
      const element = document.querySelector('#formulario');
      if (element) {
         element.scrollIntoView(element);
      }
   }

   updateDate() {

      let tipo = this.employee.idTipoDocumento;
      let exp = this.expeditionDate;
      let dateExpo = new Date(exp);

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - 18;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth(month);


      if (tipo === 1) {
         this.maxDate.setFullYear(prev18Year);
      } else if (tipo === 2) {
         this.maxDate.setFullYear(year);
      } else {
         this.maxDate.setFullYear(year);
      }
      if (this.maxDate > dateExpo) {
         this.maxDate = dateExpo;
      }

      if ((this.employee.fechaNacimiento) !== null && (this.employee.fechaNacimiento) !== '') {
         let timestamp2 = new Date(this.maxDate).getTime();
         let timestamp1 = new Date(this.employee.fechaNacimiento).getTime();
         let timeDiff = Math.round(timestamp2 - timestamp1);
         if (timeDiff < 0) {
            this.employee.fechaNacimiento = '';
         }
      }
      this.validateDocument();

   }

   capitalize(event: any) {
      let input = event.target.value;
      event.target.value = input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
   }

   capitalizeSave(input: any) {
      return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
   }

   onExpeditionDate(event: any) {
      let d = new Date(Date.parse(event));
      this.expeditionDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.updateDate();
   }

   onBirthDate(event: any) {
      let d = new Date(Date.parse(event));
      this.birthDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   onDeathDate(event: any) {
      let d = new Date(Date.parse(event));
      this.deathDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   updateActivities(value: number) {
      this.activities = [];
      this.actividadEconomicaService.listLastChild(value).subscribe(res => {
         this.activities.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.activities.push({
               label: dp.actividadEconomica,
               value: dp.idActividadEconomica
            });
         }
      });
   }

   validateDocument() {
      if (this.employee.numeroDocumento != "" && this.employee.numeroDocumento != null) {
         this.employeesService.validateDocument(this.employee.numeroDocumento, this.employee.idTipoDocumento).subscribe(res => {
            if (res.idTercero > 0) {
               this.confirmationService.confirm({
                  message: ` ¿La cedula que ha ingresado ya existe, desea ver el colaborador existente?`,
                  header: 'Corfirmación',
                  icon: 'fa fa-question-circle',
                  accept: () => {
                     this.router.navigate(['/employees/update/' + res.idTercero]);
                  },
                  reject: () => {
                     this.employee.numeroDocumento = '';
                  }
               });
            }
         });
      }
   }

   inputCleanUp(value: string) {
      this.employee.numeroDocumento = value.toUpperCase().replace(' ', '').trim();
   }

}
