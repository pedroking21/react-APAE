// Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/column'; // Componente de coluna da tabela
import { Button } from 'primereact/button'; // Componente de botão da PrimeReact

// Importa o serviço responsável pelas requisições relacionadas a empréstimos
import ConsultaRequests from '../../../fetch/ConsultaRequests'; // Importa a classe responsável pelas requisições dos empréstimos

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaConsulta.module.css'; // Importa os estilos específicos para este componente
import ConsultaDTO from '../../../interfaces/ConsultaInterface';

function TabelaConsulta(): JSX.Element {
    // Define o estado local para armazenar os dados dos empréstimos
    const [consultas, setConsultas] = useState<ConsultaDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />; // Botão de "refresh" na esquerda
    const paginatorRight = <Button type="button" icon="pi pi-download" text />; // Botão de "download" na direita

    // Hook useEffect para buscar os dados de empréstimos assim que o componente for montado
    useEffect(() => {
        // Função assíncrona para realizar a requisição dos empréstimos
        const fetchConsultas = async () => {
            try {
                const listaDeConsultas = await ConsultaRequests.listarConsultas(); // Chamada à API
                // Atualiza o estado apenas se o retorno for um array
                console.log(listaDeConsultas);
                setConsultas(Array.isArray(listaDeConsultas) ? listaDeConsultas : []);
            } catch (error) {
                console.error(`Erro ao buscar consultas: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchConsultas(); // Executa a função de busca
    }, []); // Array vazio indica que esse efeito será executado apenas uma vez (componenteDidMount)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-consulta']}>Lista de Consultas</h1>

            {/* Componente DataTable: renderiza a tabela com os dados dos empréstimos */}
            <DataTable
                value={consultas} // Define os dados que serão exibidos
                paginator // Habilita paginação
                rows={5} // Quantidade de linhas por página
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções de linhas por página
                tableStyle={{ minWidth: '50rem' }} // Estilização mínima da tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Template da paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Template do relatório da página
                paginatorLeft={paginatorLeft} // Botão à esquerda da paginação
                paginatorRight={paginatorRight} // Botão à direita da paginação
                className={estilo['data-table']} // Classe CSS personalizada
            >
                <Column
                    field="data"
                    header="Data"
                    style={{ width: '10%' }}
                    body={(rowData) => new Date(rowData.data).toLocaleDateString('pt-BR')}
                />
                <Column field="hora" header="Hora" />
                <Column field="diagnostico" header="Diagnóstico" />
                <Column field="receita" header="Receita" />
                <Column field="salaAtendimento" header="Sala de Atendimento" />
                <Column field="consultaStatus" header="Status da Consulta" />
                <Column field="idPaciente" header="ID do Paciente" />
                <Column field="idMedico" header="ID do Médico" />
                <Column field="statusConsultaRegistro" header="Registro Confirmado" />

            </DataTable>
        </main>
    );
}

export default TabelaConsulta; // Exporta o componente para ser usado em outras partes da aplicação
