/**
 * Interface para representar os dados do medico recebidos da API
 */
interface MedicoDTO {
    nome: string,
    especialidade: string,
    crm: string,
    telefone: number,
    email: string
}

export default MedicoDTO;
