interface LoginData {
    email: string;
    senha: string;
  }
  
  interface ServerResponse {
    auth: boolean;
    token: string;
    usuario: {
      nome: string;
      id_usuario: number;
    };
  }
  
  class AuthRequests {
    private serverUrl: string;
    private routeLogin: string;
  
    constructor() {
      this.serverUrl = 'http://localhost:3333';
      this.routeLogin = '/login';
    }
  
    /**
     * Realiza a autenticação no servidor
     * @param login - dados de login com email e senha
     * @returns true em caso de sucesso, ou lança erro
     */
    async login(login: LoginData): Promise<boolean> {
      try {
        const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login),
        });
  
        if (!response.ok) {
          console.log('Erro na autenticação');
          throw new Error('Falha no login');
        }
  
        const data: ServerResponse = await response.json();
        console.log(data);
  
        if (data.auth) {
          this.persistToken(data.token, data.usuario.nome, data.usuario.id_usuario, data.auth);
        }
  
        return true;
      } catch (error) {
        console.error('Erro:', error);
        throw error;
      }
    }
  
    /**
     * Persiste o token no localStorage
     */
    persistToken(token: string, username: string, idUsuario: number, isAuth: boolean): void {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('idUsuario', idUsuario.toString());
      localStorage.setItem('isAuth', isAuth.toString());
    }
  
    /**
     * Remove os dados do localStorage e redireciona para /login
     */
    removeToken(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('isAuth');
      window.location.href = '/login';
    }
  
    /**
     * Verifica validade do token (expiração)
     */
    checkTokenExpiry(): boolean {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiry = payload.exp as number;
          const now = Math.floor(Date.now() / 1000);
  
          if (expiry < now) {
            this.removeToken();
            return false;
          }
  
          return true;
        } catch (e) {
          console.error('Erro ao decodificar o token:', e);
          this.removeToken();
          return false;
        }
      }
  
      return false;
    }
  }
  
  export default new AuthRequests();