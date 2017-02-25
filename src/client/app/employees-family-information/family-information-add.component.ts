/**
 * Created by Angel on 10/02/2017.
 */
import 'rxjs/add/operator/switchMap';
import {Component, Input,OnInit } from '@angular/core';
import {FamilyInformationService} from './family-information.service';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import {Router}  from '@angular/router';
import {Location}  from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
    providers:  [ConfirmationService]
})

export class FamilyInformationAddComponent implements OnInit {
    @Input()

    familyInformation: constructorFamilyInformation = new constructorFamilyInformation();
    header:String = 'Agregando Familiar';
    documentTypes: SelectItem[] = [];
    relationship: SelectItem[] = [];
    selectedDocument: any;
    selectedRelationship: any;

    msgs: Message[] = [];

    familyform: FormGroup;

    submitted: boolean;

    constructor(
        private familyInformationService: FamilyInformationService,
        private router: Router,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private location: Location
    ) {}

    ngOnInit() {

        this.familyform = this.fb.group({
            'tipoDeDocumento': new FormControl('', Validators.required),
            'numeroDeDocumento': new FormControl('', Validators.required),
            'primerNombre': new FormControl('', Validators.required),
            'segundoNombre': new FormControl(''),
            'primerApellido': new FormControl('', Validators.required),
            'segundoApellido': new FormControl(''),
            'fechadeNacimiento': new FormControl('', Validators.compose([Validators.required])),
            'correoElectronico': new FormControl('', Validators.compose([Validators.required])),
            'parentesco': new FormControl('', Validators.required),
            'telefono1': new FormControl('', Validators.required),
            'telefono2': new FormControl(''),
            'direccionDeResidencia': new FormControl('', Validators.required),
            'convive': new FormControl('')
        });
        this.familyInformationService.getDocumentType().subscribe(
            documentTypes => this.documentTypes = documentTypes
        );
        this.familyInformationService.getRelationship().subscribe(
            relationship => this.relationship = relationship
        );
        this.familyInformation.segundoApellido = this.familyInformation.segundoNombre = '';

    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
        this.familyInformationService.add(this.familyform.value)
            .subscribe(
                data => {
                    this.location.back();
                    //this.router.navigate(['/employees-family-information']);
                },
                error => {
                });
    }


    goBack(): void {
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea Cancelar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.router.navigate(['/employees-family-information']);
                //this.location.back();
            },
            reject: () => {
            }
        });
    }

    onSelectMethod(event) {
        let d = new Date(Date.parse(event));
        this.familyInformation.fechadeNacimiento = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    }
    onChangeMethod(event) {
      //alert('sd');
    }

}
