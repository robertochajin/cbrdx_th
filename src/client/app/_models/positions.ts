import { Injectable } from '@angular/core';

@Injectable()
export class Positions {
    public idCargo: number;
    public codigoCargo: string;
    public cargo: string;
    public indicadorHabilitado: boolean;
    public indicadorRequiereFormacion: boolean;
    public personaACargoDir: number;
    public personaACargoInd: number;
    public idCargoJefe: number;
    public idCategoria: number;
    public cargoJefe: string;
    public mision: string;
    public puntos: string;
    public categoria: string;
    public salario: number;
    public interrelacionesInternas: string;
    public interrelacionesExternas: string;
    public responsabilidadesElementos: string;
    public responsabilidadesImprementos: string;
    public responsabilidadesOtros: string;
    public tomaDecisiones: string;
    public actividadesSupervisa: string;
    public nivelEducacion: string;
    public conocimientosBasicos: string;
    public tiempoExperiencia: string;
    public otrosRequisitos: string;
    public cargaFisica: string;
    public cargaMental: string;
    public nivelPsicoSocial: string;
    public estructuraArea: string;
    public idEstructuraArea: number;
    public idNivelEducacion: number;
    public idGenero: number; //? falta este campo
    public idEstadoCivil: number; //? falta este campo
    public edad: number;
    public auditoriaUsuario: number;
    public auditoriaFecha: Date;
    
    constructor() {
        this.codigoCargo = '';
        this.cargo = '';
        this.indicadorHabilitado = true;
    }
}
