import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

import {CitiesServices} from "../_services/cities.service";


@Component({
  moduleId: module.id,
  selector: 'work-experience-formal',
  templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceAddComponent {
  @Input()

  experience: Workexperience = new Workexperience();
  header: String = 'Agregando Experiencia';
  cityList: any;

  constructor(private academicEducationService: WorkExperienceService,
              private citiesServices: CitiesServices,
              private router: Router,
              private location: Location) {
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
}


