/**
 * Interface para representar uma consulta realizado por um paciente
 */
interface ConsultaDTO {
    data: Date,
    hora: string,
    diagnostico: string,
    receita: string,
    salaAtendimento: string,
    consultaStatus: string,
    idPaciente: number,
    idMedico: number,
    statusConsultaRegistro: boolean
}

export default ConsultaDTO;
