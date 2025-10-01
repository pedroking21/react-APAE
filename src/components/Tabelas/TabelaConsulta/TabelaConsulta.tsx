// Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/column'; // Componente de coluna da tabela
import { Button } from 'primereact/button'; // Componente de botão da PrimeReact
import { FaTrashAlt } from "react-icons/fa";


// Importa o serviço responsável pelas requisições relacionadas a consultas
import ConsultaRequests from '../../../fetch/ConsultaRequests'; // Classe responsável pelas requisições das consultas

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaConsulta.module.css'; // Estilos específicos para este componente
import ConsultaDTO from '../../../interfaces/ConsultaInterface';
import { APP_ROUTES } from '../../../appConfig';

/**
 * Componente que exibe uma tabela com os dados das consultas.
 * Os dados são carregados da API assim que o componente é montado na tela.
 */
function TabelaConsulta(): JSX.Element {
    // Hook useState: cria uma variável de estado chamada `consultas` para armazenar os dados das consultas
    const [consultas, setConsultas] = useState<ConsultaDTO[]>([]);

    // Botões personalizados para paginação
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    /**
     * Hook useEffect: executa a função `fetchConsultas` assim que o componente for renderizado.
     * A função busca as consultas na API e armazena no estado.
     */
    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const listaDeConsultas = await ConsultaRequests.listarConsultas(); // Requisição à API
                setConsultas(Array.isArray(listaDeConsultas) ? listaDeConsultas : []); // Atualiza o estado com os dados
            } catch (error) {
                console.error(`Erro ao buscar consultas: ${error}`);
            }
        };

        fetchConsultas(); // Executa a função de busca
    }, []);

    const deletar = async (consulta: ConsultaDTO) => {
        const confirmar = window.confirm(`Deseja realmente deletar o paciente ${consulta.idConsulta} ${consulta.nome}? ID: ${consulta.idConsulta}`);
        if (
            confirmar &&
            typeof consulta.idMedico === 'number' &&
            typeof consulta.idConsulta === 'number'
        ) {
            const removido = await ConsultaRequests.removerConsulta(consulta.idConsulta);
            if (removido) {
                window.location.reload(); //atualizar a pagina
            } else {
                alert('Erro ao remover o consulta');
            }
        } else if (confirmar) {
            alert('ID do consulta inválido');
        }
    }

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-consulta']}>Lista de Consultas</h1>
            <a
                href={APP_ROUTES.ROUTE_CADASTRO_CONSULTA}
                className={estilo['anc-pag-cadastro']}
            >
                CADASTRAR CONSULTA
            </a>

            {/* Componente DataTable: renderiza a tabela com os dados das consultas */}
            <DataTable
                value={consultas}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} de {last} total {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                className={estilo['data-table']}
            >
                <Column
                    field="data"
                    header="Data"
                    style={{ width: '10%' }}
                    body={(rowData) => new Date(rowData.data).toLocaleDateString('pt-BR')}
                />
                <Column field="nome" header="Nome" />
                <Column field="hora" header="Hora" />
                <Column field="diagnostico" header="Diagnóstico" />
                <Column field="receita" header="Receita" />
                <Column field="salaAtendimento" header="Sala de Atendimento" />
                <Column field="consultaStatus" header="Status da Consulta" />
                <Column field="idPaciente" header="ID do Paciente" />
                <Column field="idMedico" header="ID do Médico" />
                <Column field="statusConsultaRegistro" header="Registro Confirmado" />

                <Column
                    field="idConsulta"
                    header="Ação"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '15%', color: 'var(--font-color)' }}
                    body={(rowData) => (
                        <button
                            style={{ width: '100%' }}
                            onClick={() => deletar(rowData)}
                        ><FaTrashAlt /></button>
                    )}
                />
            </DataTable>
        </main>
    );
}

export default TabelaConsulta;