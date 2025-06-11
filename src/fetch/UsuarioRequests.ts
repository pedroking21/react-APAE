type Usuario = {
    id_usuario: string;
    nome: string;
    // Adicione outros campos conforme sua API
};

class UsuarioRequests {
    serverUrl: string;
    routeListarUsuarios: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeListarUsuarios = '/usuarios';
    }

    async listarUsuarios(): Promise<Usuario[] | null> {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarUsuarios}`, {
                headers: {
                    'x-access-token': token ?? ''
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível listar os usuários.');
            }

            return await response.json() as Usuario[];
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }
}


export default new UsuarioRequests();