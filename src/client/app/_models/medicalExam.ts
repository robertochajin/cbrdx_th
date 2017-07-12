export class MedicalExam {

   idExamenMedico: number;
   idProcesoSeleccion: number;
   idEstadoExamenMedico: number;
   codigoVerificacion: string;
   indicadorVerificado: boolean;
   indicadorOtraInstitucion: boolean;
   idMaestroRespuesta: number;
   idMedicoResponsable: number;
   idInstitucionMedica: number;
   fechaProgramada: Date;
   idCuestionarioOpciones: number;
   idAdjunto: number;
   auditoriaFecha: Date;
   auditoriaUsuario: number;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}