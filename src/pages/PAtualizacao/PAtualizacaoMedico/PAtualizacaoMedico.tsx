import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import Rodape from "../../../components/Rodape/Rodape"; 
import UpdateMedico from "../../../components/Formularios/UpdateMedico/UpdateMedico";
import { useParams } from "react-router-dom";

function PAtualizacaoMedico(): JSX.Element {
    const { idMedico } = useParams<{ idMedico: string }>();

    return (
    <div className="pagina-grid">
        <Cabecalho />
        <UpdateMedico idMedico={Number(idMedico)} />
        <Rodape />
    </div>
    );
}
export default PAtualizacaoMedico;
