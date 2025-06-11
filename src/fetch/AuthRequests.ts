/**
 * Tipos auxiliares
 */
type LoginPayload = {
    email: string;
    senha: string;
};

type Usuario = {
    nome: string;
    id_usuario: string;
};

type LoginResponse = {
    auth: boolean;
    token: string;
    usuario: Usuario;
};

/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    serverUrl: string;
    routeLogin: string;

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param login - email e senha
     * @returns **true** caso sucesso, lança erro caso erro
     */
    async login(login: LoginPayload): Promise<boolean> {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (!response.ok) {
                console.log('Erro na autenticação');
                throw new Error('Falha no login');
            }
            const data: LoginResponse = await response.json();
            console.log(data);

            if (data.auth) {
                this.persistToken(data.token, data.usuario.nome, data.usuario.id_usuario, data.auth);
            }

            return true;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Persiste o token no localStorage
     */
    persistToken(token: string, username: string, idUsuario: string, isAuth: boolean): void {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('idUsuario', idUsuario);
        localStorage.setItem('isAuth', String(isAuth));
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('isAuth');
        window.location.href = '/login';
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expiry: number = payload.exp;
                const now: number = Math.floor(Date.now() / 1000);

                if (expiry < now) {
                    this.removeToken();
                    return false;
                }
                return true;
            } catch {
                this.removeToken();
                return false;
            }
        }
        return false;
    }
}

export default new AuthRequests();