import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';
import PSobreNos from './pages/PSobreNos/PSobreNos';
import PListaPacientes from './pages/PListagem/PListaPacientes/PListaPacientes';
import PListaConsultas from './pages/PListagem/PListaConsultas/PListaConsultas';
import PListagemMedicos from './pages/PListagem/PListaMedicos/PListaMedicos';
import PLogin from './pages/PLogin/PLogin';
import ProtectedRoute from './components/Rotas/ProtectedRoute';
import PCadastroConsulta from './pages/PCadastro/PCadastroConsulta/PCadastroConsulta';
import PCadastroPaciente from './pages/PCadastro/PCadastroPaciente/PCadastroPaciente';
import PCadastroMedico from './pages/PCadastro/PCadastroMedico/PCadastroMedico';
import PCadastroUsuario from './pages/PCadastro/PCadastroUsuario/PCadastroUsuario';
import PAtualizacaoPaciente from './pages/PAtualizacao/PAtualizacaoPaciente/PAtualizacaoPaciente';


/**
 * Componente que define e organiza todas as rotas da aplicação
 * @returns As rotas definidas dentro de um BrowserRouter
 */
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota para a página inicial */}
                <Route path={APP_ROUTES.ROUTE_HOME} element={<PHome />} />

                {/* Rota para a página de login */}
                <Route path={APP_ROUTES.ROUTE_LOGIN} element={<PLogin />} />

                <Route path={APP_ROUTES.ROUTE_SOBRE_NOS} element={<PSobreNos />} />

                {/* Rota para a listagem de pacientes */}
                <Route path={APP_ROUTES.ROUTE_LISTAGEM_PACIENTES} element={<ProtectedRoute element={PListaPacientes} />} />

                {/* Rota para a listagem de consultas */}
                <Route path={APP_ROUTES.ROUTE_LISTAGEM_CONSULTAS} element={<ProtectedRoute element={PListaConsultas} />} />
                {/* Rota para a listagem de médicos */}
                <Route path={APP_ROUTES.ROUTE_LISTAGEM_MEDICOS} element={<ProtectedRoute element={PListagemMedicos} />} /> 

                <Route path={APP_ROUTES.ROUTE_CADASTRO_CONSULTA} element={<ProtectedRoute element={PCadastroConsulta} />} /> 

                <Route path={APP_ROUTES.ROUTE_CADASTRO_PACIENTE} element={<ProtectedRoute element={PCadastroPaciente} />} /> 

                <Route path={APP_ROUTES.ROUTE_CADASTRO_MEDICO} element={<ProtectedRoute element= {PCadastroMedico} />} /> 

                <Route path={`${APP_ROUTES.ROUTE_ATUALIZAR_PACIENTE}/:idPaciente`} element={<ProtectedRoute element={PAtualizacaoPaciente} />} />

                <Route path={`${APP_ROUTES.ROUTE_CADASTRO_USUARIO}`} element={<PCadastroUsuario />} />

                

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
