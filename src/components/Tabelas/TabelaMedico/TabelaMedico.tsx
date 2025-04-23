// Importa hooks e tipos do React
import { JSX, useEffect, useState } from 'react'; 

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Tabela responsiva com recursos como paginação e ordenação
import { Column } from 'primereact/column'; // Representa uma coluna da tabela
import { Button } from 'primereact/button'; // Botão estilizado da PrimeReact

// Importa o serviço responsável pelas requisições relacionadas a livros
import MedicoRequests from '../../../fetch/MedicoRequests';

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaMedico.module.css';
import MedicoDTO from '../../../interfaces/MedicoInterface';

// Declara o componente funcional TabelaLivro
function TabelaMedico(): JSX.Element {
    // Hook useState para armazenar a lista de livros
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Hook useEffect para buscar os livros na primeira renderização do componente
    useEffect(() => {
        const fetchMedicos = async () => {   // função para fazer a consulta de livros
            try {
                const listaDeMedicos = await MedicoRequests.listarMedicos(); // Chamada assíncrona à API
                setMedicos(Array.isArray(listaDeMedicos) ? listaDeMedicos : []); // Atualiza o estado apenas se o retorno for um array
            } catch (error) {
                console.error(`Erro ao buscar medicos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchMedicos(); // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-medicos']}>Lista de Medicos</h1>

            {/* Componente DataTable da PrimeReact, responsável por exibir os dados em forma de tabela */}
            <DataTable
                value={medicos} // Fonte de dados da tabela
                paginator // Ativa paginação
                rows={5} // Mostra 10 registros por página por padrão
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções que o usuário pode escolher
                tableStyle={{ minWidth: '50rem' }} // Define um estilo mínimo para a tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Layout dos controles de paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Texto que exibe o status da paginação
                paginatorLeft={paginatorLeft} // Botão à esquerda da paginação
                paginatorRight={paginatorRight} // Botão à direita da paginação
                className={estilo['data-table']} // Classe CSS personalizada
            >
                {/* Colunas que representam os atributos de cada livro */}
                <Column field="nome" header="Nome" style={{ width: '20%' }} />
                <Column field="especialidade" header="Especialidade" style={{ width: '20%' }} />
                <Column field="crm" header="CRM" style={{ width: '15%' }} />
                <Column field="telefone" header="Telefone" style={{ width: '15%' }} />
                <Column field="email" header="Email" style={{ width: '20%' }} />
            </DataTable>
        </main>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default TabelaMedico;
