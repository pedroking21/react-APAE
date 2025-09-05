import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormConsulta from "../../../components/Formularios/FormConsulta/FormConsulta";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroConsulta() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <FormConsulta />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

export default PCadastroConsulta;