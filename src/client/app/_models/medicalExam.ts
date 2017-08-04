export class MedicalExam {

   idExamenMedico: number;
   idTercero: number;
   idProcesoSeleccion: number;
   idEstadoExamenMedico: number;
   codigoVerificacion: string;
   indicadorVerificado: boolean;
   indicadorOtraInstitucion: boolean;
   idMaestroRespuesta: number;
   idMedicoResponsable: number;
   idPreguntaOpcion: number;
   idInstitucionMedica: number;
   institucionMedica: string;
   fechaProgramada: string;
   idCuestionarioOpciones: number;
   idAdjunto: number;
   auditoriaFecha: Date;
   auditoriaUsuario: number;

   constructor() {
      this.auditoriaFecha = null;
      this.auditoriaUsuario = null;
   }
}