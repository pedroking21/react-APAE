// Importa o componente de boas-vindas
import { JSX } from 'react';

import Cabecalho from "../../components/Cabecalho/Cabecalho";

import SobreNos from "../../components/SobreNos/SobreNos";

// Importa o componente de rodapé da aplicação
import Rodape from "../../components/Rodape/Rodape";

// Declara o componente funcional PHome, que representa a página inicial
function PSobreNos(): JSX.Element {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            <SobreNos />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

// Exporta o componente para ser usado em outras partes do projeto
export default PSobreNos;
