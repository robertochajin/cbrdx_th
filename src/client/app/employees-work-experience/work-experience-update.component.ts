import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import {CompanySectorService} from "../_services/company-sector.service";
import {CompanySubSectorService} from "../_services/company-sub-sector.service";
import {CitiesServices} from "../_services/cities.service";


@Component({
  moduleId: module.id,
  selector: 'work-experience',
  templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceUpdateComponent implements OnInit {


  experience: Workexperience = new Workexperience();
  header: String = 'Editando Experiencia';
  private companySectorList: any;
  private companySubSectorList: any;
  private cityList : any;


  constructor(private workExperienceService: WorkExperienceService,
              private companySectorService: CompanySectorService,
              private companySubSectorService: CompanySubSectorService,
              private citiesServices : CitiesServices,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.workExperienceService.get(+params['id']))
      .subscribe(experience => this.experience = experience);
    this.companySectorService.getAll().subscribe(companySectorList => this.companySectorList = companySectorList);
    this.companySubSectorService.getAll().subscribe(companySubSectorList => this.companySubSectorList = companySubSectorList);


  }

  save() {

    this.workExperienceService.update(this.experience)
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

  citySearch(event:any){
    this.citiesServices.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event: any){
    this.experience.ciudad = event;
  }

}
