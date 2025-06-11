// Importa as configurações do servidor (como a URL base da API)
import { SERVER_CFG } from "../appConfig";
import ConsultaDTO from "../interfaces/ConsultaInterface";

/**
 * Classe responsável por fazer as requisições da entidade Empréstimo.
 * Com essa classe, conseguimos listar, cadastrar, atualizar e remover empréstimos no sistema.
 */
class ConsultaRequests {

    private serverURL: string;                  // Variável para o endereço do servidor
    private routeListaConsultas: string;      // Variável para a rota de listagem de empréstimos
    private routeCadastraConsulta: string;    // Variável para a rota de cadastro de empréstimo
    private routeAtualizaConsulta: string;    // Variável para a rota de atualiação de aluno
    private routeRemoveConsulta: string;      // Variável para a rota de remoção do aluno

    /**
     * O construtor é executado automaticamente quando a classe é instanciada.
     * Ele define as rotas e configurações iniciais, com base na configuração do servidor.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;               // Endereço do servidor web
        this.routeListaConsultas = '/listar/consulta';    // Rota para buscar todos os empréstimos
        this.routeCadastraConsulta = '/cadastro/consulta';    // Rota para cadastrar um novo empréstimo
        this.routeAtualizaConsulta = '/atualizar/consulta/:idConsulta';// Rota para atualizar um empréstimo existente
        this.routeRemoveConsulta = '/remover/consulta/:idConsulta';    // Rota para remover um empréstimo
    }

    /**
     * Método assíncrono que faz uma requisição GET para a API buscando todos os empréstimos cadastrados.
     * @returns Um objeto JSON contendo a lista de empréstimos, ou null em caso de erro
     */
    async listarConsultas(): Promise<ConsultaDTO | null> {
        try {
            // Envia a requisição para a rota de listagem de empréstimos
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaConsultas}`);

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // Converte a resposta em JSON
                const listaDeConsultas: ConsultaDTO = await respostaAPI.json();

                // Retorna a lista obtida
                return listaDeConsultas;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // Exibe o erro no console, útil para depuração
            console.error(`Erro ao fazer a consulta de livros: ${error}`);

            // Retorna null em caso de falha
            return null;
        }
    }
}

// Exporta a classe já instanciada, pronta para ser utilizada em outras partes do sistema
export default new ConsultaRequests();
