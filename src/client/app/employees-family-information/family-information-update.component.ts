import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, } from '@angular/core';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng'
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import {CustomValidators} from './custom-validators';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
    providers:  [ConfirmationService]
})

export class FamilyInformationUpdateComponent implements OnInit{
    @Input()
    familyInformation:  FamilyInformation = new constructorFamilyInformation;
    header: string = 'Editando Familiar';
    documentTypes: SelectItem[] = [];
    relationship: SelectItem[] = [];
    selectedDocument: any;
    selectedRelationship: any;
    msgs: Message[] = [];

    familyform: FormGroup;

    submitted: boolean;

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder

    ) {}
    ngOnInit(): void {

        this.familyform = this.fb.group({
            'tipoDeDocumento': new FormControl('', Validators.required),
            'numeroDeDocumento': new FormControl('', Validators.required),
            'primerNombre': new FormControl('', Validators.required),
            'segundoNombre': new FormControl(''),
            'primerApellido': new FormControl('', Validators.required),
            'segundoApellido': new FormControl(''),
            'fechadeNacimiento': new FormControl('', Validators.compose([Validators.required])),
            'correoElectronico': new FormControl('', Validators.compose([Validators.required,CustomValidators.emailValidator])),
        });
        this.familyInformationService.getDocumentType().subscribe(
            documentTypes => this.documentTypes = documentTypes
        );
        this.familyInformationService.getRelationship().subscribe(
            relationship => this.relationship = relationship
        );
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(
                familyInformation => {
                    this.familyInformation = familyInformation;
                    this.selectedDocument = this.familyInformation.tipoDeDocumento.value;
                    this.selectedRelationship = this.familyInformation.parentesco.value;

                });

    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
        this.save();
    }

    save() {

        this.familyInformationService.update(this.familyInformation)
            .subscribe(
                data => {
                    this.location.back();
                },
                error => {
                });
    }
    goBack(): void {
        //this.location.back();
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea Cancelar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.location.back();
            },
            reject: () => {
            }
        });
    }

    onSelectMethod(event) {
        let d = new Date(Date.parse(event));
        this.familyInformation.fechadeNacimiento = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    }

}
