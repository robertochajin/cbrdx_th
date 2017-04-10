import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location}                 from '@angular/common';
import {FormalStudies} from './formal-studies';
import {AcademicEducationService} from '../_services/academic-education.service';
import {Message, ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'academic-education',
  templateUrl: 'formal-studies-detail.component.html',
  providers: [ConfirmationService]
})


export class FormalStudiesDetailComponent implements OnInit {
  @Input()

  study: FormalStudies = new FormalStudies();

  constructor(private academicEducationService: AcademicEducationService,
              private confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']))
      .subscribe(study => this.study = study);
  }

  goBack(): void {
    this.location.back();
  }
}

