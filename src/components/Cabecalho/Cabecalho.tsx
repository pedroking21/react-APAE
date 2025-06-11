// Importa o tipo JSX do React para tipar corretamente o componente
import { JSX } from 'react';

// Importa os estilos CSS específicos do componente Cabecalho
import estilo from './Cabecalho.module.css';

// Importa a imagem do logotipo da aplicação
import logotipo from '../../../src/assets/logo-medclinic.jpeg';

// Importa as rotas configuradas da aplicação
import { APP_ROUTES } from '../../appConfig';

// Componente funcional Cabecalho
function Cabecalho(): JSX.Element {
    return (
        // Elemento <header> com classe personalizada do CSS
        <header className={estilo.cabecalho}>
            
            {/* Link para a página inicial, com logotipo clicável */}
            <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                <img src={logotipo} alt="Logotipo da MedClinic" />
            </a>

            <a href={APP_ROUTES.ROUTE_SOBRE_NOS}>Sobre Nós</a>

            {/* Link para a listagem de pacientes */}
            <a href={APP_ROUTES.ROUTE_LISTAGEM_PACIENTES}>Pacientes</a>

            {/* Link para a listagem de médicos */}
            <a href={APP_ROUTES.ROUTE_LISTAGEM_MEDICOS}>Médicos</a>

            {/* Link para a listagem de consultas */}
            <a href={APP_ROUTES.ROUTE_LISTAGEM_CONSULTAS}>Consultas</a>

            {/* Link para a página de login */}
            <a href={APP_ROUTES.ROUTE_LOGIN}>Login</a>
        </header>
    );
}

// Exporta o componente para uso externo
export default Cabecalho;
