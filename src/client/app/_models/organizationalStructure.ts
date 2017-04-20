export class OrganizationalStructure {
   
   idTipoEstructura : number;
   codigo : string;
   nombre : string;
   numeroDocumento : string;
   idCentroCostos : number;
   idEstructuraFisica : number;
   
   idEstructuraOrganizacional : number;
   idLocalizacion : number;
   idLogo : number;
   idPadre : number;
   idTipoArea : number;
   idTipoDocumento : number;
   indicadorHabilitado : boolean;
   indicadorPlantaConfirmada : boolean;
   paginaWeb : string;
   razonSocial : string;
   localizacion : string;
   telefono : string;
   celular : string;
   correoElectronico : string;
   auditoriaFecha : Date;
   auditoriaUsuario : number;
   
   tipoEstructura : string;
   centroCostos : string;
   tipoArea : string;
   estructuraFisica : string;
   tipoDocumento : string;
   
   
   
   constructor(){
      this.idTipoEstructura = null;
      this.codigo = "";
      this.nombre = "";
      this.numeroDocumento = "";
      this.idCentroCostos = null;
      this.idEstructuraFisica = null;
      this.idEstructuraOrganizacional = null;
      this.idLocalizacion = null;
      this.localizacion = "";
      this.idLogo = null;
      this.idPadre = null;
      this.idTipoArea = null;
      this.idTipoDocumento = null;
      this.indicadorHabilitado = true;
      this.paginaWeb = "";
      this.razonSocial = "";
      this.telefono = "";
      this.celular = "";
      this.correoElectronico = "";
      
   }
}
