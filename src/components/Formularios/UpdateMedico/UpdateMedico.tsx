import { JSX, useEffect, useState } from "react";
import estilo from './UpdateMedico.module.css';
import MedicoRequests from "../../../fetch/MedicoRequests";

function UpdateMedico({ idMedico }: { idMedico: number }): JSX.Element {
    const [formData, setFormData] = useState({
        idMedico: idMedico,
        nome: '',
        especialidade: '',
        crm: '',
        telefone: '',
        email: ''
    });

    // Busca as informações do medico para preencher o formulário
    useEffect(() => {
        const fetchMedico = async () => {
            try {
                // O método espera um objeto do tipo MedicoDTO; ao buscar por id aqui fazemos um cast para 'any'
                // para satisfazer a tipagem e permitir a chamada — idealmente use um endpoint específico de GET por id.
                const medico: any = await MedicoRequests.consultaMedico(formData.idMedico as any); // Requisição à API
                console.log(medico);
                if (medico) {
                    setFormData({
                        idMedico: idMedico,
                        nome: medico.nome || '',
                        especialidade: medico.especialidade || '',
                        crm: medico.crm || '',
                        telefone: medico.telefone || '',
                        email: medico.email || ''
                    }); // Atualiza o estado com os dados
                }
            } catch (error) {
                console.error(`Erro ao buscar medico: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };

        if (idMedico) {
            fetchMedico();  // Executa a função de busca 
        }
    }, [idMedico]);

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

        try {
            const resposta = await MedicoRequests.enviarFormularioAtualizacaoMedico(data);
            if (resposta) {
                alert('Medico atualizado com sucesso.');
            } else {
                alert('Erro ao atualizar medico.');
            }
        } catch (error) {
            console.error('Erro ao enviar atualização do medico:', error);
            alert('Erro ao atualizar medico.');
        }
    }

    return (
        <section className={estilo['sec-form-medico']}>
            <h1>Atualiza Medico</h1>
            <form action="post" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
            }}
                className={estilo['form-medico']}
            >
                <label htmlFor="nome">
                    Nome
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        value={formData.nome}
                        required
                        minLength={3}
                        onChange={(e) => handleChange("nome", e.target.value)}
                    />
                </label>

                <label htmlFor="especialidade">
                    Especialidade
                    <input
                        type="text"
                        name="especialidade"
                        id="especialidade"
                        value={formData.especialidade}
                        required
                        minLength={3}
                        onChange={(e) => handleChange("especialidade", e.target.value)}
                    />
                </label>

                <label htmlFor="crm">
                    Crm
                    <input
                        type="text"
                        name="crm"
                        id="crm"
                        value={formData.crm}
                        onChange={(e) => handleChange("crm", e.target.value)}
                    />
                </label>

                <label htmlFor="telefone">
                    Telefone
                    <input
                        type="text"
                        name="telefone"
                        id="telefone"
                        value={formData.telefone}
                        minLength={6}
                        onChange={(e) => handleChange("telefone", e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    E-mail
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        minLength={11}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </label>
                <input type="submit" value="SALVAR" />
            </form>
        </section>
    );
}

export default UpdateMedico;