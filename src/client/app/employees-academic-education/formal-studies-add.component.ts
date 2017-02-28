import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { AcademicEducationService } from './academic-education.service';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Formalstudies } from './formal-studies';
import { SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

class ConstructorFormal implements Formalstudies {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?,
        public  nivelEstudio?,
        public  areaEstudio?,
        public  otraInstitucion?,
        public  estadoEstudio?
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'academic-education-formal',
    templateUrl: 'formal-studies-form.component.html',
    providers:  [ConfirmationService]
})

export class FormalStudiesAddComponent implements OnInit {
    @Input()

    fstudy: Formalstudies = new ConstructorFormal();
    header: string = 'Agregando Estudio Formal';

    formalStudiesForm: FormGroup;
    submitted: boolean;
    msgs: Message[] = [];

    constructor (
        private academicEducationService: AcademicEducationService,
        private router: Router,
        private location: Location,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit () {
      this.formalStudiesForm = this.fb.group({
        'titulo': new FormControl('', Validators.required),
        'ingreso': new FormControl('', Validators.required),
        'finalizacion': new FormControl('', Validators.required),
        'ciudad': new FormControl('', Validators.required),
        'institucion': new FormControl('', Validators.required),
       // 'confirmada': new FormControl('', Validators.required),
        'nivelEstudio': new FormControl('', Validators.required),
        'areaEstudio': new FormControl('', Validators.required),
        'otraInstitucion': new FormControl('', Validators.required),
        'estadoEstudio': new FormControl('', Validators.required),
      });
    }


    onSubmit(value: string) {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
      if (this.formalStudiesForm.valid) {
        this.academicEducationService.addFormal(this.formalStudiesForm.value)
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


