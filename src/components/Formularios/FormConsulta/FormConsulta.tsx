import { JSX, useState, useEffect } from "react";
import estilo from './FormConsulta.module.css';
import ConsultaRequests from '../../../fetch/ConsultaRequests';
import PacienteDTO from '../../../interfaces/PacienteInterface';
import PacienteRequests from '../../../fetch/PacienteRequests';
import MedicoDTO from '../../../interfaces/MedicoInterface';
import MedicoRequests from '../../../fetch/MedicoRequests';
import { CONSULTA_STATUS } from '../../../appConfig';


function FormConsulta(): JSX.Element {
    const [consultaStatus, setConsultaStatus] = useState<string[]>([]);
    const [pacientes, setPacientes] = useState<PacienteDTO[]>([]);
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);
    const [formData, setFormData] = useState({
        nome: '',
        data: new Date(),
        hora: '',
        diagnostico: '',
        receita: '',
        salaAtendimento: '',
        consultaStatus: '',
        idPaciente: 0,
        idMedico: 0
    });

    useEffect(() => {
        /* Função para buscar informações dos alunos */
        const fetchPacientes = async () => {
            try {
                const Pacientes: PacienteDTO[] | PacienteDTO | null = await PacienteRequests.listarPacientes();
                setPacientes(Pacientes ? (Array.isArray(Pacientes) ? Pacientes : [Pacientes]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de Pacientes. ${error}`);
                alert("Erro ao recuperar lista de Pacientes");
            }
        }

        const fetchMedicos = async () => {
            try {
                const Medicos: MedicoDTO[] | MedicoDTO | null = await MedicoRequests.listarMedicos();
                setMedicos(Medicos ? (Array.isArray(Medicos) ? Medicos : [Medicos]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de Medicos.${error}`);
                alert("Erro ao recuperar lista de Medicos");
            }
        }

        fetchPacientes();
        fetchMedicos();
        setConsultaStatus(Object.values(CONSULTA_STATUS));
    }, []);

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: {nome: string; data: Date; hora: string; diagnostico: string; receita: string; salaAtendimento: string; consultaStatus: string; idPaciente: number; idMedico: number}) => {
        const resposta = await ConsultaRequests.enviaFormularioConsulta(JSON.stringify(formData));
        if(resposta) {
            alert('consulta cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar consulta.');
        }
    }

    return (
        <section className={estilo['sec-form-Consulta']}>
            <h1>Cadastro Consulta</h1>
            <form action="post" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                    className={estilo['form-consulta']}
                >
                    <label htmlFor="">
                        Paciente
                        <select 
                        value={formData.idPaciente}
                        onChange={e => handleChange("idPaciente", e.target.value)}
                        name="idPaciente"
                        required
                        >
                        {/* Montando as OPTIONS */}
                        <option value="">Selecione o paciente</option>
                        {pacientes.map(paciente => (
                            <option key={paciente.idPaciente} value={paciente.idPaciente}>
                               {paciente.idPaciente}  {paciente.nome}  {paciente.cpf}
                            </option>
                        ))}
                    </select>
                    </label>

                    <label htmlFor="">
                        Médico
                        <select 
                        value={formData.idMedico}
                        onChange={e => handleChange("idMedico", e.target.value)}
                        name="idMedico"
                        required
                        >
                        {/* Montando as OPTIONS */}
                        <option value="">Selecione o médico</option>
                        {medicos.map(medico => (
                            <option key={medico.idMedico} value={medico.idMedico}>
                               {medico.idMedico}  {medico.nome}  {medico.especialidade}
                            </option>
                        ))}
                    </select>
                    </label>

                    <label htmlFor="">
                        Data
                        <input
                            type="date"
                            name="data"
                            id="data"
                            required
                            onChange={(e) => handleChange("data", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Hora
                        <input
                            type="text"
                            name="hora"
                            id="hora"
                            required
                            onChange={(e) => handleChange("hora", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        diagnostico
                        <input
                            type="text"
                            name="diagnostico"
                            id="diagnostico"
                            onChange={(e) => handleChange("diagnostico", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        receita
                        <input
                            type="text"
                            name="receita"
                            id="receita"
                            onChange={(e) => handleChange("receita", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Sala de atendimento
                        <input
                            type="text"
                            name="salaAtendimento"
                            id="salaAtendimento"
                            onChange={(e) => handleChange("salaAtendimento", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Consulta Status
                       <select 
                        value={formData.consultaStatus}
                        onChange={e => handleChange("consultaStatus", e.target.value)}
                        name="consultaStatus"
                        required
                    >
                        <option value="">Selecione o status da consulta</option>
                        {consultaStatus.map((status, id) => (
                            <option key={id} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    </label>


                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormConsulta;