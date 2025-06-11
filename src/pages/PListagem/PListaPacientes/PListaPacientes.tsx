// Importa o tipo JSX do React para tipagem do componente
import { JSX } from 'react';

// Importa o componente de cabeçalho
import Cabecalho from '../../../components/Cabecalho/Cabecalho';

// Importa o componente da tabela que lista os alunos
import TabelaPaciente from '../../../components/Tabelas/TabelaPaciente/TabelaPaciente';

// Importa o componente de rodapé
import Rodape from '../../../components/Rodape/Rodape';

// Componente funcional que representa a página de listagem de alunos
function PListaPacientes(): JSX.Element {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza a tabela com a lista de alunos */}
            <TabelaPaciente />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

// Exporta o componente para uso em outras partes do projeto
export default PListaPacientes;
