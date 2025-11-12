import estilo from './Cabecalho.module.css';
import logotipo from '../../../src/assets/logo-medclinic.jpeg';
import { APP_ROUTES } from '../../appConfig';
import AuthRequests from '../../fetch/AuthRequests';
import { JSX, useEffect, useState } from 'react';

function Cabecalho(): JSX.Element {
    // Estado para controlar se o usuário está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Checa o token ao montar o componente para saber se está autenticado
    useEffect(() => {
        const tokenValido = AuthRequests.checkTokenExpiry();
        setIsAuthenticated(tokenValido);
    }, []);

    // Função para logout, remove token e atualiza estado
    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
    };

    return (
        <header className={estilo.cabecalho}>
            {/* Logo clicável que leva para home */}
            <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                <img src={logotipo} alt="Logotipo da MedClinic" />
            </a>

            <a href={APP_ROUTES.ROUTE_SOBRE_NOS}>Sobre Nós</a>

            {/* Renderização condicional do botão */}
            {isAuthenticated ? (
                <>
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_PACIENTES}>Pacientes</a>
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_MEDICOS}>Médicos</a>
                    <a href={APP_ROUTES.ROUTE_LISTAGEM_CONSULTAS}>Consultas</a>
                    <button onClick={logout} className={estilo['btn-sair']}>
                        SAIR
                    </button>
                </>
            ) : (
                <button
                    onClick={() => (window.location.href = '/login')}
                    className={estilo['btn-login']}
                >
                    LOGIN
                </button>

            )}
        </header>
    );
}

export default Cabecalho;
