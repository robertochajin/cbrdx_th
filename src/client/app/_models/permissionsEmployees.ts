import { Injectable } from '@angular/core';

@Injectable()
export class PermissionsEmployees {
   codigo: string;
   visible: boolean = true;
   editable: boolean = true;
   seccion: boolean = true;
   NUEVO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   EDITAR?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   ELIMINAR?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   PRIMERNOMBRE?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   SEGUNDONOMBRE?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   PRIMERAPELLIDO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   SEGUNDOAPELLIDO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTIPODOCUMENTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   NUMERODOCUMENTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   FECHADOCUMENTO: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDCIUDADEXPDOCUMENTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   FECHANACIMIENTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDCIUDADNACIMIENTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDGENERO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDESTADOCIVIL?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDFACTORRH?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   NROHIJOS?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDLATERALIDAD?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   VIVIENDA?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   CORREOELECTRONICO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   SITIOWEB?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTIPOPERSONA?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   RAZONSOCIAL?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDPROFESION?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDNIVELEDUCACION?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDVEHICULO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   TELEFONOFIJO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   TELEFONOCELULAR?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   FECHADEFUNCION?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   INDICADORVIVO ?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   INDICADORHABILITADO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDCOBERTURASALUD?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDESTADOJURIDICO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTIPOAFILIACION?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTIPOOCUPACION ?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDOCUPACION?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDSECTORECONOMICO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDACTIVIDADECONOMICA?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTIPOTERCERO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDADJUNTO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTALLACAMISA?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTALLAPANTALON?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IDTALLACALZADO?: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   PESO: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   TALLA: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };
   IMC: { editable: boolean, visible: boolean, seccion: boolean } = { editable: true, visible: true, seccion: false };

   constructor() {
   }
}