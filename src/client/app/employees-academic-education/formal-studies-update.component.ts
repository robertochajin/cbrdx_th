import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {FormalStudies} from './formal-studies';
import {AcademicEducationService} from '../_services/academic-education.service';
import {Message, ConfirmationService, SelectItem, ConfirmDialog} from 'primeng/primeng';
import {StudyLevelServices} from '../_services/study-level.service';
import {StudyAreaServices} from '../_services/study-area.service';
import {CitiesServices} from '../_services/cities.service';
import {StudyStateServices} from '../_services/study-state.service';
import {InstituteServices} from '../_services/institute.service';

import * as moment from 'moment/moment';
import {PoliticalDivisionService} from '../_services/political-division.service';
import {StudyLevels} from "../_models/studyLevels";
import {StudyAreas} from "../_models/studyAreas";
import {StudyStates} from "../_models/studyStates";
import {Institutes} from "../_models/institutes";
import {DivisionPolitica} from "../_models/divisionPolitica";
import {NavService} from "../_services/_nav.service";

@Component({
  moduleId: module.id,
  selector: 'academic-education-formal-update',
  templateUrl: 'formal-studies-form.component.html',
  providers: [ConfirmationService]
})

export class FormalStudiesUpdateComponent implements OnInit {

  @Input()
  cityList: DivisionPolitica[] = [];
  selectedCity: DivisionPolitica = new DivisionPolitica();
  fstudy: FormalStudies = new FormalStudies();
  header: string = 'Editando Estudio Formal';
  submitted: boolean;
  msgs: Message[] = [];
  studyLevelList: any[] = [];
  studyAreaList: any[] = [];
  studyStateList: any[] = [];
  instituteList: Institutes[] = [];
  selectedInstitute: Institutes = new Institutes();
  minDate: Date = null;
  maxDate: Date = null;
  maxDateFinal: Date = null;
  es: any;
  range: string;
  id_estado_estudio_finalizado = 2; //hace falta definir acceso a constantes en servicio
  idTercero: number;
  wrongCity: boolean = true;

  constructor(private academicEducationService: AcademicEducationService,
              private politicalDivisionService: PoliticalDivisionService,
              private instituteServices: InstituteServices,
              private studyLevelServices: StudyLevelServices,
              private studyAreaServices: StudyAreaServices,
              private studyStateServices: StudyStateServices,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private confirmationService: ConfirmationService,
              private _nav: NavService) {
  }

  ngOnInit(): void {
    this.setInitRanges();
    this.studyLevelServices.getAllEnabled().subscribe(studyLevelList => {
      this.studyLevelList.push({label: 'Seleccione', value: null});
      studyLevelList.map((s: StudyLevels) => {
        this.studyLevelList.push({label: s.nombreListaNivelEstudio, value: s.idListaNivelEstudio});
      });
    });
    this.studyAreaServices.getAllEnabled().subscribe(studyAreaList => {
      this.studyAreaList .push({label: 'Seleccione', value: null});
      studyAreaList.map((s: StudyAreas) => {
        this.studyAreaList.push({label: s.nombreListaAreaEstudio, value: s.idListaAreaEstudio});
      });
    });
    this.studyStateServices.getAllEnabled().subscribe(studyStateList => {
      this.studyStateList.push({label: 'Seleccione', value: null});
      studyStateList.map((s: StudyStates) => {
        this.studyStateList.push({label: s.nombreListaEstadoEstudio, value: s.idListaEstadoEstudio});
      });
    });
    this.route.params.subscribe((params: Params) => {
      this.idTercero = params['tercero'];
      this.academicEducationService.getFormal(+params['id']).subscribe(fstudy => {
        this.fstudy = fstudy;
        this.selectedCity = new DivisionPolitica();
        this.selectedCity.camino = this.fstudy.ciudad;
        this.selectedCity.idDivisionPolitica = this.fstudy.idCiudad;
        this.selectedInstitute = new Institutes();
        this.selectedInstitute.nombreListaInstitucion = this.fstudy.institucion;
        this.selectedInstitute.idListaInstitucion = this.fstudy.idInstitucion;
        this.idTercero = this.fstudy.idTercero;
        let fi: moment.Moment = moment(this.fstudy.fechaIngresa, 'YYYY-MM-DD');
        this.fstudy.fechaIngresa = fi.format('MM/DD/YYYY');
        let ff: moment.Moment = moment(this.fstudy.fechaTermina, 'YYYY-MM-DD');
        this.fstudy.fechaTermina = ff.format('MM/DD/YYYY');
      });
    });

  }

  setInitRanges() {
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
    let last18Year = year - 18;
    let lastYear = year - 100;
    this.maxDate = new Date();
    this.maxDate.setFullYear(year, month);
    this.minDate = new Date();
    this.minDate.setFullYear(lastYear, month);
    this.maxDateFinal = new Date();
    this.maxDateFinal.setMonth(month);
    this.maxDateFinal.setFullYear(year);
    this.range = `${lastYear}:${year}`;
  }

  onSubmit(value: string) {
    this.submitted = true;
    if (this.selectedCity !== undefined && this.selectedCity.idDivisionPolitica !== undefined) {
      this.msgs = [];
      this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
      this.fstudy.idTercero = this.idTercero;
      this.fstudy.indicadorHabilitado = true;
      this.fstudy.idInstitucion = this.selectedInstitute.idListaInstitucion;
      let fi: moment.Moment = moment(this.fstudy.fechaIngresa, 'MM/DD/YYYY');
      this.fstudy.fechaIngresa = fi.format('YYYY-MM-DD');
      let ff: moment.Moment = moment(this.fstudy.fechaTermina, 'MM/DD/YYYY');
      this.fstudy.fechaTermina = ff.format('YYYY-MM-DD');
      this.academicEducationService.updateFormal(this.fstudy).subscribe(
        data => {
          this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});
          this._nav.setTab(3);
          this.location.back();
        });
    }
  }

  citySearch(event: any) {
    this.politicalDivisionService.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event: any) {
    this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
    this.wrongCity = false;
  }

  instituteSearch(event: any) {
    this.instituteServices.getByWildCard(event.query).subscribe(
      instituteList => this.instituteList = instituteList
    );
  }

  onSelectBegin(event: any) {
    let d = new Date(Date.parse(event));
    this.fstudy.fechaIngresa = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.minDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  }

  onSelectEnd(event: any) {
    let d = new Date(Date.parse(event));
    this.fstudy.fechaTermina = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.maxDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate()) - 1;
  }

  updateEnd(): void {
    if (this.fstudy.idEstado !== this.id_estado_estudio_finalizado) {
      this.fstudy.fechaTermina = undefined;
    }
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._nav.setTab(3);
        this.location.back();
      }
    });
  }

}
