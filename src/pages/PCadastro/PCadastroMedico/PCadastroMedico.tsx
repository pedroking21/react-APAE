import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormMedico from "../../../components/Formularios/FormMedico/FormMedico";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroAluno() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <FormMedico />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

export default PCadastroAluno;