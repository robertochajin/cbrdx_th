import 'rxjs/add/operator/switchMap';
import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location}                 from '@angular/common';

import {Workexperience} from './work-experience';

/* Services */
import {WorkExperienceService} from './work-experience.service';
import {CompanySectorService} from "../_services/company-sector.service";
import {CompanySubSectorService} from "../_services/company-sub-sector.service";
import {CitiesServices} from "../_services/cities.service";

/* Library */
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment/moment';


@Component({
  moduleId: module.id,
  selector: 'work-experience-formal',
  templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceAddComponent {

  experience: Workexperience = new Workexperience();
  header: String = 'Agregando Experiencia Laboral';
  private companySectorList: any;
  private companySubSectorList: any;
  private cityList: any;

  maxDate: Date = null;
  es: any;
  range: string;

  @Input()

  experience: Workexperience = new Workexperience();
  header: String = 'Agregando Experiencia';
  cityList: any;

  constructor(private academicEducationService: WorkExperienceService,
              private companySectorService: CompanySectorService,
              private companySubSectorService: CompanySubSectorService,
              private citiesServices: CitiesServices,
              private router: Router,
              private location: Location) {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    };

    this.companySectorService.getAll().subscribe(companySectorList => this.companySectorList = companySectorList);
    this.companySubSectorService.getAll().subscribe(companySubSectorList => this.companySubSectorList = companySubSectorList);

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let lasYear = year - 80;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(year);
    this.range = `${lasYear}:${year}`;

  }

  save() {

    this.academicEducationService.add(this.experience)
      .subscribe(
        data => {
          this.location.back();
        },
        error => {
        });
  }

  goBack(): void {
    this.location.back();
  }

  citySearch(event: any) {
    this.citiesServices.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event: any) {
    this.experience.ciudad = event;
  }


  onSelectMethodCalendarIngreso(event) {
    let d = new Date(Date.parse(event));
    this.experience.ingreso = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  onSelectMethodCalendarFinalizacion(event) {
    let d = new Date(Date.parse(event));
    this.experience.finalizacion = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }



  strToDate(newDateString: string): Date {
    if (newDateString) {
      let mom: moment.Moment = moment(newDateString, 'MM/DD/YYYY');
      if (mom.isValid()) {
        return mom.toDate();
      }
    }
    return null;
  }

  dateToStr(newDate: Date, format?: string): string {
    if (newDate && moment(newDate).isValid()) {
      if (format) {
        return moment(newDate).format(format);
      }
      return moment(newDate).format('MM/DD/YYYY');
    }
    // date vide ou incorrecte
    return '';
  }

}


