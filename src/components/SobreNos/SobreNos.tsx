// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './SobreNos.module.css';

// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function SobreNos(): JSX.Element {
    return (
        // Elemento principal da página com classe de estilo personalizada
        <main className={estilo.principal}>
            {/* Mensagem de boas-vindas ao usuário */}
            <section className={estilo.margem}>
            <h1>SOBRE NÓS</h1>
            </section>
            {/* Mensagem orientando o usuário a fazer login */}
            <section className={estilo.texto}>
            <p>A MedClinic foi fundada com a missão de oferecer atendimento médico de qualidade, acessível e humanizado para a comunidade. Desde sua inauguração, a clínica tem se destacado pelo compromisso com a saúde e o bem-estar de seus pacientes, reunindo uma equipe de profissionais altamente qualificados em diversas especialidades.
Ao longo dos anos, a MedClinic investiu em tecnologia, inovação e infraestrutura moderna, proporcionando diagnósticos precisos e tratamentos eficazes. Com um ambiente acolhedor e atendimento personalizado, a clínica se tornou referência na região, priorizando sempre a excelência nos serviços prestados.
Hoje, a MedClinic segue ampliando sua atuação, com novos serviços, parcerias estratégicas e um atendimento cada vez mais eficiente, reafirmando seu compromisso de cuidar da saúde com profissionalismo e dedicação.</p>
            </section>
        </main>
    );

};
      

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default SobreNos;
