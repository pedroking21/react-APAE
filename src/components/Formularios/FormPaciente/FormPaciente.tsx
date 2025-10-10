import { useState } from 'react';
import estilo from './FormPaciente.module.css';
import PacienteRequests from '../../../fetch/PacienteRequests';

function FormPaciente() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        endereco: ''
    });

    // Data atual no formato YYYY-MM-DD para usar no max do input
    const dataAtual = new Date().toISOString().split('T')[0];

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // Função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { nome: string; cpf: string; telefone: string; email: string; dataNascimento: string; endereco: string; }) => {
        // Validação para data de nascimento não ser maior que a data atual
        if (formData.dataNascimento > dataAtual) {
            alert('A data de nascimento não pode ser maior que a data atual.');
            return;
        }

        const resposta = await PacienteRequests.enviaFormularioPaciente(JSON.stringify(formData));
        if (resposta) {
            alert('Paciente cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar Paciente.');
        }
    };

    return (
        <section className={estilo['sec-form-paciente']}>
            <h1>Cadastro Paciente</h1>
            <form
                action="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}
                className={estilo['form-paciente']}
            >
                <label htmlFor="nome">
                    Nome
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        required
                        onChange={(e) => handleChange('nome', e.target.value)}
                    />
                </label>

                <label htmlFor="cpf">
                    Cpf
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        required
                        onChange={(e) => handleChange('cpf', e.target.value)}
                    />
                </label>

                <label htmlFor="telefone">
                    Telefone
                    <input
                        type="text"
                        name="telefone"
                        id="telefone"
                        onChange={(e) => handleChange('telefone', e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    E-mail
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </label>

                <label htmlFor="dataNascimento">
                    Data de Nascimento
                    <input
                        type="date"
                        name="dataNascimento"
                        id="dataNascimento"
                        max={dataAtual}
                        required
                        onChange={(e) => handleChange('dataNascimento', e.target.value)}
                    />
                </label>

                <label htmlFor="endereco">
                    Endereço
                    <input
                        type="text"
                        name="endereco"
                        id="endereco"
                        onChange={(e) => handleChange('endereco', e.target.value)}
                    />
                </label>

                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormPaciente;
