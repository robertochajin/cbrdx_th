import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ColaboradoresService} from './colaboradoresservice';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
@Component({
    moduleId: module.id,
    selector: 'colaborador-detail',
    templateUrl: 'colaborador-update.component.html',
})

export class ColaboradorUpdateComponent implements OnInit{
    colaborador: Colaborador;
    constructor(
        private colaboradorService: ColaboradoresService,
        private route: ActivatedRoute,
        private router: Router

) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.colaboradorService.getColaborador(+params['id']))
            .subscribe(colaborador => this.colaborador = colaborador);
    }

    updateColaborador() {

        this.colaboradorService.updateColaborador(this.colaborador)
            .subscribe(
                data => {
                    this.router.navigate(['/colaboradores']);
                },
                error => {
                });
    }
    goBack(): void {
        this.router.navigate(['/colaboradores']);
    }

}
export class Colaborador {
    id: number;
    vin: string;
    year: string;
    brand: string;
    color: string;
}

