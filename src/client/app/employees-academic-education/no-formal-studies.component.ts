import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noformalstudies } from './no-formal-studies';
import { AcademicEducationService } from './academic-education.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'no-formal-studies.component.html',
    selector: 'academic-education-no-formal',
    providers:  [ConfirmationService]
})
export class NoFormalStudiesComponent implements OnInit {

    study: Noformalstudies = new Noformalstudies();
    dialogObjet: Noformalstudies = new Noformalstudies();
    nfstudies: Noformalstudies[];

    constructor(private academicEducationService: AcademicEducationService,
                private router: Router,
                private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.academicEducationService.getAllNoFormal().subscribe(
            nfstudies => this.nfstudies = nfstudies
        );
        let prue = this.nfstudies;
    }

    delete(f: Noformalstudies) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.academicEducationService.deleteNoFormal( this.dialogObjet);
                this.nfstudies.splice(this.nfstudies.indexOf( this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: Noformalstudies) {
        this.router.navigate(['employees-no-formal-studies/detail/'+f.idEstudio]);
    }

    add() {
        this.router.navigate(['employees-no-formal-studies/add']);
    }

    update(f: Noformalstudies) {
        this.router.navigate(['employees-no-formal-studies/update/'+f.idEstudio]);
    }

    savecheck(f: Noformalstudies){
      this.dialogObjet = f;
      this.confirmationService.confirm({
        message: ` ¿Esta seguro que desea confirmar?`,
        header: 'Corfirmación',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.academicEducationService.updateNoFormal( this.dialogObjet).subscribe();
          this.dialogObjet = null;
        },
        reject: () => {
          this.dialogObjet.confirmada = this.dialogObjet.confirmada==true ? false: true;
          this.dialogObjet = null;
        }
      });

    }
}
