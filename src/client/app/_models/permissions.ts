import { Injectable } from '@angular/core';

@Injectable()
export class Permissions {
   codigo: string;
   visible: boolean;
   CODIGOCARGO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   CARGO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   INDICADORREQUIEREFORMACION?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   PERSONAACARGODIR?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   PERSONAACARGOIND?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDCARGOJEFE?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDCATEGORIA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   MISION?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   APROBAR?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   NOAPROBAR?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   PUNTOS?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   SALARIO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   INTERRELACIONESINTERNAS?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   INTERRELACIONESEXTERNAS?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   RESPONSABILIDADESAD?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   TOMADECISIONES?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   ACTIVIDADESSUPERVISA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   CONOCIMIENTOSBASICOS?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   TIEMPOEXPERIENCIA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   OTROSREQUISITOS?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDESTRUCTURAAREA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDNIVELEDUCACION?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDNIVELEDUCARGO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDGENERO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDESTADOCIVIL?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   EDAD?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   IDESTADO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   INDICADORZONA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   INDICADORHABILITADO?: {editable:boolean, visible: boolean} = {editable:true, visible: true};

   CARGAFISICA?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   CARGAMENTAL?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   NIVELPSICOSOCIAL?: {editable:boolean, visible: boolean} = {editable:true, visible: true};
   constructor() {
   }
}