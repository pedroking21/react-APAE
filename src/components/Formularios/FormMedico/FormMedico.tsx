import { useState } from 'react';
import estilo from './FormMedico.module.css';
import MedicoRequests from '../../../fetch/MedicoRequests';

function FormMedico() {
    const [formData, setFormData] = useState({
        nome: '',
        especialidade: '',
        crm: '',
        telefone: '',
        email: ''

    });

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { nome: string; especialidade: string; crm: string; telefone: string; email: string; }) => {
        const resposta = await MedicoRequests.enviaFormularioMedico(JSON.stringify(formData));
        if(resposta) {
            alert('Medico cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar Medico.');
        }
    }

    return (
        <section className={estilo['sec-form-medico']}>
            <h1>Cadastro Medico</h1>
            <form action="post" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                    className={estilo['form-medico']}
                >
                    <label htmlFor="">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            minLength={3}
                            onChange={(e) => handleChange("nome", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Especialidade
                        <input
                            type="text"
                            name="especialidade"
                            id="especialidade"
                            required
                            minLength={3}
                            onChange={(e) => handleChange("especialidade", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Crm
                        <input
                            type="text"
                            name="crm"
                            id="crm"
                            onChange={(e) => handleChange("crm", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Telefone
                        <input
                            type="text"
                            name="telefone"
                            id="telefone"
                            minLength={6}
                            onChange={(e) => handleChange("telefone", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        E-mail
                        <input
                            type="text"
                            name="email"
                            id="email"
                            minLength={11}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </label>
                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormMedico;