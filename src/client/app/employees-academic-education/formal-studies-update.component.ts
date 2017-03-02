import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormalStudies } from './formal-studies';
import { AcademicEducationService } from './academic-education.service';

import { SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'academic-education-formal-update',
    template: 'formal-studies-form.component.html',
})

export class FormalStudiesUpdateComponent implements OnInit {


    fstudy: FormalStudies;
    header: string  = 'Editando Estudio';

    formalStudiesForm: FormGroup;
    submitted: boolean;
    msgs: Message[] = [];

    constructor(
        private academicEducationService: AcademicEducationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,

    ) {}

    ngOnInit(): void {
        // this.formalStudiesForm = this.fb.group({
        //   'titulo': new FormControl('', Validators.required),
        //   'ingreso': new FormControl('', Validators.required),
        //   'finalizacion': new FormControl('', Validators.required),
        //   'ciudad': new FormControl('', Validators.required),
        //   'institucion': new FormControl('', Validators.required),
        //   // 'confirmada': new FormControl('', Validators.required),
        //   'nivelEstudio': new FormControl('', Validators.required),
        //   'areaEstudio': new FormControl('', Validators.required),
        //   'otraInstitucion': new FormControl('', Validators.required),
        //   'estadoEstudio': new FormControl('', Validators.required),
        // });

        this.route.params
            .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']))
            .subscribe(fstudy => this.fstudy = fstudy);
    }

   onSubmit(value: string) {
     this.submitted = true;
     this.msgs = [];
     this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});
     if (this.formalStudiesForm.valid) {
       this.academicEducationService.updateFormal(this.formalStudiesForm.value)
         .subscribe(
           data => {
             this.location.back();
           });
     }
   }

    goBack(): void {
        this.location.back();
    }

}
