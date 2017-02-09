/**
 * Created by TracesMaker on 06/02/2017.
 */
import {Component} from '@angular/core';
import {Colaborador} from './colaboradores';
import {ColaboradoresService} from './colaboradoresservice';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

class PrimeColaborador implements Colaborador {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?) {
    }
}

@Component({
    moduleId: module.id,
    templateUrl: 'colaboradores.component.html',
    selector: 'colaboradores'
})
export class ColaboradoresComponent {

    displayDialog: boolean;

    colaborador: Colaborador = new PrimeColaborador();

    selectedColaborador: Colaborador;

    newColaborador: boolean;

    colaboradores: Colaborador[];

    constructor(private colaboradoresService: ColaboradoresService, private router: Router) {
    }

    ngOnInit() {
        this.colaboradoresService.getAllColaboradores().subscribe(
            colaboradores => this.colaboradores = colaboradores
        );
    }

    deleteColaborador(colaborador: Colaborador) {
        this.colaboradoresService.deleteColaborador(colaborador);
        this.colaboradores.splice(colaborador.idColaborador, 1);
        colaborador = null;
    }

    selectCar(colaborador: Colaborador) {
        console.log(colaborador);
    }

    onRowSelect(event) {
        this.router.navigate(['colaboradores/detail', event.data.idColaborador]);
    }

    addColaborador() {
        this.router.navigate(['colaboradores/add']);
    }

    cloneColaborador(c: Colaborador): Colaborador {
        let colaborador = new PrimeColaborador();
        for (let prop in c) {
            colaborador[prop] = c[colaborador];
        }
        return colaborador;
    }

    findSelectedColaboradorIndex(): number {
        return this.colaboradores.indexOf(this.selectedColaborador);
    }
}
