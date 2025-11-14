// Importa o tipo JSX do React para tipagem do componente
import { JSX } from 'react';

// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../../components/Cabecalho/Cabecalho";

// Importa o componente que renderiza a tabela de livros
import TabelaMedico from '../../../components/Tabelas/TabelaMedico/TabelaMedico';

// Importa o componente de rodapé da aplicação
import Rodape from "../../../components/Rodape/Rodape";

// Componente funcional que representa a página de listagem de livros
function PListagemMedicos(): JSX.Element {
    return (
        <div className="pagina-grid" style={{height: '100%'}}>
            <Cabecalho />
            <TabelaMedico />
            <Rodape />
        </div>
    );
}

// Exporta o componente para uso em outras partes do projeto
export default PListagemMedicos; 
