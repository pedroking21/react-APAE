// Importa hooks e tipos do React
import { JSX, useEffect, useState } from 'react';

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FaTrashAlt } from "react-icons/fa";

// Importa o serviço responsável pelas requisições relacionadas a médicos
import MedicoRequests from '../../../fetch/MedicoRequests';

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaMedico.module.css';
import MedicoDTO from '../../../interfaces/MedicoInterface';
import { APP_ROUTES } from '../../../appConfig';

/**
 * Componente que exibe uma tabela com os dados dos médicos.
 * Os dados são carregados da API assim que o componente é montado na tela.
 */
function TabelaMedico(): JSX.Element {
    // Estado local para armazenar a lista de médicos
    const [medicos, setMedicos] = useState<MedicoDTO[]>([]);

    // Botões personalizados para paginação
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Hook useEffect: busca os médicos assim que o componente é montado
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const listaDeMedicos = await MedicoRequests.listarMedicos();
                setMedicos(Array.isArray(listaDeMedicos) ? listaDeMedicos : []);
            } catch (error) {
                console.error(`Erro ao buscar médicos: ${error}`);
            }
        };

        fetchMedicos();
    }, []);

    const deletar = async (medico: MedicoDTO) => {
        const confirmar = window.confirm(`Deseja realmente deletar o medico ${medico.nome} ${medico.especialidade}?`);
        if (confirmar && typeof medico.idMedico === 'number') {
            const removido = await MedicoRequests.removerMedico(medico.idMedico);
            if (removido) {
                window.location.reload(); //atualizar a pagina
            } else {
                alert('Erro ao remover o medico');
            }
        } else if (confirmar) {
            alert('ID do medico inválido')
        }
    }

    return (
        <main className={estilo['container-medico']}>{/* Container principal do componente */}
            {/* Título da tabela */}
            <h1 className={estilo['header-tabela-medico']}>Lista de Médicos</h1>
            <a
                href={APP_ROUTES.ROUTE_CADASTRO_MEDICO}
                className={estilo['anc-pag-cadastro']}
            >
                CADASTRAR MÉDICO
            </a>

            {/* Tabela PrimeReact */}
            <DataTable
                value={medicos}
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
                <Column field="nome" header="Nome" style={{ width: '20%' }} />
                <Column field="especialidade" header="Especialidade" style={{ width: '20%' }} />
                <Column field="crm" header="CRM" style={{ width: '15%' }} />
                <Column field="telefone" header="Telefone" style={{ width: '15%' }} />
                <Column field="email" header="E-mail" style={{ width: '20%' }} />

                <Column
                    field="idMedico"
                    header="Ação"
                    headerStyle={{ backgroundColor: '#0A3D62', color: '#ffffff' }}
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

export default TabelaMedico;
