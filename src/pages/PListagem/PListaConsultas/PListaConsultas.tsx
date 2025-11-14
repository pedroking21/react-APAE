// Importa o tipo JSX do React para tipagem do componente
import { JSX } from 'react';

// Importa o componente de cabeçalho
import Cabecalho from "../../../components/Cabecalho/Cabecalho";

// Importa o componente da tabela que lista os empréstimos
import TabelaConsulta from '../../../components/Tabelas/TabelaConsulta/TabelaConsulta';

// Importa o componente de rodapé
import Rodape from "../../../components/Rodape/Rodape";

// Componente funcional que representa a página de listagem de empréstimos
function PListaConsultas(): JSX.Element {
    return (
        <div className="pagina-grid" style={{height: '100%'}}>
            <Cabecalho />
            <TabelaConsulta />
            <Rodape />
        </div>
    );
}

// Exporta o componente para uso em outras partes do projeto
export default PListaConsultas;
