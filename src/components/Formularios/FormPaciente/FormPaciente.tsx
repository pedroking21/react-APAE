import { useState } from 'react';
import estilo from './FormPaciente.module.css';
import PacienteRequests from '../../../fetch/PacienteRequests';

function FormPaciente() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        dataNascimento: new Date(),
        endereco: ''
    });

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { nome: string; cpf: string; telefone: string; email: string; dataNascimento: Date; endereco: string; }) => {
        const resposta = await PacienteRequests.enviaFormularioPaciente(JSON.stringify(formData));
        if(resposta) {
            alert('Paciente cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar Paciente.');
        }
    }

    return (
        <section className={estilo['sec-form-paciente']}>
            <h1>Cadastro Paciente</h1>
            <form action="post" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                    className={estilo['form-paciente']}
                >
                    <label htmlFor="">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            onChange={(e) => handleChange("nome", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Cpf
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            required
                            onChange={(e) => handleChange("cpf", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Telefone
                        <input
                            type="text"
                            name="telefone"
                            id="telefone"
                            onChange={(e) => handleChange("telefone", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        E-mail
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Data de Nascimento
                        <input
                            type="date"
                            name="dataNascimento"
                            id="dataNascimento"
                            onChange={(e) => handleChange("dataNascimento", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        endereco
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            onChange={(e) => handleChange("endereco", e.target.value)}
                        />
                    </label>
                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormPaciente;