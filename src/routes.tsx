import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';
import PLogin from './pages/PLogin/PLogin';
import PSobreNos from './pages/PSobreNos/PSobreNos';
import PListaPacientes from './pages/PListagem/PListaPacientes/PListaPacientes';
import PListaConsultas from './pages/PListagem/PListaConsultas/PListaConsultas';
import PListagemMedicos from './pages/PListagem/PListaMedicos/PListaMedicos';
import ProtectedRoute from './components/Rotas/ProtectedRoute';

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

                

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
