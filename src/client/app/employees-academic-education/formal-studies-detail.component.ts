import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { FormalStudies } from './formal-studies';
import { AcademicEducationService } from './academic-education.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'academic-education',
    templateUrl: 'formal-studies-detail.component.html',
    providers: [ConfirmationService]
})


export class FormalStudiesDetailComponent implements OnInit   {
    @Input()

    study: FormalStudies = new FormalStudies();
    confirmadalabel:string;
    constructor(
        private academicEducationService: AcademicEducationService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']));
        este$.subscribe(study => {
          this.study = study;
          this.confirmadalabel = this.study.confirmada == true ? 'Si': 'No';
        });
        //console.log(this.study);
    }

    goBack(): void {
      this.location.back();
    }
}

