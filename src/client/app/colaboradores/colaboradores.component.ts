/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Component } from '@angular/core';
import { Colaborador } from './colaboradores';
import { ColaboradoresService } from './colaboradoresservice';

class PrimeColaborador implements Colaborador {
    constructor(public idColaborador?, public numeroDocumento?, public primerNombre?, public fechaDesde?, public cargoActual?) {}
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

    constructor(private colaboradoresService: ColaboradoresService) { }

    ngOnInit() {
        this.colaboradoresService.getColaboradoresMedium().then(colaboradores => this.colaboradores = colaboradores);
    }

    onRowSelect(event) {
        this.newColaborador = false;
        this.colaborador = this.cloneColaborador(event.data);
        this.displayDialog = true;
    }

    cloneColaborador(c: Colaborador): Colaborador{
        let colaborador = new PrimeColaborador();
        for(let prop in c) {
            colaborador[prop] = c[colaborador];
        }
        return colaborador;
    }

    findSelectedColaboradorIndex(): number {
        return this.colaboradores.indexOf(this.selectedColaborador);
    }
}
