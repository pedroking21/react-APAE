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

            /**
     * Envia os dados do formulário aluno para a API
     * @param formPaciente Objeto com os valores do formulário
     * @returns **true** se cadastro com sucesso, **false** se falha
     */
    async enviaFormularioPaciente(formPaciente: string): Promise<boolean> {
        const token = localStorage.getItem('token'); // Recupera o token de autenticação do armazenamento local
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraPaciente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: formPaciente
            });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário. ${error}`);
            return false;
        }
    }
        async removerPaciente(idPaciente: number): Promise<boolean> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemovePaciente}?idPaciente=${idPaciente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição à API.');
            }
            return true;
        } catch (error) {
            console.error(`Erro ao fazer solicitação. ${error}`);
            return false;
        }
    }
}

// Exporta a classe já instanciando um objeto da mesma
export default new PacienteRequests();