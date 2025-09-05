import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormPaciente from "../../../components/Formularios/FormPaciente/FormPaciente";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroPaciente() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <FormPaciente />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

export default PCadastroPaciente;