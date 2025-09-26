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
        this.routeListaMedicos = '/listar/medicos';        // Define a rota para listar os livros
        this.routeCadastraMedico = '/cadastro/medico';        // Define a rota para cadastrar livros
        this.routeAtualizaMedico = '/atualizar/medico/:idMedico';    // Define a rota para atualizar livros
        this.routeRemoveMedico = '/remover/medico/:idMedico';        // Define a rota para remover livros
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de livros cadastrados
     * @returns Retorna um JSON com a lista de livros ou null em caso de erro
     */
    async listarMedicos(): Promise<MedicoDTO | null> {
        // Obtém o token de autenticação do localStorage
        const token = localStorage.getItem('token'); // Recupera o token de autenticação do armazenamento local
        try {
            // Envia a requisição para a rota de listagem de empréstimos
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaMedicos}`, {
                'headers': {
                    'x-access-token': token ?? '', // envia o token de autenticação no cabeçalho da requisição  
                }
            });

            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if (respostaAPI.ok) {
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

    /**
 * Envia os dados do formulário aluno para a API
 * @param formMedico Objeto com os valores do formulário
 * @returns **true** se cadastro com sucesso, **false** se falha
 */
    // ...existing code...
    async enviaFormularioMedico(formMedico: string): Promise<boolean> {
        const token = localStorage.getItem('token'); // Recupera o token de autenticação do armazenamento local
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraMedico}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: formMedico
            });

            if (!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário. ${error}`);
            return false;
        }
    }
    async removerMedico(idMedico: number): Promise<boolean> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveMedico}?idMedico=${idMedico}`, {
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
// ...existing code...

// Exporta a classe já com um objeto instanciado para ser usado diretamente
export default new MedicoRequests();
