import { JSX, useEffect, useState } from "react";
import estilo from "./UpdateConsulta.module.css";
import ConsultaRequests from "../../../fetch/ConsultaRequests";
import PacienteRequests from "../../../fetch/PacienteRequests";
import MedicoRequests from "../../../fetch/MedicoRequests";
import PacienteDTO from "../../../interfaces/PacienteInterface";
import MedicoDTO from "../../../interfaces/MedicoInterface";
import { CONSULTA_STATUS } from "../../../appConfig";

function UpdateConsulta({ idConsulta }: { idConsulta: number }): JSX.Element {
    const [formData, setFormData] = useState({
        idConsulta: idConsulta,
        data: "",
        hora: "",
        diagnostico: "",
        receita: "",
        salaAtendimento: "",
        consultaStatus: "",
        idPaciente: 0,
        idMedico: 0
    });

    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);
    const [consultaStatus, setConsultaStatus] = useState<string[]>([]);

    useEffect(() => {
        const fetchConsulta = async () => {
            try {
                const consulta: any = await ConsultaRequests.listarConsultas();
                const c = consulta?.find((item: any) => item.idConsulta === idConsulta);

                if (c) {
                    setFormData({
                        idConsulta: c.idConsulta,
                        data: c.data ? new Date(c.data).toISOString().slice(0, 10) : "",
                        hora: c.hora || "",
                        diagnostico: c.diagnostico || "",
                        receita: c.receita || "",
                        salaAtendimento: c.salaAtendimento || "",
                        consultaStatus: c.consultaStatus || "",
                        idPaciente: c.idPaciente,
                        idMedico: c.idMedico
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar consulta:", error);
            }
        };

        const fetchPacientes = async () => {
            try {
                const lista = await PacienteRequests.listarPacientes();
                setPacientes(lista ? (Array.isArray(lista) ? lista : [lista]) : []);
            } catch (e) {
                console.error("Erro ao buscar pacientes:", e);
            }
        };

        const fetchMedicos = async () => {
            try {
                const lista = await MedicoRequests.listarMedicos();
                setMedicos(lista ? (Array.isArray(lista) ? lista : [lista]) : []);
            } catch (e) {
                console.error("Erro ao buscar médicos:", e);
            }
        };

        fetchConsulta();
        fetchPacientes();
        fetchMedicos();
        setConsultaStatus(Object.values(CONSULTA_STATUS));
    }, [idConsulta]);

    const handleChange = (nome: string, valor: any) => {
        setFormData({ ...formData, [nome]: valor });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            data: formData.data ? new Date(formData.data) : undefined
        };

        const resposta = await ConsultaRequests.enviarFormularioAtualizacaoConsulta(dataToSend);

        if (resposta) {
            alert("Consulta atualizada com sucesso!");
        } else {
            alert("Erro ao atualizar consulta.");
        }
    };

    return (
        <section className={estilo["sec-form-consulta"]}>
            <h1>Atualizar Consulta</h1>

            <form className={estilo["form-consulta"]} onSubmit={handleSubmit}>

                <label>
                    Paciente
                    <select
                        value={formData.idPaciente}
                        onChange={(e) => handleChange("idPaciente", Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione o paciente</option>
                        {pacientes.map((p) => (
                            <option key={p.idPaciente} value={p.idPaciente}>
                                {p.idPaciente} — {p.nome} — {p.cpf}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Médico
                    <select
                        value={formData.idMedico}
                        onChange={(e) => handleChange("idMedico", Number(e.target.value))}
                        required
                    >
                        <option value="">Selecione o médico</option>
                        {medicos.map((m) => (
                            <option key={m.idMedico} value={m.idMedico}>
                                {m.idMedico} — {m.nome} — {m.especialidade}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Data
                    <input
                        type="date"
                        value={formData.data}
                        required
                        onChange={(e) => handleChange("data", e.target.value)}
                    />
                </label>

                <label>
                    Hora
                    <input
                        type="text"
                        value={formData.hora}
                        required
                        onChange={(e) => handleChange("hora", e.target.value)}
                    />
                </label>

                <label>
                    Diagnóstico
                    <input
                        type="text"
                        value={formData.diagnostico}
                        onChange={(e) => handleChange("diagnostico", e.target.value)}
                    />
                </label>

                <label>
                    Receita
                    <input
                        type="text"
                        value={formData.receita}
                        onChange={(e) => handleChange("receita", e.target.value)}
                    />
                </label>

                <label>
                    Sala de Atendimento
                    <input
                        type="text"
                        value={formData.salaAtendimento}
                        onChange={(e) => handleChange("salaAtendimento", e.target.value)}
                    />
                </label>

                <label>
                    Status da Consulta
                    <select
                        value={formData.consultaStatus}
                        required
                        onChange={(e) => handleChange("consultaStatus", e.target.value)}
                    >
                        <option value="">Selecione o status</option>
                        {consultaStatus.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </label>

                <input type="submit" value="ATUALIZAR" />
            </form>
        </section>
    );
}

export default UpdateConsulta;
