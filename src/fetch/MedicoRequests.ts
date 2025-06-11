// Importa as configurações do servidor a partir de um arquivo externo
import { SERVER_CFG } from "../appConfig";
import MedicoDTO from "../interfaces/MedicoInterface";

/**
 * Classe responsável por fazer as requisições relacionadas aos livros
 * Esta classe irá se comunicar com a API para listar, cadastrar, atualizar e remover livros
 */
class MedicoRequests {

    private serverURL: string;          // URL base do servidor da API
    private routeListaMedicos: string;   // Rota (endpoint) para buscar a lista de livros
    private routeCadastraMedico: string; // Rota para cadastrar um novo livro
    private routeAtualizaMedico: string; // Rota para atualizar os dados de um livro
    private routeRemoveMedico: string;   // Rota para remover um livro

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;         // Endereço do servidor web
        this.routeListaMedicos = '/listar/medico';        // Define a rota para listar os livros
        this.routeCadastraMedico = '/cadastro/medico';        // Define a rota para cadastrar livros
        this.routeAtualizaMedico = '/atualizar/medico/:idMedico';    // Define a rota para atualizar livros
        this.routeRemoveMedico = '/remover/medico/:idMedico';        // Define a rota para remover livros
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de livros cadastrados
     * @returns Retorna um JSON com a lista de livros ou null em caso de erro
     */
    async listarMedicos(): Promise<MedicoDTO | null> {
        try {
            // Faz a requisição GET para a rota da lista de livros
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaMedicos}`);
        
            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if(respostaAPI.ok) {
                // Converte a resposta para formato JSON
                const listaDeMedicos: MedicoDTO = await respostaAPI.json();

                // Retorna a lista de livros
                return listaDeMedicos;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // Caso ocorra algum erro (ex: servidor fora do ar), exibe no console
            console.error(`Erro ao fazer a consulta de medicos: ${error}`);

            // Retorna null para indicar que a operação falhou
            return null;
        }
    }
}

// Exporta a classe já com um objeto instanciado para ser usado diretamente
export default new MedicoRequests();
