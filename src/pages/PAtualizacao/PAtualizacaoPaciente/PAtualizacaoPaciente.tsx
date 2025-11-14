import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape"; 
import UpdatePaciente from "../../../components/Formularios/UpdatePaciente/UpdatePaciente";
import { useParams } from "react-router-dom";

function PAtualizacaoPaciente(): JSX.Element {
    const { idPaciente } = useParams<{ idPaciente: string }>();

    return (
    <div className="pagina-grid">
        <Cabecalho />
        <UpdatePaciente idPaciente={Number(idPaciente)} />
        <Rodape />
    </div>
    );
}
export default PAtualizacaoPaciente;