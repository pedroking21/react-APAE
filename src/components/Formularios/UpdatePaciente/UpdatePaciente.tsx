import { JSX, useEffect, useState } from "react";
import estilo from './UpdatePaciente.module.css';
import PacienteRequests from "../../../fetch/PacienteRequests";

function UpdatePaciente({ idPaciente }: { idPaciente: number }): JSX.Element {
    const [formData, setFormData] = useState({
        idPaciente: idPaciente,
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        endereco: ''
    });

    // Busca as informações do paciente para preencher o formulário
    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                // O método espera um objeto do tipo PacienteDTO; ao buscar por id aqui fazemos um cast para 'any'
                // para satisfazer a tipagem e permitir a chamada — idealmente use um endpoint específico de GET por id.
                const paciente: any = await PacienteRequests.consultaPaciente(formData.idPaciente as any); // Requisição à API
                console.log(paciente);
                if (paciente) {
                    setFormData({
                        idPaciente: idPaciente,
                        nome: paciente.nome || '',
                        cpf: paciente.cpf || '',
                        endereco: paciente.endereco || '',
                        email: paciente.email || '',
                        dataNascimento: paciente.dataNascimento
                            ? new Date(paciente.dataNascimento).toISOString().slice(0, 10)
                            : '',
                        telefone: paciente.telefone || ''
                    }); // Atualiza o estado com os dados
                }
            } catch (error) {
                console.error(`Erro ao buscar paciente: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };

        if (idPaciente) {
            fetchPaciente();  // Executa a função de busca 
        }
    }, [idPaciente]);

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (eventOrData: React.FormEvent | typeof formData) => {
        let data: typeof formData;
        if ((eventOrData as React.FormEvent).preventDefault) {
            (eventOrData as React.FormEvent).preventDefault();
            data = formData;
        } else {
            data = eventOrData as typeof formData;
        }

        // Converte a data para enviar o formulário
        const formDataToSend = {
            ...data,
            dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : undefined
        };

        try {
            const resposta = await PacienteRequests.enviarFormularioAtualizacaoPaciente(formDataToSend);
            if (resposta) {
                alert('Paciente atualizado com sucesso.');
            } else {
                alert('Erro ao atualizar paciente.');
            }
        } catch (error) {
            console.error('Erro ao enviar atualização do paciente:', error);
            alert('Erro ao atualizar paciente.');
        }
    }

    return (
        <section className={estilo['sec-form-paciente']}>
            <h1>Atualiza Paciente</h1>
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
                        value={formData.nome}
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
                        value={formData.cpf}
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
                        value={formData.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    E-mail
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </label>

                <label htmlFor="dataNascimento">
                    Data de Nascimento
                    <input
                        type="date"
                        name="dataNascimento"
                        id="dataNascimento"
                        value={formData.dataNascimento}
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
                        value={formData.endereco}
                        onChange={(e) => handleChange('endereco', e.target.value)}
                    />
                </label>

                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default UpdatePaciente;