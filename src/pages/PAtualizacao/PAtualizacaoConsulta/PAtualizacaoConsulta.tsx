import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape"; 
import UpdateConsulta from "../../../components/Formularios/UpdateConsulta/UpdateConsulta";
import { useParams } from "react-router-dom";

function PAtualizacaoConsulta(): JSX.Element {
    const { idConsulta } = useParams<{ idConsulta: string }>();

    return (
    <div className="pagina-grid">
        <Cabecalho />
        <UpdateConsulta idConsulta={Number(idConsulta)} />
        <Rodape />
    </div>
    );
}
export default PAtualizacaoConsulta;