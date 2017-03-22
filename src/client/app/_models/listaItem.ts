/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 23/02/2017.
 */
export class ListaItem {
    idListaItem: number;
    idLista: number;
    codigoItem: string;
    item: string;
    descripcion: string;
    indicadorPredeterminado: boolean;
    indicadorHabilitado: boolean = true;
    auditoriaUsuario: number;
    auditoriaFecha: Date;
}