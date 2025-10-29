import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape";
import FormUsuario from "../../../components/Formularios/FormUsuario/FormUsuario";

function PCadastroUsuario(): JSX.Element {
    return(
        <div className="pagina-grid">
            <Cabecalho />
            <FormUsuario />
            <Rodape />
        </div>
    );
}

export default PCadastroUsuario;