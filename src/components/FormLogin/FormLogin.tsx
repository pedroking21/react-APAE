import { useState } from 'react';
import AuthRequests from '../../fetch/AuthRequests';
import estilo from './FormLogin.module.css';

function FormLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    /**
    * Função que faz a requisição de login
    */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const login = { email: email, senha: senha };

        try {
            const sucesso = await AuthRequests.login(login);

            if (sucesso) {
                window.location.href = '/';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            alert('Erro ao fazer login, tente novamente mais tarde.');
        }
    };

    return (
        <div className={estilo.login_form_container}>
            <form className={estilo.login_form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={estilo.form_group}>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={estilo.form_group}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={estilo.login_button}>Login</button>
            </form>
        </div>
    );
}

export default FormLogin;
