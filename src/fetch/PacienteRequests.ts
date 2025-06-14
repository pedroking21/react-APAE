import { SERVER_CFG } from '../appConfig';
import PacienteDTO from '../interfaces/PacienteInterface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Aluno
 */
class PacienteRequests {

    private serverURL: string;          // Variável para o endereço do servidor
    private routeListaPacientes: string;   // Variável para a rota de listagem de alunos
    private routeCadastraPaciente: string; // Variável para a rota de cadastro de aluno
    private routeAtualizaPaciente: string; // Variável para a rota de atualiação de aluno
    private routeRemovePaciente: string;   // Variável para a rota de remoção do aluno

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;     // Endereço do servidor web
        this.routeListaPacientes = '/listar/pacientes';    // Rota configurada na API
        this.routeCadastraPaciente = '/cadastro/paciente';    // Rota configurada na API
        this.routeAtualizaPaciente = '/atualizar/paciente/:idPaciente'; // Rota configurada na API
        this.routeRemovePaciente = '/remover/paciente/:idPaciente';    // Rota configurada na API
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de alunos cadastrados
     * @returns Retorna um JSON com a lista de alunos ou null em caso de erro
     */
    async listarPacientes(): Promise<PacienteDTO | null> {
        // Obtém o token de autenticação do localStorage
        const token = localStorage.getItem('token'); // Recupera o token de autenticação do armazenamento local
        try {
            // Envia a requisição para a rota de listagem de empréstimos
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPacientes}`, {
                'headers' : {
                    'x-access-token': token ?? '', // envia o token de autenticação no cabeçalho da requisição  
                }
            });

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // converte a reposta para um JSON
                const listaDePacientes: PacienteDTO = await respostaAPI.json();
                // retorna a resposta
                return listaDePacientes;
            }
            
            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao fazer a consulta de pacientes: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }
}

// Exporta a classe já instanciando um objeto da mesma
export default new PacienteRequests();