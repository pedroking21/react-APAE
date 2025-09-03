import { useState } from 'react';
import estilo from './FormConsulta.module.css';
import ConsultaRequests from '../../../fetch/ConsultaRequests';

function FormConsulta() {
    const [formData, setFormData] = useState({
        data: new Date(),
        hora: '',
        diagnostico: '',
        receita: '',
        salaAtendimento: '',
        consultaStatus: '',
        idPaciente: 0,
        idMedico: 0
    });

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { data: Date; hora: string; diagnostico: string; receita: string; salaAtendimento: string; consultaStatus: string; idPaciente: number; idMedico: number}) => {
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
                        Data
                        <input
                            type="date"
                            name="data"
                            id="data"
                            required
                            minLength={3}
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
                            minLength={3}
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
                            minLength={6}
                            onChange={(e) => handleChange("receita", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Sala de atendimento
                        <input
                            type="text"
                            name="salaAtendimento"
                            id="salaAtendimento"
                            minLength={11}
                            onChange={(e) => handleChange("salaAtendimento", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Consulta Status
                        <input
                            type="text"
                            name="consultaStatus"
                            id="consultaStatus"
                            minLength={10}
                            maxLength={13}
                            onChange={(e) => handleChange("consultaStatus", e.target.value)}
                        />
                    </label>

                    
                    <label htmlFor="">
                        id do Paciente
                        <input
                            type="number"
                            name="idPaciente"
                            id="idPaciente"
                            minLength={11}
                            onChange={(e) => handleChange("idPaciente", e.target.value)}
                        />
                    </label>

                    
                    <label htmlFor="">
                        id do Medico
                        <input
                            type="number"
                            name="idMedico"
                            id="idMedico"
                            minLength={11}
                            onChange={(e) => handleChange("idMedico", e.target.value)}
                        />
                    </label>

                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormConsulta;