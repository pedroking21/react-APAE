/**
 * Interface para representar os dados do paciente recebidos da API
 */
interface PacienteDTO {
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    dataNascimento: Date,
    endereco: string,
}

export default PacienteDTO;