import { Injectable } from '@angular/core';

@Injectable()
export class PermissionsCargos {
   codigo: string;
   visible: boolean = true;
   editable: boolean = true;
   seccion: boolean = true;
   CODIGOCARGO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   CARGO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   INDICADORREQUIEREFORMACION?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   PERSONAACARGODIR?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   PERSONAACARGOIND?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDCARGOJEFE?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDCATEGORIA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   MISION?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   APROBAR?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   NOAPROBAR?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   PUNTOS?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   SALARIO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   INTERRELACIONESINTERNAS?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   INTERRELACIONESEXTERNAS?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   RESPONSABILIDADESAD?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   TOMADECISIONES?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   ACTIVIDADESSUPERVISA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   CONOCIMIENTOSBASICOS?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   TIEMPOEXPERIENCIA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   OTROSREQUISITOS?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDESTRUCTURAAREA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDNIVELEDUCACION?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDNIVELEDUCARGO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDGENERO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDESTADOCIVIL?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   EDAD?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   IDESTADO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   INDICADORZONA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   INDICADORHABILITADO?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};

   CARGAFISICA?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   CARGAMENTAL?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   NIVELPSICOSOCIAL?: {editable:boolean, visible: boolean, seccion: boolean} = {editable:true, visible: true, seccion: false};
   constructor() {
   }
}